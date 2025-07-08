import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import '../styles/Home.css';
import Nav from './Nav.js';
import Footer from './Footer.js';

export default function Home() {
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
                    <h1 className="display-5 accordion">Bienvenido a Softhealth</h1>
                    <p className="lead">
                        Aquí podrás gestionar tus citas médicas, consultar tu historia clínica y mucho más. 
                        Si ya tienes cuenta, por favor <b>inicia sesión</b> para acceder a tus funcionalidades.
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
                        <p>Accede a tu perfil, consulta tu historia clínica y gestiona tus citas médicas.</p>
                        <Link 
                            className="signin" 
                            to="/login" 
                            role="button"
                            aria-label="Iniciar sesión como paciente"
                        >
                            Iniciar sesión
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
                        <p>Accede a tu perfil profesional, visualiza historias clínicas y gestiona tus consultas.</p>
                        <Link 
                            className="signin" 
                            to="/login" 
                            role="button"
                            aria-label="Iniciar sesión como médico"
                        >
                            Iniciar sesión
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
                        <p>Gestiona el sistema, administra usuarios, médicos, pacientes y recursos.</p>
                        <Link 
                            className="signin" 
                            to="/login" 
                            role="button"
                            aria-label="Iniciar sesión como administrador"
                        >
                            Iniciar sesión
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
