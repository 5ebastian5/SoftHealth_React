import React, { useState, useEffect } from "react";
import "../styles/Profile.css";

export default function Perfil() {
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const [usuario, setUsuario] = useState(userLocal || {});
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [imagenPerfil, setImagenPerfil] = useState(null);

  useEffect(() => {
    if (!userLocal) {
      setMensaje("No se ha iniciado sesión.");
    }
  }, [userLocal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    setMensaje("");
    setTipoMensaje("");

    try {
      const formData = new FormData();
      formData.append("telefono", usuario.telefono);
      formData.append("direccion", usuario.direccion);
      if (imagenPerfil) {
        formData.append("imagenPerfil", imagenPerfil);
      }

      const respuesta = await fetch(`http://localhost:3001/usuarios/${usuario.documento}`, {
        method: "PUT",
        body: formData,
      });

      if (!respuesta.ok) {
        throw new Error("Error al guardar los cambios.");
      }

      const datosActualizados = await respuesta.json();
      localStorage.setItem("user", JSON.stringify(datosActualizados));
      setUsuario(datosActualizados);
      setMensaje("Perfil actualizado correctamente.");
      setTipoMensaje("exito");
    } catch (error) {
      console.error(error);
      setMensaje("Hubo un problema al actualizar tu perfil.");
      setTipoMensaje("error");
    }
  };

  return (
      <form onSubmit={handleGuardar} className="perfil-form">
        <h2>Mi Perfil</h2>
        <div className="perfil-columns">
          <div className="perfil-left">
            {usuario.imagenPerfil ? (
              <img
                src={`http://localhost:3001/uploads/${usuario.imagenPerfil}`}
                alt="Imagen de perfil"
                className="perfil-img"
              />
            ) : (
              <h5>No hay imagen disponible...</h5>
            )}
            <div className="form-group6">
              <label>Cambiar imagen de perfil...</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagenPerfil(e.target.files[0])}
              />
            </div>
          </div>

          <div className="perfil-right">
            <div className="form-group6">
              <label>Nombre:</label>
              <input
                disabled
                name="nombre"
                value={usuario.nombre || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group6">
              <label>Correo:</label>
              <input
                disabled
                type="email"
                name="correo"
                value={usuario.correo || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group6">
              <label>Teléfono:</label>
              <input name="telefono" value={usuario.telefono || ""} onChange={handleChange} />
            </div>

            <div className="form-group6">
              <label>Dirección:</label>
              <input name="direccion" value={usuario.direccion || ""} onChange={handleChange} />
            </div>
          </div>
        </div>

        <button type="submit" className="save6">Guardar</button>

        {mensaje && (
          <div className={`alert6 ${tipoMensaje === "exito" ? "alert6-exito" : "alert6-error"}`}>
            {mensaje}
          </div>
        )}
      </form>
  );
}
