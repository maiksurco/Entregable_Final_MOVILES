import React, { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../../services/api';

const OfertaUser = () => {
  const [ofertas, setOfertas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedOferta, setSelectedOferta] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [estudiante, setEstudiante] = useState(null);
  const [dni, setDni] = useState('');

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const response = await apiGet('/oferta');
        setOfertas(response);
      } catch (err) {
        setError('Error al cargar las ofertas. Intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    const fetchEstudiantes = async () => {
      try {
        const response = await apiGet('/estudiante');
        setEstudiantes(response);
      } catch (err) {
        setError('Error al cargar la lista de estudiantes. Intenta de nuevo más tarde.');
      }
    };

    fetchOfertas();
    fetchEstudiantes();
  }, []);

  const handleSelect = (oferta) => {
    setSelectedOferta(oferta);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOferta(null);
    setEstudiante(null);
    setDni('');
    setError(null);
    setSuccess(null);
  };

  const handleDniSearch = () => {
    if (dni.trim() === '') {
      setError('Por favor, ingresa un DNI válido.');
      return;
    }

    const foundEstudiante = estudiantes.find(est => est.dni.toString() === dni);

    if (foundEstudiante) {
      setEstudiante(foundEstudiante);
      setError(null);
    } else {
      setError('No se encontró ningún estudiante con ese DNI.');
      setEstudiante(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    if (!estudiante) {
      setError('Por favor, busca y selecciona un estudiante válido.');
      return;
    }

    const postulacionData = {
      id: 0,
      estadoPostulacion: 'PENDIENTE',
      fechaPostulacion: new Date().toISOString().split('T')[0],
      estudianteId: estudiante.id,
      estudianteDto: estudiante,
      ofertaId: selectedOferta.id,
      ofertaDto: selectedOferta,
    };

    try {
      console.log('Submitting postulacion data:', postulacionData);
      await apiPost('/postulacion', postulacionData);
      console.log('Postulacion sent successfully');
      
      // Configura el estado de éxito y limpia el error
      setSuccess('Postulación enviada exitosamente');
      setError(null);
      
      // Cierra el modal y las alertas después de un retraso para que el usuario vea el mensaje
      setTimeout(() => {
        closeModal(); // Cierra el modal y las alertas después de 2 segundos
      }, 2000); 

    } catch (error) {
      console.error('Error sending postulacion:', error);
      
      // Configura el estado de error y limpia el éxito
      setError('Hubo un error al enviar la postulación. Inténtalo nuevamente.');
      setSuccess(null);

      // Cierra el modal y las alertas después de un retraso para que el usuario vea el mensaje
      setTimeout(() => {
        closeModal(); // Cierra el modal y las alertas después de 2 segundos
      }, 2000);
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
    <div className="flex justify-center items-center min-h-screen bg-[#E3EED4] p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ofertas.map(oferta => (
          <div
            key={oferta.id}
            className="bg-[#AEC3BO] shadow-lg rounded-lg p-6 border border-[#6B9071] cursor-pointer hover:shadow-xl transition transform hover:scale-105"
            onClick={() => handleSelect(oferta)}
          >
            <h2 className="text-2xl font-semibold mb-4 text-[#375534]">{oferta.titulo}</h2>
            <div className="mb-4 text-[#375534]">
              <p className="text-sm mb-1"><strong>Descripción:</strong> {oferta.descripcion}</p>
              <p className="text-sm mb-1"><strong>Ubicación:</strong> {oferta.ubicacion}</p>
              <p className="text-sm mb-1"><strong>Tipo de Practicante:</strong> {oferta.tipoPracticante}</p>
              <p className="text-sm mb-1"><strong>Duración:</strong> {oferta.duracion}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para postulación */}
      {showModal && selectedOferta && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-[#0F2A1D] opacity-50 absolute inset-0" onClick={closeModal}></div>
          <div className="bg-[#E3EED4] p-6 rounded-lg shadow-lg z-10 w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 text-[#0F2A1D]">Postulación para {selectedOferta.titulo}</h2>
            
            {/* Mostrar alertas en el encabezado del modal */}
            {(success || error) && (
              <div className="mb-4">
                {success && (
                  <div className="bg-[#6B9071] border-l-4 border-[#375534] text-[#0F2A1D] p-4 rounded-md">
                    <p className="font-bold">Éxito</p>
                    <p>{success}</p>
                  </div>
                )}

                {error && (
                  <div className="bg-[#6B9071] border-l-4 border-[#375534] text-[#0F2A1D] p-4 rounded-md">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-[#375534] text-sm font-bold mb-2">Confirma la postulacion completando tu DNI</label>
                <div className="flex">
                  <input
                    type="text"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="Ingrese DNI"
                    className="w-full p-2 border border-[#6B9071] rounded focus:outline-none focus:ring focus:ring-[#AEC3BO] transition duration-200"
                  />
                  <button
                    type="button"
                    className="ml-2 bg-[#6B9071] text-white py-2 px-4 rounded hover:bg-[#375534] transition duration-200"
                    onClick={handleDniSearch}
                  >
                    Buscar
                  </button>
                </div>
              </div>

              {estudiante && (
                <div className="mb-4 bg-[#E3EED4] p-4 rounded-lg border border-[#6B9071]">
                  <h3 className="text-lg font-semibold mb-2 text-[#0F2A1D]">Datos del Estudiante</h3>
                  <p className="text-sm"><strong>Nombre:</strong> {estudiante.nombre}</p>
                  <p className="text-sm"><strong>Apellido Paterno:</strong> {estudiante.apellidoPaterno}</p>
                  <p className="text-sm"><strong>Apellido Materno:</strong> {estudiante.apellidoMaterno}</p>
                  <p className="text-sm"><strong>Carrera:</strong> {estudiante.carrera}</p>
                  <p className="text-sm"><strong>Universidad:</strong> {estudiante.universidad}</p>
                </div>
              )}
              
              {/* Sección de la postulación */}
              {estudiante && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-[#0F2A1D]">Especificaciones de la Postulación</h3>
                  <p className="text-sm mb-1"><strong>Estado de Postulación:</strong> PENDIENTE</p>
                  <p className="text-sm mb-1"><strong>Fecha de Postulación:</strong> {new Date().toISOString().split('T')[0]}</p>
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  className="bg-[#6B9071] text-white py-2 px-4 rounded hover:bg-[#375534] transition duration-200"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#375534] text-white py-2 px-4 rounded hover:bg-[#0F2A1D] transition duration-200"
                  disabled={!estudiante}
                >
                  Enviar Postulación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfertaUser;