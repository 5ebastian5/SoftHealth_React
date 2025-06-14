import { useState } from 'react';
import axios from 'axios';
import "../styles/ForgotPassword.css";

export default function ForgotPassword() {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoAlerta, setTipoAlerta] = useState(''); // 'exito' o 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setTipoAlerta('');

    try {
      const res = await axios.post('http://localhost:3001/api/forgot-password', { correo });
      setMensaje('Enlace de recuperación enviado correctamente.');
      setTipoAlerta('exito');
      console.log('Enlace de recuperación:', res.data.link);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al procesar la solicitud.';
      setMensaje(errorMsg);
      setTipoAlerta('error');
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Recuperar Contraseña</h2>

        <div className="form-group4">
          <label htmlFor="correo">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            placeholder="Correo registrado"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="save">
          Enviar enlace
        </button>

        {mensaje && (
          <div className={`alert4 ${tipoAlerta === "exito" ? "alert4-success" : "alert4-error"}`}>
            {mensaje}
          </div>
        )}
      </form>
    </div>
  );
}
