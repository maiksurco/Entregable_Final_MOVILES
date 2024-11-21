import React, { useEffect, useState } from 'react';
import { apiGet } from '../../services/api'; // Asegúrate de que esta función está definida correctamente.

const PerfilUser = () => {
  const [estudiante, setEstudiante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Obtener el ID del usuario logueado
        
        if (!userId) {
          setError('No se encontró un usuario logueado.');
          setLoading(false);
          return;
        }

        // Realizar la llamada a la API para obtener los datos del estudiante
        const estudiantesResponse = await apiGet('/estudiante');
        const estudianteLogueado = estudiantesResponse.find(est => est.authUserId === parseInt(userId));

        if (!estudianteLogueado) {
          setError('No se encontró el estudiante asociado a este usuario.');
        } else {
          setEstudiante(estudianteLogueado);
        }
      } catch (err) {
        setError('Error al cargar los datos del estudiante. Intenta de nuevo más tarde.');
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
    <div className="flex flex-col items-center min-h-screen bg-[#E3EED4] p-4">
      <h1 className="text-3xl font-semibold mb-6 text-[#0F2A1D]">Perfil del Estudiante</h1>
      {estudiante ? (
        <div className="bg-[#AEC3BO] shadow-md rounded-lg p-8 w-full max-w-3xl border border-[#6B9071]">
          <h2 className="text-2xl font-semibold mb-4 text-[#375534]">{estudiante.nombre} {estudiante.apellidoPaterno} {estudiante.apellidoMaterno}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <span className="text-lg font-medium text-[#375534] mb-1"><strong>DNI:</strong></span>
              <span className="text-lg text-[#6B9071] mb-3">{estudiante.dni}</span>
              
              <span className="text-lg font-medium text-[#375534] mb-1"><strong>Carrera:</strong></span>
              <span className="text-lg text-[#6B9071] mb-3">{estudiante.carrera}</span>

              <span className="text-lg font-medium text-[#375534] mb-1"><strong>Habilidades:</strong></span>
              <span className="text-lg text-[#6B9071] mb-3">{estudiante.habilidades}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium text-[#375534] mb-1"><strong>Universidad:</strong></span>
              <span className="text-lg text-[#6B9071] mb-3">{estudiante.universidad}</span>

              <span className="text-lg font-medium text-[#375534] mb-1"><strong>Horas Completadas:</strong></span>
              <span className="text-lg text-[#6B9071] mb-3">{estudiante.horasCompletadas}</span>

              <span className="text-lg font-medium text-[#375534] mb-1"><strong>Nombre de Usuario:</strong></span>
              <span className="text-lg text-[#6B9071]">{estudiante.authUserDto.userName}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-[#6B9071]">No se encontraron datos del estudiante.</div>
      )}
    </div>
  );
};

export default PerfilUser;