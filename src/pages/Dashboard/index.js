import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";

export default function Dashborad() {
  const [spots, setSpots] = useState([]);
  useEffect(() => {
    async function loadSpots() {
      const userid = localStorage.getItem("user");
      const result = await api.get("/dashboard", {
        headers: { userid }
      });
      setSpots(result.data);
    }
    loadSpots();
  }, []); // array vazio vai ser axec apenas uma unica vez
  return (
    <>
      <ul className="spot-list">
        {spots.map(spots => (
          <li key={spots._id}>
            <header
              style={{ backgroundImage: `url(${spots.thumbnail_url})` }}
            />
            {console.log(spots.thumbnail_url)}
            <strong>{spots.company}</strong>
            <span>{spots.price ? `RR${spots.price}/dia` : "GRATUITO"}</span>
          </li>
        ))}
      </ul>
      <Link to="/new">
        <button className="btn">Novo Spot</button>
      </Link>
    </>
  );
}
