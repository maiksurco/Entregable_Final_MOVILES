import React, { useState, useEffect } from 'react';
import { apiGet, apiPost } from '../../services/api'; // API general
import { FaCheck } from 'react-icons/fa';

const SeguimientoCtrl = () => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const [evidenciasEnviadas, setEvidenciasEnviadas] = useState({}); // Estado para marcar evidencia enviada
  const [postulaciones, setPostulaciones] = useState([]);
  const [selectedPostulacion, setSelectedPostulacion] = useState(null);
  const [seguimientos, setSeguimientos] = useState([]);
  const [newSeguimiento, setNewSeguimiento] = useState({
    evaluacion: '',
    observacion: '',
    fechaInicio: '',
    fechaFin: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar postulaciones y seguimientos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postulacionesData = await apiGet('/postulacion');
        const acceptedPostulaciones = postulacionesData.filter(
          (p) => p.estadoPostulacion === 'ACEPTADO'
        );
        setPostulaciones(acceptedPostulaciones);

        const seguimientoData = await apiGet('/seguimiento');

        // Inicializar estado de evidenciasEnviadas desde localStorage
        const savedEvidenciasEnviadas = JSON.parse(localStorage.getItem('evidenciasEnviadas')) || {};
        const initialEvidenciasEnviadas = {};

        // Set evidencias enviadas desde el backend si no están en localStorage
        seguimientoData.forEach((seguimiento) => {
          initialEvidenciasEnviadas[seguimiento.id] = savedEvidenciasEnviadas[seguimiento.id] || seguimiento.tieneEvidencia || false;
        });

        setEvidenciasEnviadas(initialEvidenciasEnviadas);
        setSeguimientos(seguimientoData);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    fetchData();
  }, []);

  const handlePostulacionSelect = (postulacion) => {
    setSelectedPostulacion(postulacion);
    setIsModalOpen(true); // Abrir el modal al seleccionar la postulación
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSeguimiento((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const empresaId = selectedPostulacion?.empresaDto?.id;
    const estudianteDto = selectedPostulacion?.estudianteDto; // Extrae el estudiante
    const ofertaDto = selectedPostulacion?.ofertaDto; // Extrae la oferta

    try {
      // Crear seguimiento con los datos requeridos
      await apiPost('/seguimiento', {
        ...newSeguimiento,
        estudianteId: selectedPostulacion.estudianteId,
        ofertaId: selectedPostulacion.ofertaId,
        empresaId: empresaId,
        estudianteDto: estudianteDto, // Incluye estudianteDto
        ofertaDto: ofertaDto, // Incluye ofertaDto
      });

      // Recargar seguimientos
      const seguimientoData = await apiGet('/seguimiento');

      // Actualizar los datos de seguimiento y evidenciasEnviadas
      const savedEvidenciasEnviadas = JSON.parse(localStorage.getItem('evidenciasEnviadas')) || {};
      const initialEvidenciasEnviadas = {};

      seguimientoData.forEach((seguimiento) => {
        initialEvidenciasEnviadas[seguimiento.id] = savedEvidenciasEnviadas[seguimiento.id] || seguimiento.tieneEvidencia || false;
      });
      setEvidenciasEnviadas(initialEvidenciasEnviadas);

      setSeguimientos(seguimientoData);

      // Resetear estado
      setNewSeguimiento({
        evaluacion: '',
        observacion: '',
        fechaInicio: '',
        fechaFin: '',
      });
      setIsModalOpen(false);
      setSelectedPostulacion(null);
    } catch (error) {
      console.error('Error al crear el seguimiento:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPostulacion(null); // Limpiar selección al cerrar el modal
  };

  // Función para descargar el PDF de todos los seguimientos
  const handleDownloadPdf = async () => {
    try {
      const response = await fetch('http://localhost:8080/seguimiento/pdf', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Informe_De_Seguimientos.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); // Limpiar URL
      } else {
        throw new Error('No se pudo generar el PDF');
      }
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
    }
  };

  // Función para seleccionar un archivo
  const handleFileSelect = (event, seguimientoId) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFiles((prevState) => ({
        ...prevState,
        [seguimientoId]: file, // Asociar el archivo al seguimiento correspondiente
      }));
    }
  };

  // Función para subir un archivo
  const handleUploadFile = async (seguimientoId) => {
    const file = selectedFiles[seguimientoId];
    if (!file) {
      alert('Por favor, seleccione un archivo antes de subir.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // Clave 'file' esperada por el backend

    try {
      const response = await fetch(
        `http://localhost:8080/seguimiento/${seguimientoId}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        alert('Archivo subido con éxito.');

        // Actualizar el estado local para reflejar que la evidencia fue enviada
        setEvidenciasEnviadas((prevState) => {
          const newState = { ...prevState, [seguimientoId]: true };

          // Guardar el estado actualizado en localStorage
          localStorage.setItem('evidenciasEnviadas', JSON.stringify(newState));

          return newState;
        });

        // Limpiar el archivo seleccionado
        setSelectedFiles((prevState) => {
          const updatedFiles = { ...prevState };
          delete updatedFiles[seguimientoId];
          return updatedFiles;
        });
      } else {
        alert('Error al subir el archivo.');
      }
    } catch (error) {
      console.error('Error al realizar la subida:', error);
      alert('Ocurrió un error al intentar subir el archivo.');
    }
  };

  return (
    <div className="flex h-screen p-4" style={{ backgroundColor: '#E3EED4' }}>
      <div className="w-1/4 h-full p-4 overflow-y-auto border-r border-gray-300" style={{ backgroundColor: '#AEC3BO' }}>
        <h2 className="text-2xl mb-4 text-[#0F2A1D]">Postulaciones Aceptadas</h2>
        {postulaciones.length === 0 ? (
          <p>No hay postulaciones aceptadas disponibles.</p>
        ) : (
          postulaciones.map((postulacion) => (
            <div
              key={postulacion.id}
              className={`bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-300 ${selectedPostulacion?.id === postulacion.id ? 'bg-[#375534]' : ''
                }`}
              onClick={() => handlePostulacionSelect(postulacion)}
            >
              <h4 className="text-lg font-semibold text-[#0F2A1D]">
                {postulacion.estudianteDto?.nombre}{' '}
                {postulacion.estudianteDto?.apellidoPaterno}{' '}
                {postulacion.estudianteDto?.apellidoMaterno}
              </h4>
              <p>
                <strong>Estado:</strong> {postulacion.estadoPostulacion}
              </p>
              <p>
                <strong>Fecha:</strong> {postulacion.fechaPostulacion}
              </p>
              <p>
                <strong>Oferta:</strong> {postulacion.ofertaDto.titulo}
              </p>
              <p>
                <strong>Duración:</strong> {postulacion.ofertaDto.duracion}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="w-3/4 h-full p-4">
        <h2 className="text-2xl mb-4 text-[#0F2A1D]">Seguimientos</h2>
        <button
          onClick={handleDownloadPdf}
          className="bg-[#375534] text-white py-2 px-4 rounded-md mb-4"
        >
          Descargar Informe
        </button>
        {seguimientos.length === 0 ? (
          <p>No hay seguimientos disponibles.</p>
        ) : (
          seguimientos.map((seguimiento) => (
            <div
              key={seguimiento.id}
              className="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-300"
            >
              <h4 className="text-lg font-semibold text-[#0F2A1D]">
                Seguimiento de: {seguimiento.estudianteDto.nombre} {seguimiento.estudianteDto.apellidoPaterno} {seguimiento.estudianteDto.apellidoMaterno}
              </h4>
              <p>
                <strong>Evaluación:</strong> {seguimiento.evaluacion}
              </p>
              <p>
                <strong>Observación:</strong> {seguimiento.observacion}
              </p>
              <p>
                <strong>Fecha Inicio:</strong> {seguimiento.fechaInicio}
              </p>
              <p>
                <strong>Fecha Fin:</strong> {seguimiento.fechaFin}
              </p>

              {/* Subida de archivo */}
              {evidenciasEnviadas[seguimiento.id] ? (
                <p className="text-[#375534] mt-2 flex items-center">
                  <FaCheck color="#375534" className="mr-2" />
                  Evidencia Guardada.
                </p>
              ) : (
                <div className="mt-4">
                  <label
                    htmlFor={`fileInput-${seguimiento.id}`}
                    className="block text-sm text-[#0F2A1D]"
                  >
                    Subir Evidencia
                  </label>
                  <input
                    type="file"
                    id={`fileInput-${seguimiento.id}`}
                    accept=".pdf"
                    onChange={(event) => handleFileSelect(event, seguimiento.id)}
                    className="border border-[#375534] rounded-md p-2 mb-2 mr-2"
                  />
                  <button
                    onClick={() => handleUploadFile(seguimiento.id)}
                    className="bg-[#375534] text-white py-2 px-4 rounded-md"
                  >
                    Subir archivo
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal para añadir un nuevo seguimiento */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-xl font-semibold text-[#0F2A1D]">Nuevo Seguimiento</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm text-[#0F2A1D]">Evaluación</label>
                <input
                  type="text"
                  name="evaluacion"
                  value={newSeguimiento.evaluacion}
                  onChange={handleInputChange}
                  className="border border-[#375534] rounded-md p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-[#0F2A1D]">Observación</label>
                <textarea
                  name="observacion"
                  value={newSeguimiento.observacion}
                  onChange={handleInputChange}
                  className="border border-[#375534] rounded-md p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-[#0F2A1D]">Fecha Inicio</label>
                <input
                  type="date"
                  name="fechaInicio"
                  value={newSeguimiento.fechaInicio}
                  onChange={handleInputChange}
                  className="border border-[#375534] rounded-md p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-[#0F2A1D]">Fecha Fin</label>
                <input
                  type="date"
                  name="fechaFin"
                  value={newSeguimiento.fechaFin}
                  onChange={handleInputChange}
                  className="border border-[#375534] rounded-md p-2 w-full"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-[#375534] text-white py-2 px-4 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#375534] text-white py-2 px-4 rounded-md"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeguimientoCtrl;