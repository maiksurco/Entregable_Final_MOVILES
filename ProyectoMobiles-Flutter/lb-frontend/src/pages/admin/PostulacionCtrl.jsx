import React, { useEffect, useState } from 'react';
import { apiGet, apiPut, apiDelete, apiPost } from '../../services/api';
import { FaEdit, FaTrash, FaBell, FaExclamationTriangle } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const PostulacionCtrl = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPostulacion, setEditingPostulacion] = useState(null);
  const [estadoPostulacion, setEstadoPostulacion] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Función para cargar las postulaciones
  const fetchPostulaciones = async () => {
    setLoading(true); // Para mostrar el estado de carga
    try {
      const data = await apiGet('/postulacion');
      setPostulaciones(data);
      setSuccessMessage('Postulaciones cargadas con éxito'); // Mensaje de éxito al cargar
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchPostulaciones(); // Llama a la función al montar el componente
  }, []);

  const handleEdit = (item) => {
    setEditingPostulacion(item);
    setEstadoPostulacion(item.estadoPostulacion);
  };

  const handleSave = async (id) => {
    const updatedPostulacion = {
      ...editingPostulacion,
      estadoPostulacion,
    };

    try {
      await apiPut(`/postulacion`, updatedPostulacion);
      console.log('Postulación editada');
      await fetchPostulaciones(); // Refrescar postulaciones después de guardar
      setEditingPostulacion(null);
    } catch (error) {
      console.error('Error al editar la postulación:', error);
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await apiDelete(`/postulacion/${confirmDeleteId}`);
      console.log(`Postulación con ID: ${confirmDeleteId} eliminada`);
      setPostulaciones(postulaciones.filter((item) => item.id !== confirmDeleteId));
      setConfirmDeleteId(null);
    } catch (error) {
      console.error('Error al eliminar la postulación:', error);
      setError(error.message);
    }
  };

  const handleNotify = async (id) => {
    const postulacion = postulaciones.find(item => item.id === id);
    if (!postulacion || !postulacion.estudianteDto) return;

    const mensajeMap = {
      PENDIENTE: `La postulación de ${postulacion.estudianteDto.nombre} ${postulacion.estudianteDto.apellidoPaterno} ${postulacion.estudianteDto.apellidoMaterno} está pendiente.`,
      ACEPTADO: `¡Felicidades! La postulación de ${postulacion.estudianteDto.nombre} ${postulacion.estudianteDto.apellidoPaterno} ${postulacion.estudianteDto.apellidoMaterno} ha sido aceptada.`,
      RECHAZADO: `Lo sentimos, la postulación de ${postulacion.estudianteDto.nombre} ${postulacion.estudianteDto.apellidoPaterno} ${postulacion.estudianteDto.apellidoMaterno} ha sido rechazada.`,
    };

    const mensaje = mensajeMap[postulacion.estadoPostulacion] || 'Estado desconocido';

    const notificacion = {
      id: 0,
      mensaje: mensaje,
      fechaEnvio: new Date().toISOString(),
      estudianteId: postulacion.estudianteDto.id,
      estudianteDto: postulacion.estudianteDto,
    };

    try {
      await apiPost('/notificacion', notificacion);
      console.log('Notificación enviada:', notificacion);
      setSuccessMessage('Notificación enviada con éxito');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (error) {
      console.error('Error al enviar notificación:', error);
      setError(error.message);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center mt-16">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#375534]"></div>
      <span className="ml-4 text-[#6B9071]">Cargando...</span>
    </div>
  );
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4" style={{ color: '#0F2A1D' }}>Lista de Postulaciones</h1>
      {successMessage && (
        <div className="p-4 rounded-md mb-4" style={{ backgroundColor: '#6B9071', color: '#E3EED4' }}>
          {successMessage}
        </div>
      )}
      {postulaciones.length === 0 ? (
        <p style={{ color: '#375534' }}>No hay postulaciones disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {postulaciones.map((item) => (
            <div
              key={item.id}
              className="shadow-lg rounded-lg p-6 border cursor-pointer transition transform hover:scale-105"
              style={{
                backgroundColor: '#E3EED4',
                borderColor: '#AEC3B0',
              }}
            >
              <h2 className="text-xl font-semibold" style={{ color: '#0F2A1D' }}>
                {item.estudianteDto ? `${item.estudianteDto.nombre} ${item.estudianteDto.apellidoPaterno}` : 'Estudiante no disponible'}
              </h2>
              <p style={{ color: '#375534' }}><strong>Estado de Postulación:</strong> {item.estadoPostulacion}</p>
              <p style={{ color: '#375534' }}><strong>Fecha de Postulación:</strong> {item.fechaPostulacion || 'No disponible'}</p>
              <p style={{ color: '#375534' }}><strong>Título de la Oferta:</strong> {item.ofertaDto ? item.ofertaDto.titulo : 'Oferta no disponible'}</p>
              <p style={{ color: '#375534' }}><strong>Descripción:</strong> {item.ofertaDto ? item.ofertaDto.descripcion : 'Descripción no disponible'}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex items-center justify-center p-3 rounded-md hover:bg-[#6B9071] transition duration-300 shadow-md text-[#0F2A1D] bg-white"
                  title="Editar"
                >
                  <FaEdit className="mr-2" />
                  Editar
                </button>
                <button
                  onClick={() => setConfirmDeleteId(item.id)}
                  className="flex items-center justify-center p-3 rounded-md hover:bg-[#6B9071] transition duration-300 shadow-md text-white-600 bg-white"
                  title="Eliminar"
                >
                  <FaTrash className="mr-2" />
                  Eliminar
                </button>
                <button
                  onClick={() => handleNotify(item.id)}
                  className="flex items-center justify-center p-3 rounded-md hover:bg-[#6B9071] transition duration-300 shadow-md text-white-600 bg-white"
                  title="Notificación"
                >
                  <FaBell className="mr-2" />
                  Notificación
                </button>
              </div>
              {editingPostulacion && editingPostulacion.id === item.id && (
                <div className="mt-4">
                  <select
                    value={estadoPostulacion}
                    onChange={(e) => setEstadoPostulacion(e.target.value)}
                    className="border border-[#375534] p-2 rounded-md w-full"
                    style={{ borderColor: '#AEC3B0', color: '#375534' }}
                  >
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="ACEPTADO">ACEPTADO</option>
                    <option value="RECHAZADO">RECHAZADO</option>
                  </select>
                  <button
                    onClick={() => handleSave(item.id)}
                    className="bg-[#6B9071] hover:bg-[#375534] text-[#E3EED4] font-semibold py-2 px-4 rounded mr-4 mt-4"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingPostulacion(null)}
                    className="bg-[#0F2A1D] hover:bg-[#375534] text-[#E3EED4] font-semibold py-2 px-4 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Modal de confirmación */}
          {confirmDeleteId && (
            <div className="modal fixed inset-0 flex items-center justify-center bg-opacity-50 bg-[#375534]">
              <div className="p-6 bg-[#E3EED4] rounded-lg shadow-lg w-96"
                style={{ backgroundColor: '#E3EED4', borderColor: '#AEC3B0' }}>
                <h2 className="text-2xl font-bold mb-4 flex items-center text-[#0F2A1D]">
                  <FaExclamationTriangle className="text-yellow-600 mr-2" /> Confirmar Eliminación</h2>
                <p style={{ color: '#375534' }}>¿Estás seguro de que deseas eliminar esta postulación?</p>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => handleDelete()} // Llama a la función de eliminar
                    className="bg-[#375534] hover:bg-[#0F2A1D] text-[#E3EED4] font-semibold py-2 px-4 rounded"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(null)} // Cierra el modal
                    className="bg-[#375534] hover:bg-[#0F2A1D] text-[#E3EED4] font-semibold py-2 px-4 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostulacionCtrl;