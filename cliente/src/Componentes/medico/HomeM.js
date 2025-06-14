import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import '../../styles/Home.css';
import Nav from '../Nav.js';
import Footer from '../Footer.js';


export default function HomeM() {
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
                        Bienvenid@, {user ? user.nombre : ''}
                    </h1>
                    <p className="lead">
                      Accede a tu perfil profesional, visualiza historias clínicas y gestiona tus consultas.
                    </p>
                    <hr className="my-4" />
                </div>

                <div className="options-grid">
                    <div className="option-card">
                        <img 
                            src="/Images/user.svg" 
                            alt="Icono Paciente" 
                            className="option-icon" 
                            loading="lazy"
                        />
                        <h3>Listar Pacientes</h3>
                        <p>Ver mis pacientes...</p>
                        <Link 
                            className="signin" 
                            to="/paciente/listarpaciente" 
                            role="button"
                            aria-label="Listar Pacientes"
                        >
                            Ingresar
                        </Link>
                    </div>

                    <div className="option-card">
                        <img 
                            src="/Images/h_clinica.svg" 
                            alt="Icono Historia Clínica" 
                            className="option-icon" 
                            loading="lazy"
                        />
                        <h3>Historias Clínicas</h3>
                        <p>Consultar historias clínicas...</p>
                        <Link 
                            className="signin" 
                            to="/buscar-historia" 
                            role="button"
                            aria-label="Iniciar sesión como médico"
                        >
                            Ingresar
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
