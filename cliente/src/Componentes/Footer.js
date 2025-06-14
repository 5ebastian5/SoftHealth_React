import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa'; // Importar íconos de react-icons

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-container">
        <div className="footer-section legales">
          <h5>Legales</h5>
          <div className="footer-columns">
            <ul>
              <li><Link to="/">Portabilidad</Link></li>
              <li><Link to="/">Protección de datos personales</Link></li>
              <li><Link to="/">Nuestros tiempos de espera en citas</Link></li>
              <li><Link to="/">Cuotas moderadoras y copagos 2025</Link></li>
              <li><Link to="/">Informe de Gestión</Link></li>
              <li><Link to="/">Donación de órganos y tejidos</Link></li>
              <li><Link to="/">Canal Anticorrupción - SARLAFT</Link></li>
              <li><Link to="/">Código de conducta y de buen gobierno</Link></li>
              <li><Link to="/">Estados financieros</Link></li>
              <li><Link to="/">Red de prestadores de servicios y urgencias</Link></li>
              <li><Link to="/">Consulta de asignaciones de EPS</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-section">
          <h5>Normatividad</h5>
          <ul>
            <li><Link to="/">Decreto 780 de 2016</Link></li>
            <li><Link to="/">Circular 008 de 2018</Link></li>
            <li><Link to="/">Circular 000016 de 2016</Link></li>
            <li><Link to="/">Circular 000011 de 2020</Link></li>
            <li><Link to="/">Reporte de información de convenios</Link></li>
          </ul>

          <hr className='my-4' />
          <h5>Redes Sociales</h5>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={30} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={30} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={30} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h5>Información</h5>
          <ul>
            <li><Link to="/">SoftHealth EPS-S</Link></li>
            <li><Link to="/">Trabaje con nosotros</Link></li>
            <li><Link to="/">Citrix</Link></li>
            <li><Link to="/">Mapa del sitio</Link></li>
            <li><Link to="/">Directorio PBS</Link></li>
            <li><span>Línea Nacional 018000 114524</span></li>
            <li><a href="mailto:notificacionesjud@softhealth.com.co">notificacionesjud@softhealth.com.co</a></li>
            <li><Link to="/">Términos y condiciones</Link></li>
          </ul>
        </div>
      </div>

      <div className="copyright">
        <p>© 2024 SoftHealth. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
