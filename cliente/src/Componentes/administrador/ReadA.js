import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Read.css";

export default function ReadA() {
  const [auxiliares, setAuxiliares] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState(""); // "exito" o "error"
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuxiliares();
  }, []);

  const fetchAuxiliares = async () => {
    try {
      const response = await fetch("http://localhost:3001/auxiliares");

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Formato de datos incorrecto");
      }

      setAuxiliares(data);
    } catch (error) {
      console.error("Error cargando auxiliares:", error);
      setMensaje("No se pudieron cargar los auxiliares. Verifica la conexión con el servidor.");
      setTipoAlerta("error");
    }
  };

  const eliminarAuxiliar = async (documento) => {
    if (!window.confirm("¿Estás seguro de eliminar este auxiliar?")) return;

    try {
      const response = await fetch(`http://localhost:3001/auxiliares/${documento}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No se pudo eliminar");
      }

      setAuxiliares(auxiliares.filter((aux) => aux.documento !== documento));
      setMensaje("Auxiliar eliminado correctamente.");
      setTipoAlerta("exito");
    } catch (error) {
      console.error("Error al eliminar auxiliar:", error);
      setMensaje("Error al eliminar el auxiliar: " + error.message);
      setTipoAlerta("error");
    }
  };

  return (
    <div className="table-wrapper">
      <h2>Listado de Auxiliares Administrativos</h2>

      {mensaje && (
        <div className={`alert ${tipoAlerta === "exito" ? "alert-success" : "error"}`}>
          {mensaje}
        </div>
      )}

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Tipo Doc.</th>
              <th>Nro. Doc.</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {auxiliares.length > 0 ? (
              auxiliares.map((aux) => (
                <tr key={aux.documento}>
                  <td>{aux.tipoDocumento}</td>
                  <td>{aux.documento}</td>
                  <td>{aux.nombre}</td>
                  <td>{aux.apellido}</td>
                  <td>{aux.correo}</td>
                  <td>{aux.telefono}</td>
                  <td>
                    <button
                      className="btn2"
                      onClick={() => navigate(`/administrador/register/${aux.documento}`)}
                    >
                      Actualizar
                    </button>{" "}
                    <button
                      className="btn2 danger"
                      onClick={() => eliminarAuxiliar(aux.documento)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No hay auxiliares registrados.</td>
              </tr>
            )}
          </tbody>
        </table>

        <button className="create" onClick={() => navigate("/administrador/register")}>
          + Crear nuevo Auxiliar
        </button>
      </div>
    </div>
  );
}
