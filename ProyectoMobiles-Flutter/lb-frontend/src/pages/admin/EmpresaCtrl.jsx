import React, { useEffect, useState } from 'react';
import { apiGet, apiDelete, apiPut } from '../../services/api';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import { FaTrashAlt, FaEdit, FaExclamationTriangle } from 'react-icons/fa';

Modal.setAppElement('#root'); // Configuración para accesibilidad del modal

const EmpresaCtrl = () => {
  const [empresas, setEmpresas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [empresasPorPagina] = useState(10);
  const [totalEmpresas, setTotalEmpresas] = useState(0);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);
  const [editingEmpresa, setEditingEmpresa] = useState(null);
  const [empresaData, setEmpresaData] = useState({
    nombre: '',
    sector: '',
    descripcion: '',
    direccion: '',
    telefono: '',
  });
  const [empresaToDelete, setEmpresaToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchEmpresas = async () => {
    try {
      const data = await apiGet('/empresa');
      setEmpresas(data);
      setFilteredEmpresas(data);
      setTotalEmpresas(data.length);
    } catch (error) {
      setError('Error al obtener las empresas');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiDelete(`/empresa/${id}`);
      fetchEmpresas();
      setShowDeleteModal(false);
    } catch (error) {
      setError('Error al eliminar la empresa');
      console.error(error);
    }
  };

  const openDeleteModal = (empresa) => {
    setEmpresaToDelete(empresa);
    setShowDeleteModal(true);
  };

  const handleEdit = (empresa) => {
    setEditingEmpresa(empresa.id);
    setEmpresaData({
      nombre: empresa.nombre,
      sector: empresa.sector,
      descripcion: empresa.descripcion,
      direccion: empresa.direccion,
      telefono: empresa.telefono,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const dataToUpdate = { id: editingEmpresa, ...empresaData };
      await apiPut(`/empresa`, dataToUpdate);
      fetchEmpresas();
      setEditingEmpresa(null);
      setEmpresaData({
        nombre: '',
        sector: '',
        descripcion: '',
        direccion: '',
        telefono: '',
      });
    } catch (error) {
      setError(`Error al editar la empresa: ${error.message}`);
      console.error('Error al editar:', error);
    }
  };

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = empresas.filter(empresa =>
      empresa.nombre.toLowerCase().includes(value.toLowerCase()) ||
      empresa.sector.toLowerCase().includes(value.toLowerCase()) ||
      empresa.descripcion.toLowerCase().includes(value.toLowerCase()) ||
      empresa.direccion.toLowerCase().includes(value.toLowerCase()) ||
      empresa.telefono.includes(value)
    );
    setFilteredEmpresas(filtered);
    setCurrentPage(0);
  };

  const displayedEmpresas = filteredEmpresas.slice(currentPage * empresasPorPagina, (currentPage + 1) * empresasPorPagina);

  return (
    <div className="p-6 bg-[#E3EED4] min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-[#0F2A1D]">Control de Empresas</h2>
      {error && <div className="text-[#6B9071] mb-4">{error}</div>}

      <div className="mb-4"><strong>Busqueda: </strong>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-[#375534] p-2 rounded-md w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedEmpresas.map((empresa) => (
          <div key={empresa.id} className="p-4 bg-[#AEC3B0] rounded-lg shadow-md cursor-pointer hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-xl font-semibold text-[#0F2A1D] mb-2">{empresa.nombre}</h3>
            <p className="text-[#375534]"><strong>Sector:</strong> {empresa.sector}</p>
            <p className="text-[#375534]"><strong>Descripción:</strong> {empresa.descripcion}</p>
            <p className="text-[#375534]"><strong>Dirección:</strong> {empresa.direccion}</p>
            <p className="text-[#375534]"><strong>Teléfono:</strong> {empresa.telefono}</p>
            <div className="mt-4 flex justify-between">
              <button onClick={() => handleEdit(empresa)} title="Editar" className="flex items-center justify-center p-3 rounded-md hover:bg-[#6B9071] transition duration-300 shadow-md text-[#0F2A1D] bg-white">
                <FaEdit className="mr-2" />
                Editar
              </button>
              <button onClick={() => openDeleteModal(empresa)} title="Eliminar" className="flex items-center justify-center p-3 rounded-md hover:bg-[#6B9071] transition duration-300 shadow-md text-white-600 bg-white">
                <FaTrashAlt className="mr-2" />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={"← Anterior"}
        nextLabel={"Siguiente →"}
        breakLabel={'...'}
        pageCount={Math.ceil(filteredEmpresas.length / empresasPorPagina)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'flex justify-center space-x-2 mt-4'}
        pageLinkClassName={'px-4 py-2 border border-[#375534] rounded-md hover:bg-[#AEC3B0]'}
        previousLinkClassName={'px-4 py-2 border border-[#375534] rounded-md hover:bg-[#AEC3B0]'}
        nextLinkClassName={'px-4 py-2 border border-[#375534] rounded-md hover:bg-[#AEC3B0]'}
        activeLinkClassName={'bg-[#0F2A1D] text-[#E3EED4]'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
      />

      <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        className="modal fixed inset-0 flex items-center justify-center bg-opacity-50 bg-[#375534]"
        overlayClassName="fixed inset-0 bg-[#375534] bg-opacity-50"
      >
        <div className="p-6 bg-[#E3EED4] rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-[#0F2A1D]">
            <FaExclamationTriangle className="text-yellow-600 mr-2" /> Confirmar Eliminación
          </h2>
          <p>¿Estás seguro de que deseas eliminar la empresa <strong>{empresaToDelete?.nombre}</strong>?</p>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-[#6B9071] hover:bg-[#375534] text-[#E3EED4] font-semibold py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleDelete(empresaToDelete.id)}
              className="bg-[#375534] hover:bg-[#0F2A1D] text-[#E3EED4] font-semibold py-2 px-4 rounded"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={editingEmpresa !== null}
        onRequestClose={() => setEditingEmpresa(null)}
        className="modal fixed inset-0 flex items-center justify-center bg-opacity-50 bg-[#375534]"
        overlayClassName="fixed inset-0 bg-[#375534] bg-opacity-50"
      >
        <div className="p-6 bg-[#E3EED4] rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-[#0F2A1D]">Editar Empresa</h2>
          <form onSubmit={e => { e.preventDefault(); handleSaveEdit(); }}>
            <div className="mb-4">
              <label className="block mb-1 text-[#0F2A1D]" htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={empresaData.nombre}
                onChange={e => setEmpresaData({ ...empresaData, nombre: e.target.value })}
                className="border border-[#375534] p-2 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-[#0F2A1D]">Sector</label>
              <input
                type="text"
                id="sector"
                value={empresaData.sector}
                onChange={e => setEmpresaData({ ...empresaData, sector: e.target.value })}
                className="border border-[#375534] p-2 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-[#0F2A1D]" htmlFor="descripcion">Descripción</label>
              <input
                type="text"
                id="descripcion"
                value={empresaData.descripcion}
                onChange={e => setEmpresaData({ ...empresaData, descripcion: e.target.value })}
                className="border border-[#375534] p-2 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-[#0F2A1D]" htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                value={empresaData.direccion}
                onChange={e => setEmpresaData({ ...empresaData, direccion: e.target.value })}
                className="border border-[#375534] p-2 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-[#0F2A1D]" htmlFor="telefono">Teléfono</label>
              <input
                type="text"
                id="telefono"
                value={empresaData.telefono}
                onChange={e => setEmpresaData({ ...empresaData, telefono: e.target.value })}
                className="border border-[#375534] p-2 rounded-md w-full"
                required
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setEditingEmpresa(null)}
                className="bg-[#6B9071] hover:bg-[#375534] text-[#E3EED4] font-semibold py-2 px-4 rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[#0F2A1D] hover:bg-[#375534] text-[#E3EED4] font-semibold py-2 px-4 rounded"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EmpresaCtrl;