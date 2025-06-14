import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/HC.css";

export default function RegPClinico() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Tomamos el documento desde el location.state (o como fallback el del usuario actual)
  const user = JSON.parse(localStorage.getItem("user"));
  const documento = location.state?.documento || user?.documento || null;

  const [procesos, setProcesos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState(""); // 'exito' o 'error'

  useEffect(() => {
    const cargarProcesos = async () => {
      try {
        if (!documento) {
          setMensaje("Documento no proporcionado.");
          setTipoAlerta("error");
          return;
        }

        const respHC = await fetch(`http://localhost:3001/historial/${documento}`);
        const dataHC = await respHC.json();

        if (!respHC.ok || !dataHC.id_hc) {
          throw new Error("No se encontró el historial clínico.");
        }

        const id_hc = dataHC.id_hc;

        const respProcesos = await fetch(`http://localhost:3001/procesos/${id_hc}`);
        const dataProcesos = await respProcesos.json();

        if (!Array.isArray(dataProcesos) || dataProcesos.length === 0) {
          setMensaje("No se encontraron procesos clínicos.");
          setTipoAlerta("error");
        } else {
          setProcesos(dataProcesos);
          setMensaje("Procesos clínicos cargados correctamente.");
          setTipoAlerta("exito");
        }
      } catch (error) {
        console.error(error);
        setMensaje(error.message);
        setTipoAlerta("error");
      }
    };

    cargarProcesos();
  }, [documento]);

  return (
    <div className="form-wrapper">
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>Procesos Clínicos del Paciente</h2>

        <div className="form-group1">
          <label><strong>Nro. Documento:</strong></label>
          <p>{documento || "No disponible"}</p>
        </div>

        {procesos.length > 0 && (
          <div className="form-group1">
            {procesos.map((p, index) => (
              <div key={p.idProcesoClinico || index}>
                <label><strong>Registro {index + 1}</strong></label>
                <p><strong>Fecha:</strong> {p.fecha}</p>
                <p><strong>Tipo de Consulta:</strong> {p.tipoConsulta}</p>
                {p.anamnesis && <p><strong>Anamnesis:</strong> {p.anamnesis}</p>}
                {p.examenFisico && <p><strong>Examen Físico:</strong> {p.examenFisico}</p>}
                {p.diagnostico && <p><strong>Diagnóstico:</strong> {p.diagnostico}</p>}
                {p.tratamiento && <p><strong>Tratamiento:</strong> {p.tratamiento}</p>}
                {p.nota && <p><strong>Nota:</strong> {p.nota}</p>}
                <hr />
              </div>
            ))}
          </div>
        )}

        <button type="button" onClick={() => navigate(-1)} className="save1">Volver</button>

        {mensaje && (
          <div className={`alert1 ${tipoAlerta === "exito" ? "alert1-exito" : "alert1-error"}`}>
            {mensaje}
          </div>
        )}
      </form>
    </div>
  );
}
