// src/pages/ListaProcesos.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../../styles/HC.css";

export default function ListaProcesos() {
  const location = useLocation();
  const navigate = useNavigate();

  const userLS = JSON.parse(localStorage.getItem("user")) || {};
  const rolLS = (localStorage.getItem("rol") || "").toLowerCase().trim();
  const idHCLS = localStorage.getItem("idHC");

  const documento = location.state?.documento || userLS.documento || null;

  const ID_HC =
    location.state?.id_hc ||
    idHCLS ||
    userLS.id_hc ||
    userLS.hv ||
    null;

  const esMedico =
    rolLS === "m" ||
    userLS.rol === "m" ||
    userLS.rol?.toLowerCase() === "medico" ||
    userLS.rol?.toLowerCase() === "médico";

  const [procesos, setProcesos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("");

  useEffect(() => {
    const cargarProcesos = async () => {
      if (!ID_HC) {
        setMensaje("ID del historial clínico no disponible.");
        setTipoAlerta("error");
        return;
      }
      try {
        const resp = await fetch(`http://localhost:3001/procesos/${ID_HC}`);
        const data = await resp.json();
        if (!Array.isArray(data) || data.length === 0) {
          setMensaje("No se encontraron procesos clínicos.");
          setTipoAlerta("error");
        } else {
          setProcesos(data);
        }
      } catch {
        setMensaje("Error al cargar procesos.");
        setTipoAlerta("error");
      }
    };
    cargarProcesos();
  }, [ID_HC]);

  const procesosFiltrados = procesos.filter((p, i) => {
    const fecha = p.fecha?.split("T")[0];
    return (
      String(i + 1).includes(filtro) ||
      fecha?.toLowerCase().includes(filtro.toLowerCase())
    );
  });

  return (
    <div className="form2">
      <h2>Procesos Clínicos del Paciente</h2>
      <p><strong>Nro. Documento:</strong> {documento}</p>

      <input
        type="text"
        placeholder="Buscar por número de registro o año (YYYY)"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="search"
      />

      <div className="form-wrapper">
        {procesosFiltrados.map((p, index) => (
          <div className="form-card" key={p.idProcesoClinico || index}>
            <h6><strong>Registro {index + 1}</strong></h6>
            <p><strong>Fecha:</strong> {p.fecha}</p>
            <p><strong>Tipo de Consulta:</strong> {p.tipoConsulta}</p>
            <a
              type="button"
              onClick={() =>
                navigate("/detalle-proceso", {
                  state: { proceso: p, index: index + 1, documento }
                })
              }
              className="details"
            >
              Ver Detalle...
            </a>
          </div>
        ))}
      </div>

      {esMedico && (
        <div style={{ marginBottom: "15px" }}>
          <Link
            to="/crear-historia"
            state={{ id_hc: ID_HC }}
            className="details"
          >
            + Crear Proceso Clínico...
          </Link>
        </div>
      )}

      <button type="button" onClick={() => navigate(-1)} className="save1">
        Volver...
      </button>

      {mensaje && (
        <div className={`alert1 ${tipoAlerta === "exito" ? "alert1-exito" : "alert1-error"}`}>
          {mensaje}
        </div>
      )}
    </div>
  );
}
