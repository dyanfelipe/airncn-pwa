import React, { useState, useMemo } from "react";
import camera from "../../assets/camera.svg";
import "./styles.css";
import api from "../../services/api";

export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    // enviar no formato multipart
    const data = new FormData();
    event.preventDefault();
    const userid = localStorage.getItem("user");

    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("techs", techs);
    data.append("price", price);

    await api.post("/spots", data, {
      headers: { userid }
    });

    history.push("/dashboard");
  }
  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "han-thumbnail" : ""}
      >
        <input
          type="file"
          onChange={event => setThumbnail(event.target.files[0])}
        />
        <img src={camera} />
      </label>
      <label htmlFor="company">Empresa *</label>
      <input
        id="company"
        placeholder="Nome da empresa"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="company">Tecnologias *</label>
      <input
        id="techs"
        placeholder="Nome da empresa"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="company">
        Valor da Diária * <span>"Em branco para gratuito"</span>
      </label>
      <input
        id="price"
        placeholder="Nome da empresa"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />
      <button type="submit" className="btn">
        Cadastra
      </button>
    </form>
  );
}
