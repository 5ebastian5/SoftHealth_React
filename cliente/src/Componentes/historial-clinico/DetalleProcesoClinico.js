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

 const [datosPaciente, setDatosPaciente] = useState(null);

  useEffect(() => {
  if (documento) {
    fetch(`http://localhost:3001/paciente/${documento}`)
      .then(res => res.json())
      .then(data => setDatosPaciente(data))
      .catch(() => setDatosPaciente(null));
  }
}, [documento]);


  const Item = ({ etiqueta, valor }) => (
    <div className="dp-item">
      <span className="dp-label">{etiqueta}</span>
      <span className="dp-value">{valor}</span>
    </div>
  );

  if (!proceso) {
    return (
      <div className="form3">
        <h2>Detalle del Proceso</h2>
        <p>No hay datos disponibles.</p>
        <button onClick={() => navigate(-1)} className="save1">Volver</button>
        {mensaje && (
          <div className={`alert1 ${tipoAlerta === "exito" ? "alert1-exito" : "alert1-error"}`}>
            {mensaje}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="form3">
      <h2 className="dp-heading">Detalle del Proceso Clínico</h2>

      {/* CABECERA con datos personales + generales */}
      <div className="dp-header-grid">
  <div><strong>Nombre:</strong> {datosPaciente?.nombre} {datosPaciente?.apellido}</div>
  <div><strong>Teléfono:</strong> {datosPaciente?.telefono}</div>
  <div><strong>Nro. Documento:</strong> {documento}</div>
  <div><strong>Registro:</strong> {index}</div>
  <div><strong>Fecha:</strong> {proceso.fecha}</div>
  <div><strong>Tipo Consulta:</strong> {proceso.tipoConsulta}</div>
</div>


      {/* SECCIÓN 1: Anamnesis */}
      <section className="form4">
        <h2 className="dp-section-title">Anamnesis</h2>
        <div className="dp-grid-3">
          <Item etiqueta="Enfermedades actuales:" valor={proceso.enfermedadesActuales} />
          <Item etiqueta="Medicamentos:" valor={proceso.medicamentos} />
          <Item etiqueta="Métodos anticonceptivos:" valor={proceso.metodosAnticonceptivos} />
          <Item etiqueta="Estado mental / neurológico:" valor={proceso.estadoMental} />
          <Item etiqueta="TA:" valor={proceso.ta} />
          <Item etiqueta="FC:" valor={proceso.fc} />
          <Item etiqueta="Frecuencia Respiratoria:" valor={proceso.frecuenciaRespiratoria} />
          <Item etiqueta="Temperatura:" valor={proceso.temp} />
          <Item etiqueta="Peso (kg):" valor={proceso.peso} />
          <Item etiqueta="Talla (cm):" valor={proceso.talla} />
          <Item etiqueta="IMC:" valor={proceso.imc} />
          <Item etiqueta="Exámenes complementarios:" valor={proceso.examenesComplementarios} />
          <Item etiqueta="Antecedentes Heredo‑Familiares:" valor={proceso.antecedentesFamiliares} />
        </div>
      </section>

      {/* SECCIÓN 2: Diagnóstico y Manejo */}
      <section className="form4">
        <h2 className="dp-section-title">Diagnóstico y Manejo</h2>
        <div className="dp-grid-3">
          <Item etiqueta="Diagnóstico:" valor={proceso.diagnostico} />
          <Item etiqueta="Tratamiento:" valor={proceso.tratamiento} />
          <Item etiqueta="Laboratorio:" valor={proceso.laboratorio} />
          <Item etiqueta="Nota:" valor={proceso.nota} />
        </div>
      </section>

      <div className="form2">
        <button onClick={() => navigate(-1)} className="save1">Volver</button>
      </div>

      {mensaje && (
        <div className={`alert1 ${tipoAlerta === "exito" ? "alert1-exito" : "alert1-error"}`}>{mensaje}</div>
      )}
    </div>
  );
}
