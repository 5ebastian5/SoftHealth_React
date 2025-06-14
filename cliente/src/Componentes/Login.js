import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';

export default function Login() {
  const [documento, setDocumento] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); // 'exito' o 'error'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setTipoMensaje("");

    if (!documento || !password) {
      setMensaje("Documento y contraseña son obligatorios");
      setTipoMensaje("error");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documento, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Credenciales incorrectas");
      }

      console.log("Login exitoso:", data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('rol', data.user.rol);

      setMensaje("Login exitoso.");
      setTipoMensaje("exito");

      switch (data.user.rol) {
        case 'A':
          navigate('/administrador/home');
          break;
        case 'M':
          navigate('/medico/home');
          break;
        case 'P':
          navigate('/paciente/home');
          break;
        default:
          navigate('/');
      }

    } catch (error) {
      setMensaje(error.message || "Error en el servidor");
      setTipoMensaje("error");
    }
  };

  const handleRegister = (selectedType) => {
    setShowModal(false);
    navigate(`/${selectedType}/register`);
  };

  const handleForget = () => {
    setShowModal(false);
    navigate(`/forgot-password`);
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="imgs">
          <img 
            className="imgs__img3" 
            src="/Images/softhealth_login.png" 
            alt="Logo SoftHealth" 
          />
        </div>

        <div className="form-group2">
          <label htmlFor="documento">Documento</label>
          <input
            type="text"
            id="documento"
            required
            placeholder="Ingrese su documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
          />
        </div>

        <div className="form-group2">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            required
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {mensaje && (
          <div className={`alert2 ${tipoMensaje === "exito" ? "alert-exito" : "error"}`}>
            {mensaje}
          </div>
        )}

        <button type="submit" className="register">
          Iniciar sesión
        </button>

        <p onClick={handleForget} className="forget">¿Olvidó su Contraseña?</p>
        {/* <button
          type="button"
          onClick={() => setShowModal(true)}
          className="register"
        >
          Registrarse
        </button> */}
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Selecciona el tipo de usuario</h3>
            <button 
              onClick={() => handleRegister("paciente")}
              className="modal-btn"
            >
              Paciente
            </button>
            <button 
              onClick={() => handleRegister("medico")}
              className="modal-btn"
            >
              Médico
            </button>
            <button 
              onClick={() => handleRegister("administrador")}
              className="modal-btn"
            >
              Administrador
            </button>
            <button 
              onClick={() => setShowModal(false)}
              className="modal-btn-cancel"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
