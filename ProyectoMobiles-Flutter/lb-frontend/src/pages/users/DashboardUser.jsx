import React, { useEffect, useState } from 'react';
import { apiGet } from '../../services/api';
import NavbarUser from '../../components/NavbarUser';
import { Outlet, useLocation } from 'react-router-dom';

// Importación de imágenes
import bienvenida_comunidad_estudiantil from '../../images/bienvenida_comunidad_estudiantil.png';
import icono_crecimiento_profesional from '../../images/icono_crecimiento_profesional.png';
import estudiante_en_biblioteca from '../../images/estudiante_en_biblioteca.png';
import grafico_carrera_exito from '../../images/grafico_carrera_exito.png';
import apoyo_en_aula from '../../images/apoyo_en_aula.png';
import evento_feria_empleo from '../../images/evento_feria_empleo.png';
import seleccion_ofertas_laborales from '../../images/seleccion_ofertas_laborales.png';

const DashboardUser = () => {
    const location = useLocation();
    const isDashUserPath = location.pathname === '/user';
    const [estudiante, setEstudiante] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEstudiante = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    setError('No se encontró un usuario logueado.');
                    setLoading(false);
                    return;
                }
                const estudiantes = await apiGet('/estudiante');
                const estudianteLogueado = estudiantes.find(est => est.authUserId === parseInt(userId));

                if (!estudianteLogueado) {
                    setError('No se encontró el estudiante asociado a este usuario.');
                    setLoading(false);
                    return;
                }

                setEstudiante(estudianteLogueado);
            } catch (err) {
                setError('Error al cargar los datos del estudiante.');
            } finally {
                setLoading(false);
            }
        };

        fetchEstudiante();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center mt-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#375534]"></div>
          <span className="ml-4 text-[#6B9071]">Cargando...</span>
        </div>
      );
    if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

    return (
        <div className="bg-[#E3EED4] min-h-screen">
            <NavbarUser />

            {/* Si es la ruta del dashboard */}
            {isDashUserPath && (
                <div className="p-4">
                    {/* Mostrar saludo con el nombre del estudiante */}
                    <div className="relative flex flex-col items-center justify-center p-8 md:p-12 lg:p-16 bg-gradient-to-r from-[#375534] to-[#6B9071] text-[#E3EED4] text-center mt-4 mb-6 rounded-lg shadow-lg overflow-hidden">
                        <img
                            src={bienvenida_comunidad_estudiantil}
                            alt="Bienvenida Comunidad Estudiantil"
                            className="absolute inset-0 h-full w-full object-cover opacity-30 transform rotate-3"
                        />
                        <div className="relative z-10">
                            {estudiante ? (
                                <h1 className="text-4xl font-semibold">¡Bienvenido, {estudiante.nombre}!</h1>
                            ) : (
                                <h1 className="text-4xl font-semibold">¡Bienvenido!</h1>
                            )}
                            <p className="mt-2 text-lg max-w-md">Nos alegra verte de nuevo. Explora tus opciones a continuación:</p>
                        </div>
                    </div>

                    {/* Cuadrícula de opciones */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center justify-center bg-[#AEC3BO] shadow-lg p-4 transition-transform transform hover:scale-105">
                            <img src={icono_crecimiento_profesional} alt="Crecimiento Profesional" className="h-40 w-40 rounded-full mb-2" />
                            <h3 className="font-semibold text-lg text-[#375534] text-center">Crecimiento Profesional</h3>
                            <p className="text-center text-[#6B9071]">Descubre las herramientas que te ayudarán a crecer en tu carrera.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-[#AEC3BO] shadow-lg p-4 transition-transform transform hover:scale-105">
                            <img src={estudiante_en_biblioteca} alt="Desarrollo Profesional" className="h-40 w-40 rounded-full mb-2" />
                            <h3 className="font-semibold text-lg text-[#375534] text-center">Desarrollo Profesional</h3>
                            <p className="text-center text-[#6B9071]">Mejora tus habilidades y prepárate para el futuro.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-[#AEC3BO] shadow-lg p-4 transition-transform transform hover:scale-105">
                            <img src={grafico_carrera_exito} alt="Crecimiento Carrera" className="h-40 w-40 rounded-full mb-2" />
                            <h3 className="font-semibold text-lg text-[#375534] text-center">Crecimiento Carrera</h3>
                            <p className="text-center text-[#6B9071]">Visualiza tu éxito y establece tus metas profesionales.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-[#AEC3BO] shadow-lg p-4 transition-transform transform hover:scale-105">
                            <img src={apoyo_en_aula} alt="Apoyo Estudiantil" className="h-40 w-40 rounded-full mb-2" />
                            <h3 className="font-semibold text-lg text-[#375534] text-center">Apoyo Estudiantil</h3>
                            <p className="text-center text-[#6B9071]">Encuentra recursos y asistencia para tus estudios.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-[#AEC3BO] shadow-lg p-4 transition-transform transform hover:scale-105">
                            <img src={evento_feria_empleo} alt="Prácticas y Empleos" className="h-40 w-40 rounded-full mb-2" />
                            <h3 className="font-semibold text-lg text-[#375534] text-center">Prácticas y Empleos</h3>
                            <p className="text-center text-[#6B9071]">Conéctate con empresas y encuentra oportunidades laborales.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-[#AEC3BO] shadow-lg p-4 transition-transform transform hover:scale-105">
                            <img src={seleccion_ofertas_laborales} alt="Elegir Oferta" className="h-40 w-40 rounded-full mb-2" />
                            <h3 className="font-semibold text-lg text-[#375534] text-center">Elegir Oferta</h3>
                            <p className="text-center text-[#6B9071]">Evalúa tus opciones y elige la oferta que mejor se adapte a ti.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Outlet para renderizar rutas hijas */}
            <Outlet />
        </div>
    );
};

export default DashboardUser;