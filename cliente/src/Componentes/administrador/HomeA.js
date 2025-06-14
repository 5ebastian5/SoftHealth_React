import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import '../../styles/Home.css';
import Nav from '../Nav.js';
import Footer from '../Footer.js';

export default function HomeA() {
  const user = JSON.parse(localStorage.getItem('user'));

    const carouselImages = [
        { src: "/Images/banner.png", alt: "Banner principal Softhealth" },
        { src: "/Images/banner_1.png", alt: "Banner atención médica" },
        { src: "/Images/banner_2.png", alt: "Banner servicios de salud" },
        { src: "/Images/banner_3.png", alt: "Banner citas en línea" },
        { src: "/Images/banner_4.png", alt: "Banner especialistas" },
        { src: "/Images/banner_5.png", alt: "Banner cuidado personalizado" },
        { src: "/Images/banner_6.png", alt: "Banner tecnología médica" }
    ];

    return (
        <div>
            <Nav />

            {/* Carrusel Full-Width */}
            <div className="carousel-fullwidth">
                <Carousel fade interval={5000} controls indicators pause="hover">
                    {carouselImages.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="d-block w-100"
                                src={image.src}
                                alt={image.alt}
                                loading="lazy"
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            {/* Contenido principal centrado */}
            <div className="main-content-container">
                <div className="welcome-section">
                    <h1 className="display-5 accordion">
                      Bienvenida, {user ? user.nombre : ''}
                    </h1>
                    <p className="lead">
                      Desde aquí podrás gestionar médicos, pacientes y EPS, así como realizar otras tareas administrativas.
                    </p>
                    <hr className="my-4" />
                </div>

                <div className="options-grid">
                    <div className="option-card">
                        <img 
                            src="/Images/paciente.png" 
                            alt="Icono Paciente" 
                            className="option-icon" 
                            loading="lazy"
                        />
                        <h3>Pacientes</h3>
                        <p>Gestión de pacientes registrados...</p>
                        <Link 
                            className="signin" 
                            to="/paciente/register" 
                            role="button"
                            aria-label="Iniciar sesión como paciente"
                        >
                            Registrar
                        </Link>

                        <Link 
                            className="signin" 
                            to="/paciente/listarpaciente" 
                            role="button"
                            aria-label="Iniciar sesión como paciente"
                        >
                            Listar
                        </Link>
                    </div>

                    <div className="option-card">
                        <img 
                            src="/Images/Doctor_Male_icon-icons.com_75051.png" 
                            alt="Icono Medico" 
                            className="option-icon" 
                            loading="lazy"
                        />
                        <h3>Médicos</h3>
                        <p>Gestión de médicos registrados...</p>
                        <Link 
                            className="signin" 
                            to="/medico/register" 
                            role="button"
                            aria-label="Iniciar sesión como paciente"
                        >
                            Registrar
                        </Link>

                        <Link 
                            className="signin" 
                            to="/medico/listarmedico" 
                            role="button"
                            aria-label="Iniciar sesión como paciente"
                        >
                            Listar
                        </Link>
                    </div>

                    <div className="option-card">
                        <img 
                            src="/Images/admin.png" 
                            alt="Icono Administrador" 
                            className="option-icon" 
                            loading="lazy"
                        />
                        <h3>Administradores</h3>
                        <p>Gestión de auxiliares registrados...</p>
                        <Link 
                            className="signin" 
                            to="/administrador/register" 
                            role="button"
                            aria-label="Iniciar sesión como paciente"
                        >
                            Registrar
                        </Link>

                        <Link 
                            className="signin" 
                            to="/administrador/listaradmin" 
                            role="button"
                            aria-label="Iniciar sesión como paciente"
                        >
                            Listar
                        </Link>
                    </div>

                    <div className="option-card">
                        <img 
                            src="/Images/user.svg" 
                            alt="Icono Citas Medicas" 
                            className="option-icon" 
                            loading="lazy"
                        />
                        <h3>Mi Perfil</h3>
                        <p>Actualizar tus datos personales...</p>
                        <Link 
                            className="signin" 
                            to="/profile" 
                            role="button"
                            aria-label="Listar Pacientes"
                        >
                            Ingresar
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
