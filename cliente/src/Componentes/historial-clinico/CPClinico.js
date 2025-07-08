import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/HC.css";

export default function CPClinico() {
  const location = useLocation();
  const navigate = useNavigate();

  const idHistoriaClinica = location.state?.id_hc || "";

  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().slice(0, 16),
    tipoConsulta: "",
    anamnesis: "",
    examenFisico: "",
    diagnostico: "",
    tratamiento: "",
    nota: "",
    enfermedadesActuales: "",
    medicamentos: "",
    metodosAnticonceptivos: "",
    estadoMental: "",
    ta: "",
    fc: "",
    temp: "",
    frecuenciaRespiratoria: "",
    peso: "",
    talla: "",
    imc: "",
    examenesComplementarios: "",
    laboratorio: "",
    queEstudios: "",
    antecedentesFamiliares: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setTipoAlerta("");

    try {
      if (!idHistoriaClinica || String(idHistoriaClinica).trim() === "") {
        throw new Error("ID de historia clínica no está definido correctamente.");
      }

      if (!formData.tipoConsulta || formData.tipoConsulta.trim() === "") {
        throw new Error("El campo tipo de consulta es obligatorio.");
      }

      const limpiarCampos = (obj) => {
        const limpio = {};
        for (let key in obj) {
          const value = obj[key];
          limpio[key] = value === "" ? null : value;
        }
        return limpio;
      };

      const payload = {
        ...limpiarCampos(formData),
        id_hc: idHistoriaClinica,
      };

      const response = await fetch("http://localhost:3001/proceso-clinico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error al guardar el proceso clínico.");

      setMensaje("Proceso clínico guardado con éxito.");
      setTipoAlerta("exito");

      setFormData({
        fecha: new Date().toISOString().slice(0, 16),
        tipoConsulta: "",
        anamnesis: "",
        examenFisico: "",
        diagnostico: "",
        tratamiento: "",
        nota: "",
        enfermedadesActuales: "",
        medicamentos: "",
        metodosAnticonceptivos: "",
        estadoMental: "",
        ta: "",
        fc: "",
        temp: "",
        frecuenciaRespiratoria: "",
        peso: "",
        talla: "",
        imc: "",
        examenesComplementarios: "",
        laboratorio: "",
        queEstudios: "",
        antecedentesFamiliares: "",
      });
    } catch (error) {
      setMensaje(error.message);
      setTipoAlerta("error");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form4">
  <h2>Registrar Proceso Clínico</h2>

  {/* === SECCIÓN: DATOS BÁSICOS === */}
  <h3 className="dp-section-title">Datos de Consulta</h3>
  <div className="form4-grid">
    <div className="form-group">
      <label>Fecha:</label>
      <input
        type="datetime-local"
        name="fecha"
        value={formData.fecha || ""}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label>Tipo de Consulta:</label>
      <input
        type="text"
        name="tipoConsulta"
        value={formData.tipoConsulta || ""}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  {/* === SECCIÓN: ANAMNESIS CLÍNICA === */}
  <h3 className="dp-section-title">Anamnesis Clínica</h3>
  <div className="form4-grid">
    <div className="form-group">
      <label>Enfermedades actuales:</label>
      <textarea name="enfermedadesActuales" value={formData.enfermedadesActuales || ""} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label>Medicamentos:</label>
      <textarea name="medicamentos" value={formData.medicamentos || ""} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label>Métodos anticonceptivos:</label>
      <input type="text" name="metodosAnticonceptivos" value={formData.metodosAnticonceptivos || ""} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label>Estado mental / neurológico:</label>
      <textarea name="estadoMental" value={formData.estadoMental || ""} onChange={handleChange} />
    </div>

    <div className="form-group"><label>TA:</label><input type="text" name="ta" value={formData.ta || ""} onChange={handleChange} /></div>
    <div className="form-group"><label>FC:</label><input type="text" name="fc" value={formData.fc || ""} onChange={handleChange} /></div>
    <div className="form-group"><label>Temperatura:</label><input type="text" name="temp" value={formData.temp || ""} onChange={handleChange} /></div>
    <div className="form-group"><label>Frecuencia Respiratoria:</label><input type="text" name="frecuenciaRespiratoria" value={formData.frecuenciaRespiratoria || ""} onChange={handleChange} /></div>

    <div className="form-group">
      <label>Peso (kg):</label>
      <input
        type="number"
        step="0.01"
        name="peso"
        value={formData.peso ?? ""}
        onChange={(e) => {
          const peso = e.target.value;
          setFormData((prev) => {
            const tallaMetros = prev.talla ? prev.talla / 100 : 0;
            const nuevoIMC = peso && tallaMetros ? (parseFloat(peso) / (tallaMetros ** 2)).toFixed(2) : "";
            return {
              ...prev,
              peso: peso === "" ? null : parseFloat(peso),
              imc: nuevoIMC,
            };
          });
        }}
      />
    </div>

    <div className="form-group">
      <label>Talla (cm):</label>
      <input
        type="number"
        name="talla"
        value={formData.talla ?? ""}
        onChange={(e) => {
          const talla = e.target.value;
          setFormData((prev) => {
            const peso = prev.peso;
            const tallaMetros = talla ? parseFloat(talla) / 100 : 0;
            const nuevoIMC = peso && tallaMetros ? (peso / (tallaMetros ** 2)).toFixed(2) : "";
            return {
              ...prev,
              talla: talla === "" ? null : parseFloat(talla),
              imc: nuevoIMC,
            };
          });
        }}
      />
    </div>

    <div className="form-group"><label>IMC:</label><input type="text" name="imc" value={formData.imc || ""} readOnly /></div>

    <div className="form-group"><label>Exámenes complementarios:</label><textarea name="examenesComplementarios" value={formData.examenesComplementarios || ""} onChange={handleChange} /></div>
    <div className="form-group"><label>Antecedentes Heredo Familiares:</label><textarea name="antecedentesFamiliares" value={formData.antecedentesFamiliares || ""} onChange={handleChange} /></div>
  </div>

  {/* === SECCIÓN: DIAGNÓSTICO Y MANEJO === */}
  <h3 className="dp-section-title">Diagnóstico y Manejo</h3>
  <div className="form4-grid">
    <div className="form-group"><label>Diagnóstico:</label><textarea name="diagnostico" value={formData.diagnostico || ""} onChange={handleChange} /></div>
    <div className="form-group"><label>Tratamiento:</label><textarea name="tratamiento" value={formData.tratamiento || ""} onChange={handleChange} /></div>
    <div className="form-group"><label>Laboratorio:</label><textarea name="laboratorio" value={formData.laboratorio || ""} onChange={handleChange} /></div>
    <div className="form-group"><label>Nota:</label><textarea name="nota" value={formData.nota || ""} onChange={handleChange} /></div>
  </div>

  {/* === BOTÓN Y MENSAJE === */}
  <button type="submit" className="save1">Guardar</button>
  {mensaje && (
    <div className={`alert1 ${tipoAlerta === "exito" ? "alert1-exito" : "alert1-error"}`}>
      {mensaje}
    </div>
  )}
  <div className="form2">
        <button onClick={() => navigate(-1)} className="save1">Volver</button>
      </div>
</form>

    </>
  );
}
