import React, { useState } from "react";
import api from "../../services/api";

export default function Login({ history }) {
  const [email, setEmail] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await api.post("/session", { email });
    const { _id } = result.data;

    localStorage.setItem("user", _id);

    history.push("/dashboard");
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  return (
    // fragment
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre{" "}
        <strong>talentos</strong>para sua empresa
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail*</label>
        <input
          type="email"
          id="email"
          placeholder="Seu email mais Top"
          value={email}
          onChange={handleEmailChange}
        />
        <button className="btn" type="submit">
          Entrar
        </button>
      </form>
    </>
  );
}
