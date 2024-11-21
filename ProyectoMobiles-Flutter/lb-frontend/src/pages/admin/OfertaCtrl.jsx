import React, { useEffect, useState } from 'react';
import { apiGet, apiPut, apiDelete, apiPost } from '../../services/api';
import { FaEdit, FaTrash, FaPlus, FaExclamationTriangle } from 'react-icons/fa';

const OfertaCtrl = () => {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingOferta, setEditingOferta] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    ubicacion: '',
    tipoPracticante: '', // Cambiado a un select
    duracion: '',
    empresaId: 1,
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const tiposDePracticante = [
    { value: 'Basico', label: 'Basico' },
    { value: 'Intermedio', label: 'Intermedio' },
    { value: 'Avanzado', label: 'Avanzado' }
  ];

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const data = await apiGet('/oferta');
        setOfertas(data);
      } catch (error) {
        console.error('Error al cargar las ofertas:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOfertas();
  }, []);

  const handleEdit = (oferta) => {
    setEditingOferta(oferta);
    setFormData({
      titulo: oferta.titulo,
      descripcion: oferta.descripcion,
      ubicacion: oferta.ubicacion,
      tipoPracticante: oferta.tipoPracticante,
      duracion: oferta.duracion,
      empresaId: oferta.empresaId,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    const updatedOferta = {
      id: editingOferta.id,
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      ubicacion: formData.ubicacion,
      tipoPracticante: formData.tipoPracticante,
      duracion: formData.duracion,
      empresaId: editingOferta.empresaId,
    };

    try {
      const response = await apiPut(`/oferta`, updatedOferta);
      const newOferta = response;

      setOfertas(ofertas.map((item) => (item.id === newOferta.id ? newOferta : item)));
      setEditingOferta(null);
      setIsEditing(false);
      setSuccessMessage('Oferta actualizada con éxito');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (error) {
      console.error('Error al editar la oferta:', error);
      setError(error.message);
    }
  };

  const handleAdd = async () => {
    const newOferta = {
      ...formData,
      empresaDto: {
        id: formData.empresaId,
        nombre: "Universidad",
        sector: "Juliaca",
        descripcion: "Privada",
        direccion: "Jr. Matebuscando",
        telefono: "987653214",
      },
    };

    try {
      const response = await apiPost('/oferta', newOferta);
      const addedOferta = response;

      setOfertas([...ofertas, addedOferta]);
      setIsAdding(false);
      setFormData({
        titulo: '',
        descripcion: '',
        ubicacion: '',
        tipoPracticante: '', // Reseteo de tipoPracticante
        duracion: '',
        empresaId: 1,
      });
      setSuccessMessage('Oferta añadida con éxito');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (error) {
      console.error('Error al añadir la oferta:', error);
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await apiDelete(`/oferta/${confirmDeleteId}`);
      setOfertas(ofertas.filter((item) => item.id !== confirmDeleteId));
      setConfirmDeleteId(null);
    } catch (error) {
      console.error('Error al eliminar la oferta:', error);
      setError(error.message);
    }
  };

  const handleOpenAddModal = () => {
    setIsAdding(true);
    setFormData({
      titulo: '',
      descripcion: '',
      ubicacion: '',
      tipoPracticante: '',
      duracion: '',
      empresaId: 1,
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center mt-16">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#375534]"></div>
      <span className="ml-4 text-[#6B9071]">Cargando...</span>
    </div>
  );
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

  return (
    <div className=" p-6 bg-[#E3EED4] min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-[#0F2A1D]">Control de Ofertas</h1>
      {successMessage && (
        <div className="bg-green-500 text-white p-4 rounded-md mb-4">
          {successMessage}
        </div>
      )}

      <button
        onClick={handleOpenAddModal}
        className="mb-4 bg-[#375534] text-[#E3EED4] p-2 rounded hover:bg-[#6B9071] flex items-center transition duration-200"
      >
        <FaPlus className="mr-2" />
        Añadir Oferta
      </button>

      {ofertas.length === 0 ? (
        <p>No hay ofertas disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ofertas.map((oferta) => (
            <div
              key={oferta.id}
              className="bg-[#AEC3B0] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-semibold text-[#0F2A1D] mb-2">{oferta.titulo}</h2>
              <p className="text-[#375534]"><strong>Descripción:</strong> {oferta.descripcion}</p>
              <p className="text-[#375534]"><strong>Ubicación:</strong> {oferta.ubicacion}</p>
              <p className="text-[#375534]"><strong>Tipo de Práctica:</strong> {oferta.tipoPracticante}</p>
              <p className="text-[#375534]"><strong>Duración:</strong> {oferta.duracion}</p>
              <h3 className="text-xl font-semibold text-[#0F2A1D] mt-4">Detalles de la Empresa</h3>
              <p className="text-[#375534]"><strong>Nombre:</strong> {oferta.empresaDto ? oferta.empresaDto.nombre : 'No disponible'}</p>
              <p className="text-[#375534]"><strong>Sector:</strong> {oferta.empresaDto ? oferta.empresaDto.sector : 'No disponible'}</p>
              <p className="text-[#375534]"><strong>Descripción:</strong> {oferta.empresaDto ? oferta.empresaDto.descripcion : 'No disponible'}</p>
              <p className="text-[#375534]"><strong>Dirección:</strong> {oferta.empresaDto ? oferta.empresaDto.direccion : 'No disponible'}</p>
              <p className="text-[#375534]"><strong>Teléfono:</strong> {oferta.empresaDto ? oferta.empresaDto.telefono : 'No disponible'}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(oferta)}
                  className="flex items-center justify-center p-3 rounded-md hover:bg-[#6B9071] transition duration-300 shadow-md text-[#0F2A1D] bg-white"
                  title="Editar"
                >
                  <FaEdit className="mr-2" />
                  Editar
                </button>
                <button
                  onClick={() => setConfirmDeleteId(oferta.id)}
                  className="flex items-center justify-center p-3 rounded-md hover:bg-[#6B9071] transition duration-300 shadow-md text-white-600 bg-white"
                  title="Eliminar"
                >
                  <FaTrash className="mr-2" />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de creación de nueva oferta */}
      {isAdding && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-opacity-50 bg-[#375534]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-[#0F2A1D]">Añadir Nueva Oferta</h2>
            <label className="block mb-1 text-[#0F2A1D]">Título:</label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className="border border-[#375534] p-2 rounded-md w-full"
              placeholder="Título de la oferta"
            />
            <label className="block mb-1 text-[#0F2A1D]">Descripción:</label>
            <input
              type="text"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="border border-[#375534] p-2 rounded-md w-full"
              placeholder="Descripción de la oferta"
            />
            <label className="block mb-1 text-[#0F2A1D]">Ubicación:</label>
            <input
              type="text"
              value={formData.ubicacion}
              onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
              className="border border-[#375534] p-2 rounded-md w-full"
              placeholder="Ubicación de la oferta"
            />
            <label className="block mb-1 text-[#0F2A1D]">Tipo de Practica:</label>
            <select
              value={formData.tipoPracticante}
              onChange={(e) => setFormData({ ...formData, tipoPracticante: e.target.value })}
              className="border border-[#375534] p-2 rounded-md w-full"
            >
              <option value="">Selecciona un tipo de practica</option>
              {tiposDePracticante.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
            <label className="block mb-1 text-[#0F2A1D]">Duración:</label>
            <input
              type="text"
              value={formData.duracion}
              onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
              className="border border-[#375534] p-2 rounded-md w-full"
              placeholder="Duración de la oferta"
            />

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsAdding(false)} // Cierra el modal
                className="bg-[#6B9071] hover:bg-[#375534] text-[#E3EED4] font-semibold py-2 px-4 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleAdd} // Agrega la oferta
                className="bg-[#6B9071] hover:bg-[#375534] text-[#E3EED4] font-semibold py-2 px-4 rounded"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición de oferta */}
      {isEditing && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-opacity-50 bg-[#375534]">
          <div className="p-6 bg-[#E3EED4] rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-[#0F2A1D]">Editar Oferta</h2>
            <label className="block mb-1 text-[#0F2A1D]">Título:</label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className="border border-[#375534] p-2 rounded-md w-full"
              placeholder="Título de la oferta"
            />
            <label className="block mb-1 text-[#0F2A1D]">Descripción:</label>
            <input
              type="text"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="border border-[#375534] p-2 rounded-md w-full"
              placeholder="Descripción de la oferta"
            />
            <label className="block mb-1 text-[#0F2A1D]">Ubicación:</label>
            <input
              type="text"
              value={formData.ubicacion}
              onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
              className="border border-[#375534] p-2 rounded-md w-full"
              placeholder="Ubicación de la oferta"
            />
            <label className="block mb-1 text-[#0F2A1D]">Tipo de Practicante:</label>
            <select
              value={formData.tipoPracticante}
              onChange={(e) => setFormData({ ...formData, tipoPracticante: e.target.value })}
              className="border border-[#375534] p-2 rounded-md w-full"
            >
              <option value="">Selecciona un tipo de practicante</option>
              {tiposDePracticante.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
            <label className="block mb-1 text-[#0F2A1D]">Duración:</label>
            <input
              type="text"
              value={formData.duracion}
              onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
              className="border border-[#375534] p-2 rounded-md w-full"
              placeholder="Duración de la oferta"
            />

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(false)} // Cierra el modal
                className="bg-[#6B9071] hover:bg-[#375534] text-[#E3EED4] font-semibold py-2 px-4 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave} // Guarda los cambios en la oferta
                className="bg-[#6B9071] hover:bg-[#375534] text-[#E3EED4] font-semibold py-2 px-4 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {confirmDeleteId && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-opacity-50 bg-[#375534]">
          <div className="p-6 bg-[#E3EED4] rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-[#0F2A1D]">
            <FaExclamationTriangle className="text-yellow-600 mr-2" /> Confirmar Eliminación
          </h2>
            <p>¿Estás seguro de que deseas eliminar esta oferta?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setConfirmDeleteId(null)} // Cierra el modal
                className="bg-[#6B9071] hover:bg-[#375534] text-[#E3EED4] font-semibold py-2 px-4 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete} // Elimina la oferta
                className="bg-[#375534] hover:bg-[#0F2A1D] text-[#E3EED4] font-semibold py-2 px-4 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfertaCtrl;