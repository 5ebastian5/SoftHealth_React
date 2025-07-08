import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/Nav.css';

export default function Nav() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    navigate('/');
  };

  // Nuevo: hace scroll suave hasta el final de la página
  const handleContactClick = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="nav">
      <header className="container-fluid sticky-top">
        <nav>
          <ul>
            <li>
              <Link to="/">
                <img
                  src="/Images/softhealth.png"
                  alt="Logo Softhealth"
                  className="softhealth"
                  title="Logo Softhealth"
                />
              </Link>
            </li>

            <li>
              <Link to="/">
                <img
                  src="/Images/home.svg"
                  alt="Inicio"
                  className="home"
                  title="Inicio"
                />
              </Link>
            </li>

            <li>
                <img
                  src="/Images/phone.svg"
                  alt="Contacto"
                  className="phone"
                  onClick={handleContactClick}
                />
            </li>

            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="logout-btn">
                  Cerrar Sesión
                </button>
              ) : (
                <Link to="/login">
                  <img
                    src="/Images/user.svg"
                    alt="Iniciar Sesión"
                    className="user"
                    title="Iniciar Sesión"
                  />
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
