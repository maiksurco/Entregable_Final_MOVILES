import React, { useEffect, useState } from 'react';
import { apiGet } from '../../services/api';

const NotificacionUser = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [estudiante, setEstudiante] = useState(null);

  useEffect(() => {
    const fetchEstudianteAndNotificaciones = async () => {
      try {
        // Obtener el userId del usuario logueado desde localStorage
        const userId = localStorage.getItem('userId');

        if (!userId) {
          setError('No se encontró un usuario logueado.');
          setLoading(false);
          return;
        }

        // Obtener la lista de estudiantes
        const estudiantes = await apiGet('/estudiante');

        // Buscar al estudiante relacionado con el authUserId
        const estudianteLogueado = estudiantes.find(est => est.authUserId === parseInt(userId));

        if (!estudianteLogueado) {
          setError('No se encontró el estudiante asociado a este usuario.');
          setLoading(false);
          return;
        }

        setEstudiante(estudianteLogueado);

        // Obtener la lista de notificaciones
        const notificacionesResponse = await apiGet('/notificacion');

        // Filtrar las notificaciones que correspondan al estudiante logueado
        const notificacionesEstudiante = notificacionesResponse.filter(
          (notificacion) => notificacion.estudianteId === estudianteLogueado.id
        );

        setNotificaciones(notificacionesEstudiante);
      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setError(err.message.includes('Network') ? 'Error de red. Verifica tu conexión a internet.' : 'Error al cargar los datos. Intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchEstudianteAndNotificaciones();
  }, []);

  // Loading indicator with animation
  if (loading) return (
    <div className="flex justify-center items-center mt-16">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#375534]"></div>
      <span className="ml-4 text-[#6B9071]">Cargando...</span>
    </div>
  );

  // Error message
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#E3EED4] p-6 md:p-16">
      <h1 className="text-4xl font-bold mb-6 text-[#375534]">Mis Notificaciones</h1>

      {notificaciones.length === 0 ? (
        <div className="text-[#6B9071]">No tienes notificaciones registradas.</div>
      ) : (
        <div className="w-full max-w-4xl space-y-4">
          {notificaciones.map((notificacion) => (
            <div
              key={notificacion.id}
              className="bg-[#E3EED4] shadow-lg rounded-lg p-6 border border-[#AEC3B0] hover:bg-[#AEC3B0] transition ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* Icono de notificación */}
                  <i className="fas fa-bell text-[#375534] text-xl mr-4"></i>
                  <h2 className="text-2xl font-semibold text-[#375534]">{notificacion.mensaje}</h2>
                </div>
                {/* Mostrar fecha y hora */}
                <span className="text-sm text-[#6B9071]">
                  {new Date(notificacion.fechaEnvio).toLocaleString()}
                </span>
              </div>
              <p className="text-[#6B9071] mt-2">
                Enviado a: <strong>{`${notificacion.estudianteDto?.nombre || 'Estudiante'} ${notificacion.estudianteDto?.apellidoPaterno || ''} ${notificacion.estudianteDto?.apellidoMaterno || ''}`}</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificacionUser;