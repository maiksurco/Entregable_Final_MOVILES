import React, { useState, useEffect } from 'react';
import NavbarStandar from '../components/NavbarStandar';
import { Outlet, useLocation } from 'react-router-dom';

// Importación de imágenes
import oportunidadesLaborales from '../images/oportunidades_laborales.png';
import desarrolloProfesional from '../images/desarrollo_profesional.png';
import crecimientoCarrera from '../images/crecimiento_carrera.png';
import apoyoEstudiantes from '../images/apoyo_estudiantes.png';
import practicasEmpleos from '../images/practicas_empleos.png';
import elegirOferta from '../images/elegir_oferta.png';
import crear_usuario from '../images/crear_usuario.png';

// Datos de los anuncios laborales
const jobAds = [
  { id: 1, text: "Las mejores oportunidades te están esperando.", imageUrl: oportunidadesLaborales },
  { id: 2, text: "Invierte en ti mismo, desarrolla tus habilidades.", imageUrl: desarrolloProfesional },
  { id: 3, text: "Da el siguiente paso en tu carrera con nosotros.", imageUrl: crecimientoCarrera },
  { id: 4, text: "Estamos aquí para ayudarte a encontrar tu camino.", imageUrl: apoyoEstudiantes },
  { id: 5, text: "Las prácticas son el primer paso hacia el éxito profesional.", imageUrl: practicasEmpleos }
];

const HomeCli = () => {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const isHomePath = location.pathname === '/';

  const nextSlide = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % jobAds.length);
  const prevSlide = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + jobAds.length) % jobAds.length);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-#E3EED4 from-[#375534] to-[#6B9071] min-h-screen relative">
      <NavbarStandar/>
      <div>
        {isHomePath && (
          <>
            <h2 className="text-center text-5xl font-bold text-[#6B9071] animate-bounce mt-16">
              Bienvenido a la Bolsa Laboral
            </h2>

            <div className="relative flex justify-center mt-10 z-0">
              <div className="relative bg-[#E3EED4] rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full transition-transform duration-500 transform hover:scale-105">
                <img
                  src={jobAds[currentIndex].imageUrl}
                  alt={jobAds[currentIndex].text}
                  className="w-full h-80 object-cover rounded-t-2xl transition-transform duration-700 transform hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[#0F2A1D] bg-opacity-50 text-[#E3EED4] font-semibold text-center text-2xl transition-opacity duration-700">
                  <p className="animate-fade-in-up">{jobAds[currentIndex].text}</p>
                </div>
              </div>

              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-gradient-to-r from-[#375534] to-[#6B9071] text-[#E3EED4] rounded-full p-3 shadow-lg hover:from-[#6B9071] hover:to-[#375534] transition-all duration-300"
              >
                &#10094;
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-gradient-to-r from-[#375534] to-[#6B9071] text-[#E3EED4] rounded-full p-3 shadow-lg hover:from-[#6B9071] hover:to-[#375534] transition-all duration-300"
              >
                &#10095;
              </button>
            </div>

            <div className="flex justify-center mt-4 space-x-2 z-10">
              {jobAds.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-[#375534]' : 'bg-[#AEC3BO]'} transition-colors duration-300`}
                />
              ))}
            </div>

            <div className="flex justify-center mt-12 px-4 z-10 mb-8">
              <div className="flex space-x-4">
                <div className="relative bg-[#E3EED4] rounded-lg shadow-xl overflow-hidden w-72 transition-transform duration-500 transform hover:scale-105">
                  <img
                    src={elegirOferta}
                    alt="Elegir Oferta"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0F2A1D] bg-opacity-50 text-[#E3EED4] font-bold text-center text-xl">
                    <p>Explora y elige la oferta laboral perfecta para ti</p>
                  </div>
                </div>

                <div className="relative bg-[#E3EED4] rounded-lg shadow-xl overflow-hidden w-72 transition-transform duration-500 transform hover:scale-105">
                  <img
                    src={crear_usuario}
                    alt="Crear Usuario"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0F2A1D] bg-opacity-50 text-[#E3EED4] font-bold text-center text-xl">
                    <p>Crea tu cuenta y empieza tu camino laboral</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default HomeCli;