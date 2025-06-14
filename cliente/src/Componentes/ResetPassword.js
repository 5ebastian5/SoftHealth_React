import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/Login.css'; // Reutiliza estilos de Login

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState(""); // "success" o "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setTipoAlerta("");

    if (newPassword !== confirmPassword) {
      setMensaje("Las contraseñas no coinciden.");
      setTipoAlerta("error");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/reset-password", {
        token,
        newPassword,
      });

      if (res.data.success) {
        setMensaje("Contraseña actualizada con éxito.");
        setTipoAlerta("success");
        setTimeout(() => navigate("/"), 3000);
      } else {
        setMensaje("Error al actualizar la contraseña.");
        setTipoAlerta("error");
      }
    } catch (err) {
      console.error(err);
      setMensaje("Token inválido o expirado.");
      setTipoAlerta("error");
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Restablecer contraseña</h2>

        {mensaje && (
          <div className={`alert ${tipoAlerta}`}>
            {mensaje}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="newPassword">Nueva contraseña</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="save">
          Guardar
        </button>
      </form>
    </div>
  );
}
