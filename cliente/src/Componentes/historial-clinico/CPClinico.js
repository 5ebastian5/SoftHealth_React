import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/HC.css";

export default function CPClinico() {
  const location = useLocation();
  const navigate = useNavigate();
  const idHistoriaClinica = location.state?.id_hc;

  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().slice(0, 16),
    id_hc: "",
    tipoConsulta: "",
    anamnesis: "",
    examenFisico: "",
    diagnostico: "",
    tratamiento: "",
    nota: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState(""); // "exito" o "error"

  useEffect(() => {
    if (!idHistoriaClinica) {
      setMensaje("No se proporcionó un ID de historia clínica.");
      setTipoAlerta("error");
    } else {
      setFormData((prev) => ({
        ...prev,
        id_hc: idHistoriaClinica,
      }));
    }
  }, [idHistoriaClinica]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setTipoAlerta("");

    try {
      if (!formData.tipoConsulta || !formData.id_hc) {
        throw new Error("Tipo de consulta e ID de historia clínica son obligatorios.");
      }

      const response = await fetch("http://localhost:3001/proceso-clinico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al guardar el proceso clínico.");
      }

      setMensaje("Proceso clínico guardado con éxito.");
      setTipoAlerta("exito");

      setFormData({
        fecha: new Date().toISOString().slice(0, 16),
        id_hc: idHistoriaClinica,
        tipoConsulta: "",
        anamnesis: "",
        examenFisico: "",
        diagnostico: "",
        tratamiento: "",
        nota: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setMensaje(error.message);
      setTipoAlerta("error");
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Registrar Proceso Clínico</h2>

        <div className="form-group">
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="datetime-local"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipoConsulta">Tipo de Consulta:</label>
          <input
            type="text"
            id="tipoConsulta"
            name="tipoConsulta"
            value={formData.tipoConsulta}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="anamnesis">Anamnesis:</label>
          <textarea
            id="anamnesis"
            name="anamnesis"
            value={formData.anamnesis}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="examenFisico">Examen Físico:</label>
          <textarea
            id="examenFisico"
            name="examenFisico"
            value={formData.examenFisico}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="diagnostico">Diagnóstico:</label>
          <textarea
            id="diagnostico"
            name="diagnostico"
            value={formData.diagnostico}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tratamiento">Tratamiento:</label>
          <textarea
            id="tratamiento"
            name="tratamiento"
            value={formData.tratamiento}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="nota">Nota:</label>
          <textarea
            id="nota"
            name="nota"
            value={formData.nota}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="save">Guardar</button>

        {mensaje && (
          <div className={`alert1 ${tipoAlerta === "exito" ? "alert1-success" : "alert1-error"}`}>
            {mensaje}
          </div>
        )}
      </form>
    </div>
  );
}
