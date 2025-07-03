// src/pages/ListaProcesos.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom"; // ✅ Link va aquí
import "../../styles/HC.css";

export default function ListaProcesos() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const documento = location.state?.documento || user?.documento || null;
  const id_hc = location.state?.id_hc; // ✅ Este es el valor correcto y disponible

  const [procesos, setProcesos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("");

  useEffect(() => {
    const cargarProcesos = async () => {
      try {
        if (!id_hc) {
          setMensaje("ID del historial clínico no disponible.");
          setTipoAlerta("error");
          return;
        }

        const respProcesos = await fetch(`http://localhost:3001/procesos/${id_hc}`);
        const data = await respProcesos.json();

        if (!Array.isArray(data) || data.length === 0) {
          setMensaje("No se encontraron procesos clínicos.");
          setTipoAlerta("error");
        } else {
          setProcesos(data);
        }
      } catch (error) {
        console.error(error);
        setMensaje("Error al cargar procesos.");
        setTipoAlerta("error");
      }
    };

    cargarProcesos();
  }, [id_hc]);

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

      <div style={{ marginBottom: "15px" }}>
        <Link
          to="/crear-historia"
          state={{ id_hc }}
          className="details"
        >
          + Crear Proceso Clínico...
        </Link>

      </div>

      <button type="button" onClick={() => navigate(-1)} className="save1">Volver</button>

      {mensaje && (
        <div className={`alert1 ${tipoAlerta === "exito" ? "alert1-exito" : "alert1-error"}`}>
          {mensaje}
        </div>
      )}
    </div>
  );
}
