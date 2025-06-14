import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Read.css";

export default function ReadM() {
  const [medicos, setMedicos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState(""); // "exito" o "error"
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedicos();
  }, []);

  const fetchMedicos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/medicos");
      setMedicos(response.data);
    } catch (error) {
      console.error("Error al cargar médicos:", error);
      setMensaje("Error al obtener los médicos.");
      setTipoAlerta("error");
    }
  };

  const handleEliminar = async (documento) => {
    if (!window.confirm("¿Estás seguro de eliminar este médico?")) return;

    try {
      await axios.delete(`http://localhost:3001/medicos/${documento}`);
      setMedicos(medicos.filter((medico) => medico.documento !== documento));
      setMensaje("Médico eliminado correctamente.");
      setTipoAlerta("exito");
    } catch (error) {
      console.error("Error al eliminar médico:", error);
      setMensaje("Error al eliminar el médico.");
      setTipoAlerta("error");
    }
  };

  return (
    <div className="table-wrapper">
      <h2>Listado de Médicos</h2>

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
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Especialidad</th>
              <th>Cargo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medicos.length > 0 ? (
              medicos.map((medico) => (
                <tr key={medico.documento}>
                  <td>{medico.tipoDocumento}</td>
                  <td>{medico.documento}</td>
                  <td>{medico.nombre}</td>
                  <td>{medico.apellido}</td>
                  <td>{medico.direccion}</td>
                  <td>{medico.telefono}</td>
                  <td>{medico.correo}</td>
                  <td>{medico.especialidad}</td>
                  <td>{medico.cargo}</td>
                  <td>
                    <button
                      className="btn2"
                      onClick={() => navigate(`/medico/register/${medico.documento}`)}
                    >
                      Actualizar
                    </button>{" "}
                    <button
                      onClick={() => handleEliminar(medico.documento)}
                      className="btn2 danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No hay médicos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>

        <button
          className="create"
          onClick={() => navigate('/medico/register')}
        >
          + Crear nuevo Médico
        </button>
      </div>
    </div>
  );
}
