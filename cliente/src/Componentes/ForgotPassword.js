import { useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';
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
      // 1. Pedir el enlace de recuperación al backend
      const res = await axios.post('http://localhost:3001/api/forgot-password', { correo });
      const resetLink = res.data.link;

      // 2. Enviar el correo usando EmailJS
      await emailjs.send(
        'service_gv7d30m',        // Reemplaza con tu service ID
        'template_o40ss2v',       // Reemplaza con tu template ID
        {
          email: correo,
          reset_link: resetLink
        },
        'fmK29PFqDp91Mbynf'       // Reemplaza con tu public key
      );

      
      setMensaje('Enlace de recuperación enviado correctamente.');
      setTipoAlerta('exito');
      console.log('✅ Enlace enviado por email:', resetLink);
    } catch (err) {
      console.error('❌ Error:', err);
      const errorMsg = err.response?.data?.message || 'Error al enviar el correo.';
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
