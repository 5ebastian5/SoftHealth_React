import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/HC.css";

export default function BuscarHC() {
  const [documento, setDocumento] = useState("");
  const [idHC, setIdHC] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const rol = localStorage.getItem("rol");

  const handleBuscar = async () => {
    try {
      setMensaje("");
      setIdHC(null);

      const respHC = await fetch(`http://localhost:3001/historial/${documento}`);
      const dataHC = await respHC.json();

      if (!respHC.ok || !dataHC.id_hc) {
        throw new Error("No se encontró un historial clínico para el documento proporcionado.");
      }

      const id_hc = dataHC.id_hc;
      setIdHC(id_hc);
      localStorage.setItem("idHC", id_hc); // <- guardar en localStorage

      const respProcesos = await fetch(`http://localhost:3001/procesos/${id_hc}`);
      const text = await respProcesos.text();

      if (!respProcesos.ok) {
        throw new Error("Error al obtener los procesos clínicos: " + text);
      }

      const dataProcesos = JSON.parse(text);

      if (dataProcesos.length === 0) {
        setMensaje("El historial clínico está vacío.");
        return;
      }

      // Navega a ListaProcesos con los datos necesarios
      navigate("/procesos", {
        state: {
          procesos: dataProcesos,
          documento,
          id_hc,
        },
      });

    } catch (error) {
      console.error(error);
      setMensaje(error.message);
    }
  };

  return (
    <div className="form2">
      <form onSubmit={(e) => { e.preventDefault(); handleBuscar(); }}>
        <h2>Buscar Historial Clínico</h2>

        <div className="form-group">
          <label htmlFor="documento">Documento del Paciente:</label>
          <input
            type="text"
            id="documento"  
            name="documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            placeholder="Ingrese documento"
            required
          />
        </div>

        <button type="submit" className="save">Buscar</button>

        {mensaje && (
          <div className="alert alert-error">
            {mensaje}
            {mensaje === "El historial clínico está vacío." && rol === "M" && idHC && (
              <div>
                <Link
                  to="/crear-historia"
                  state={{ id_hc: idHC }}
                >
                  + Crear Proceso Clínico...
                </Link>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
