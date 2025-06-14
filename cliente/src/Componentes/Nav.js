import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';


export default function Nav() {
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
                  <Link to="">
                    <img 
                      src="/Images/phone.svg" 
                      alt="Contacto" 
                      className="phone" 
                      title="Contacto"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="/login/paciente">
                    <img 
                      src="/Images/user.svg" 
                      alt="Iniciar Sesión" 
                      className="user" 
                      title="Iniciar Sesión"
                    />
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
      </div>
    );
}