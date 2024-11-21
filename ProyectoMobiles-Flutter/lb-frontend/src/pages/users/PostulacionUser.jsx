import React, { useEffect, useState } from 'react';
import { apiGet } from '../../services/api';

const PostulacionUser = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [estudiante, setEstudiante] = useState(null);
  const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null); // Estado para la oferta seleccionada

  useEffect(() => {
    const fetchEstudianteAndPostulaciones = async () => {
      try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          setError('No se encontró un usuario logueado.');
          setLoading(false);
          return;
        }

        console.log('userId obtenido de localStorage:', userId);

        const estudiantes = await apiGet('/estudiante');
        console.log('Estudiantes obtenidos:', estudiantes);

        const estudianteLogueado = estudiantes.find(est => est.authUserId === parseInt(userId));

        if (!estudianteLogueado) {
          console.log(`No se encontró estudiante con authUserId: ${userId}`);
          setError('No se encontró el estudiante asociado a este usuario.');
          setLoading(false);
          return;
        }

        console.log('Estudiante logueado encontrado:', estudianteLogueado);

        setEstudiante(estudianteLogueado);

        const postulacionesResponse = await apiGet('/postulacion');
        console.log('Postulaciones obtenidas:', postulacionesResponse);

        const postulacionesEstudiante = postulacionesResponse.filter(
          (postulacion) => postulacion.estudianteId === estudianteLogueado.id
        );

        console.log('Postulaciones del estudiante logueado:', postulacionesEstudiante);

        setPostulaciones(postulacionesEstudiante);
      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setError('Error al cargar los datos. Intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchEstudianteAndPostulaciones();
  }, []);

  const handleSelectOferta = async (ofertaId) => {
    try {
      const ofertaDetails = await apiGet(`/oferta/${ofertaId}`); // Asumiendo que la API tiene esta ruta
      setOfertaSeleccionada(ofertaDetails);
      console.log('Detalles de la oferta seleccionada:', ofertaDetails);

      // Deshabilitar el scroll
      document.body.style.overflow = 'hidden';
    } catch (error) {
      console.error('Error al obtener los detalles de la oferta:', error);
      setError('Error al cargar los detalles de la oferta.');
    }
  };

  const closeModal = () => {
    setOfertaSeleccionada(null);
    document.body.style.overflow = 'auto'; // Rehabilitar el scroll
  };

  if (loading) return (
    <div className="flex justify-center items-center mt-16">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#375534]"></div>
      <span className="ml-4 text-[#6B9071]">Cargando...</span>
    </div>
  );
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#E3EED4] p-4">
      <h1 className="text-4xl font-bold mb-6 text-[#375534]">Mis Postulaciones</h1>
      {postulaciones.length === 0 ? (
        <div className="text-[#6B9071]">No tienes postulaciones registradas.</div>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {postulaciones.map((postulacion) => (
            <div
              key={postulacion.id}
              onClick={() => handleSelectOferta(postulacion.ofertaId)}
              className="bg-[#E3EED4] shadow-lg rounded-lg p-6 border border-[#AEC3B0] cursor-pointer hover:shadow-xl transition transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold mb-4 text-[#375534]">
                Oferta: {postulacion.ofertaDto.titulo}
              </h2>
              <p className="text-sm mb-1 text-[#6B9071]">
                <strong>Descripción:</strong> {postulacion.ofertaDto.descripcion}
              </p>
              <p className="text-sm mb-1 text-[#6B9071]">
                <strong>Ubicación:</strong> {postulacion.ofertaDto.ubicacion}
              </p>
              <p className="text-sm mb-1 text-[#6B9071]">
                <strong>Estado:</strong> {postulacion.estadoPostulacion}
              </p>
              <p className="text-sm mb-1 text-[#6B9071]">
                <strong>Fecha de Postulación:</strong> {postulacion.fechaPostulacion}
              </p>
            </div>
          ))}
        </div>
      )}

      {ofertaSeleccionada && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0F2A1D] bg-opacity-75 z-50">
          <div className="bg-[#E3EED4] shadow-lg rounded-lg p-6 w-11/12 md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-[#375534]">
              Detalles de la Oferta: {ofertaSeleccionada.titulo}
            </h2>
            <p className="text-sm mb-1 text-[#6B9071]">
              <strong>Descripción:</strong> {ofertaSeleccionada.descripcion}
            </p>
            <p className="text-sm mb-1 text-[#6B9071]">
              <strong>Ubicación:</strong> {ofertaSeleccionada.ubicacion}
            </p>
            <p className="text-sm mb-1 text-[#6B9071]">
              <strong>Tipo de Practicante:</strong> {ofertaSeleccionada.tipoPracticante}
            </p>
            <p className="text-sm mb-1 text-[#6B9071]">
              <strong>Duración:</strong> {ofertaSeleccionada.duracion}
            </p>
            <p className="text-sm mb-1 text-[#6B9071]">
              <strong>Empresa:</strong> {ofertaSeleccionada.empresaDto.nombre}
            </p>
            <p className="text-sm mb-1 text-[#6B9071]">
              <strong>Sector:</strong> {ofertaSeleccionada.empresaDto.sector}
            </p>
            <p className="text-sm mb-1 text-[#6B9071]">
              <strong>Dirección:</strong> {ofertaSeleccionada.empresaDto.direccion}
            </p>
            <p className="text-sm mb-1 text-[#6B9071]">
              <strong>Teléfono:</strong> {ofertaSeleccionada.empresaDto.telefono}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-[#375534] text-white rounded px-4 py-2 hover:bg-[#0F2A1D] transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostulacionUser;