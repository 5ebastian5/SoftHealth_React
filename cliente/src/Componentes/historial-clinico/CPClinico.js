import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/HC.css";

export default function CPClinico() {
  const location = useLocation();
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

        <div className="form4-grid">
          {Object.entries({
            Fecha: (
              <input
                type="datetime-local"
                name="fecha"
                value={formData.fecha || ""}
                onChange={handleChange}
                required
              />
            ),
            "Tipo de Consulta": (
              <input
                type="text"
                name="tipoConsulta"
                value={formData.tipoConsulta || ""}
                onChange={handleChange}
                required
              />
            ),
            Anamnesis: (
              <textarea name="anamnesis" value={formData.anamnesis || ""} onChange={handleChange} />
            ),
            "Examen Físico": (
              <textarea name="examenFisico" value={formData.examenFisico || ""} onChange={handleChange} />
            ),
            Diagnóstico: (
              <textarea name="diagnostico" value={formData.diagnostico || ""} onChange={handleChange} />
            ),
            Tratamiento: (
              <textarea name="tratamiento" value={formData.tratamiento || ""} onChange={handleChange} />
            ),
            Nota: (
              <textarea name="nota" value={formData.nota || ""} onChange={handleChange} />
            ),
            "Enfermedades actuales": (
              <textarea name="enfermedadesActuales" value={formData.enfermedadesActuales || ""} onChange={handleChange} />
            ),
            Medicamentos: (
              <textarea name="medicamentos" value={formData.medicamentos || ""} onChange={handleChange} />
            ),
            "Métodos anticonceptivos": (
              <input type="text" name="metodosAnticonceptivos" value={formData.metodosAnticonceptivos || ""} onChange={handleChange} />
            ),
            "Estado mental / neurológico": (
              <textarea name="estadoMental" value={formData.estadoMental || ""} onChange={handleChange} />
            ),
            TA: (
              <input type="text" name="ta" value={formData.ta || ""} onChange={handleChange} />
            ),
            FC: (
              <input type="text" name="fc" value={formData.fc || ""} onChange={handleChange} />
            ),
            Temperatura: (
              <input type="text" name="temp" value={formData.temp || ""} onChange={handleChange} />
            ),
            "Frecuencia Respiratoria": (
              <input type="text" name="frecuenciaRespiratoria" value={formData.frecuenciaRespiratoria || ""} onChange={handleChange} />
            ),
            "Peso (kg)": (
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
            ),
            "Talla (cm)": (
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
            ),
            IMC: (
              <input type="text" name="imc" value={formData.imc || ""} readOnly />
            ),
            "Exámenes complementarios": (
              <textarea name="examenesComplementarios" value={formData.examenesComplementarios || ""} onChange={handleChange} />
            ),
            Laboratorio: (
              <textarea name="laboratorio" value={formData.laboratorio || ""} onChange={handleChange} />
            ),
            "¿Qué estudios?": (
              <textarea name="queEstudios" value={formData.queEstudios || ""} onChange={handleChange} />
            ),
            "Antecedentes Heredo Familiares": (
              <textarea name="antecedentesFamiliares" value={formData.antecedentesFamiliares || ""} onChange={handleChange} />
            ),
          }).map(([label, input], i) => (
            <div className="form-group" key={i}>
              <label>{label}:</label>
              {input}
            </div>
          ))}
        </div>

        <button type="submit" className="save1">Guardar</button>

        {mensaje && (
          <div className={`alert1 ${tipoAlerta === "exito" ? "alert1-exito" : "alert1-error"}`}>
            {mensaje}
          </div>
        )}
    </form>
  </>
  );
}