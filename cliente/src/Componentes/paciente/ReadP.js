import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Read.css";

export default function ReadP() {
  const [pacientes, setPacientes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState(""); // "error" o "exito"
  const navigate = useNavigate();

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/pacientes");
      setPacientes(response.data);
    } catch (error) {
      console.error("Error al cargar pacientes:", error);
      setMensaje(error.response?.data?.message || "Error al cargar pacientes.");
      setTipoAlerta("error");
    }
  };

  const handleEliminar = async (documento) => {
    if (!window.confirm("¿Estás seguro de eliminar este paciente?")) return;

    try {
      await axios.delete(`http://localhost:3001/pacientes/${documento}`);
      setPacientes(pacientes.filter((paciente) => paciente.documento !== documento));
      setMensaje("Paciente eliminado correctamente.");
      setTipoAlerta("exito");
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
      setMensaje("Error al eliminar el paciente.");
      setTipoAlerta("error");
    }
  };

  return (
    <div className="table-wrapper">
      <h2>Listado de Pacientes</h2>

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Tipo Doc.</th>
              <th>Nro. Doc.</th>
              <th>Nombre Completo</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.length > 0 ? (
              pacientes.map((paciente) => (
                <tr key={paciente.documento}>
                  <td>{paciente.tipoDocumento}</td>
                  <td>{paciente.documento}</td>
                  <td>{paciente.nombre} {paciente.apellido}</td>
                  <td>{paciente.direccion}</td>
                  <td>{paciente.telefono}</td>
                  <td>{paciente.correo}</td>
                  <td>
                    <button
                      className="btn2"
                      onClick={() => navigate(`/paciente/register/${paciente.documento}`)}
                    >
                      Actualizar
                    </button>{" "}
                    <button
                      onClick={() => handleEliminar(paciente.documento)}
                      className="btn2 danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No hay pacientes registrados.</td>
              </tr>
            )}
          </tbody>
        </table>

        {mensaje && (
        <div className={`alert5 ${tipoAlerta === "exito" ? "alert5-success" : "error"}`}>
          {mensaje}
        </div>
      )}

        <button
          className="create"
          onClick={() => navigate('/paciente/register')}
        >
          + Crear nuevo Paciente
        </button> 
      </div>
    </div>
  );
}
