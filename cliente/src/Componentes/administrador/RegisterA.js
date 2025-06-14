import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../../styles/Register.css";

export default function RegisterA() {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "CC",
    documento: "",
    correo: "",
    telefono: "",
    direccion: "",
    password: "",
    rol: "A"
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState(""); // "exito" o "error"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setTipoAlerta("");

    try {
      const camposObligatorios = ["nombre", "apellido", "documento", "password"];
      for (const campo of camposObligatorios) {
        if (!formData[campo].trim()) {
          throw new Error("Todos los campos obligatorios deben ser completados.");
        }
      }

      const response = await fetch("http://localhost:3001/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en el registro.");
      }

      setMensaje("Administrativo registrado con éxito.");
      setTipoAlerta("exito");
      // setTimeout(() => navigate("/login/administrador"), 1500);

    } catch (error) {
      console.error("Error al registrar el administrativo:", error);
      setMensaje(error.message);
      setTipoAlerta("error");
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Registrar Aux. Administrativo</h2>

        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipoDocumento">Tipo de Documento:</label>
          <select
            id="tipoDocumento"
            name="tipoDocumento"
            value={formData.tipoDocumento}
            onChange={handleChange}
            required
          >
            <option value="CC">Cédula de Ciudadanía (CC)</option>
            <option value="TI">Tarjeta de Identidad (TI)</option>
            <option value="CE">Cédula Extranjera (CE)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="documento">Documento:</label>
          <input
            type="text"
            id="documento"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>

        <button type="submit" className="save">Guardar</button>

        {mensaje && (
          <div className={`alert ${tipoAlerta === "exito" ? "alert-success" : "error"}`}>
            {mensaje}
          </div>
        )}
      </form>
    </div>
  );
}
