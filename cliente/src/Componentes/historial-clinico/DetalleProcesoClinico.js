import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/HC.css";

export default function DetalleProceso() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { proceso, index, documento } = state || {};

  const [mensaje, setMensaje] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("");

  useEffect(() => {
    if (proceso) {
      setMensaje("Datos cargados correctamente.");
      setTipoAlerta("exito");
    } else {
      setMensaje("No hay datos disponibles.");
      setTipoAlerta("error");
    }
  }, [proceso]);

  // Helper – item card
  const Item = ({ etiqueta, valor }) => (
    <div className="dp-item">
      <span className="dp-label">{etiqueta}</span>
      <span className="dp-value">{valor}</span>
    </div>
  );

  const renderSection = (titulo, items) => {
    const visibles = items.filter(({ valor }) => valor !== undefined && valor !== null && valor !== "");
    if (!visibles.length) return null;

    return (
      <section className="form4">
        <h2 className="dp-section-title">{titulo}</h2>
        <div className="dp-grid-3">
          {visibles.map(({ etiqueta, valor }) => (
            <Item key={etiqueta} etiqueta={etiqueta} valor={valor} />
          ))}
        </div>
      </section>
    );
  };

  if (!proceso) {
    return (
      <div className="form3">
        <h2>Detalle del Proceso</h2>
        <p>No hay datos disponibles.</p>
        <button onClick={() => navigate(-1)} className="save1">Volver</button>
        {mensaje && (
          <div className={`alert1 ${tipoAlerta === "exito" ? "alert1-exito" : "alert1-error"}`}>{mensaje}</div>
        )}
      </div>
    );
  }

  return (
    <div className="form3">
      <h2 className="dp-heading">Detalle del Proceso Clínico</h2>

      <div className="dp-header-grid">
        <div><strong>Nro. Documento:</strong> {documento}</div>
        <div><strong>Registro:</strong> {index}</div>
        <div><strong>Fecha:</strong> {proceso.fecha}</div>
        <div><strong>Tipo Consulta:</strong> {proceso.tipoConsulta}</div>
      </div>

      {renderSection("Historia Clínica Básica", [
        { etiqueta: "Anamnesis: ", valor: proceso.anamnesis },
        { etiqueta: "Examen Físico: ", valor: proceso.examenFisico },
        { etiqueta: "Diagnóstico: ", valor: proceso.diagnostico },
        { etiqueta: "Tratamiento: ", valor: proceso.tratamiento },
        { etiqueta: "Nota: ", valor: proceso.nota },
      ])}

      {renderSection("Información Adicional", [
        { etiqueta: "Enfermedades Actuales: ", valor: proceso.enfermedadesActuales },
        { etiqueta: "Medicamentos: ", valor: proceso.medicamentos },
        { etiqueta: "Métodos Anticonceptivos: ", valor: proceso.metodosAnticonceptivos },
        { etiqueta: "Estado Mental: ", valor: proceso.estadoMental },
      ])}

      {renderSection("Signos Vitales", [
        { etiqueta: "TA: ", valor: proceso.ta },
        { etiqueta: "FC: ", valor: proceso.fc },
        { etiqueta: "Temperatura: ", valor: proceso.temp },
        { etiqueta: "Frecuencia Respiratoria: ", valor: proceso.frecuenciaRespiratoria },
      ])}

      {renderSection("Medidas Físicas", [
        { etiqueta: "Peso (kg): ", valor: proceso.peso },
        { etiqueta: "Talla (cm): ", valor: proceso.talla },
        { etiqueta: "IMC: ", valor: proceso.imc },
      ])}

      {renderSection("Estudios y Antecedentes", [
        { etiqueta: "Exámenes Complementarios: ", valor: proceso.examenesComplementarios },
        { etiqueta: "Laboratorio: ", valor: proceso.laboratorio },
        { etiqueta: "¿Qué estudios?: ", valor: proceso.queEstudios },
        { etiqueta: "Antecedentes Heredo‑Familiares: ", valor: proceso.antecedentesFamiliares },
      ])}
    <div className="form2">
      <button onClick={() => navigate(-1)} className="save1">Volver</button>
    </div>

      {mensaje && (
        <div className={`alert1 ${tipoAlerta === "exito" ? "alert1-exito" : "alert1-error"}`}>{mensaje}</div>
      )}
    </div>
  );
}
