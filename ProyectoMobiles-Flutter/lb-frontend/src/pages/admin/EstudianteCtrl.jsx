import React, { useEffect, useState } from 'react';
import { apiGet, apiDelete, apiPut } from '../../services/api';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import { FaTrashAlt, FaEdit, FaExclamationTriangle } from 'react-icons/fa';

Modal.setAppElement('#root'); // Configuración para accesibilidad del modal

const EstudianteCtrl = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [studentsPerPage] = useState(10);
  const [totalStudents, setTotalStudents] = useState(0);
  const [error, setError] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentData, setStudentData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    dni: '',
    carrera: '',
    universidad: '',
    habilidades: '',
    horasCompletadas: '',
  });
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Nuevo estado para el modal de edición
  const [searchTerm, setSearchTerm] = useState('');

  // Obtener la lista de estudiantes
  const fetchStudents = async () => {
    try {
      const data = await apiGet('/estudiante');
      setStudents(data);
      setFilteredStudents(data);
      setTotalStudents(data.length);
    } catch (error) {
      setError('Error al obtener los estudiantes');
      console.error(error);
    }
  };

  //busqueda
  useEffect(() => {
    // Filter users based on the search term
    if (searchTerm) {
      setFilteredStudents(students.filter(student =>
        student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.carrera.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.habilidades.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredStudents(students);
    }
  }, [searchTerm, students]);

  // Eliminar un estudiante
  const handleDelete = async (id) => {
    try {
      await apiDelete(`/estudiante/${id}`);
      fetchStudents();
      setShowDeleteModal(false);
    } catch (error) {
      setError('Error al eliminar el estudiante');
      console.error(error);
    }
  };

  // Abrir el modal de eliminación
  const openDeleteModal = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  // Abrir el modal de edición
  const openEditModal = (student) => {
    setEditingStudent(student.id);
    setStudentData({
      nombre: student.nombre,
      apellidoPaterno: student.apellidoPaterno,
      apellidoMaterno: student.apellidoMaterno,
      dni: student.dni,
      carrera: student.carrera,
      universidad: student.universidad,
      habilidades: student.habilidades,
      horasCompletadas: student.horasCompletadas,
    });
    setShowEditModal(true);
  };

  // Guardar los cambios del estudiante editado
  const handleSaveEdit = async () => {
    try {
      const dataToUpdate = {
        id: editingStudent, // Asegúrate de que esto tenga el ID correcto
        ...studentData
      };

      await apiPut(`/estudiante`, dataToUpdate); // Asegúrate de que este endpoint sea correcto
      fetchStudents();
      setEditingStudent(null);
      setStudentData({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        dni: '',
        carrera: '',
        universidad: '',
        habilidades: '',
        horasCompletadas: '0',
      });
    } catch (error) {
      setError(`Error al editar el estudiante: ${error.message}`);
      console.error('Error al editar:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Manejar la paginación
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Estudiantes para mostrar
  const displayedStudents = filteredStudents.slice(currentPage * studentsPerPage, (currentPage + 1) * studentsPerPage);

  return (
    <div className="p-6 bg-[#E3EED4] min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-[#0F2A1D]">Control de Estudiantes</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="mb-4"> <strong>Busqueda: </strong> 
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre de estudiante, carrera o habilidad"
          className="p-2 w-full border border-[#375534] rounded-md focus:outline-none focus:ring focus:ring-[#6B9071] transition duration-200"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {displayedStudents.map((student) => (
          <div key={student.id} className="bg-[#AEC3B0] p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2 text-[#0F2A1D]">{student.nombre} {student.apellidoPaterno}</h3>
            <p className="text-[#375534]"><strong>DNI:</strong> {student.dni}</p>
            <p className="text-[#375534]"><strong>Carrera:</strong> {student.carrera}</p>
            <p className="text-[#375534]"><strong>Universidad:</strong> {student.universidad}</p>
            <p className="text-[#375534]"><strong>Habilidades:</strong> {student.habilidades}</p>
            <p className="text-[#375534]"><strong>Horas Completadas:</strong> {student.horasCompletadas}</p>
            <div className="mt-4 flex justify-between">
              <button onClick={() => openEditModal(student)}
                title="Editar"
                className="flex items-center justify-center p-3 rounded-md hover:bg-[#6B9071] transition duration-300 shadow-md text-[#0F2A1D] bg-white">
                <FaEdit className="mr-2" />
                Editar
              </button>
              <button onClick={() => openDeleteModal(student)}
                title="Eliminar"
                className="flex items-center justify-center p-3 rounded-md hover:bg-[#6B9071] transition duration-300 shadow-md text-white-600 bg-white">
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
        pageCount={Math.ceil(filteredStudents.length / studentsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'flex justify-center space-x-2 mt-4'}
        pageLinkClassName={'px-4 py-2 border border-[#375534] rounded-md hover:bg-[#6B9071] hover:text-[#E3EED4]'}
        previousLinkClassName={'px-4 py-2 border border-[#375534] rounded-md hover:bg-[#6B9071] hover:text-[#E3EED4]'}
        nextLinkClassName={'px-4 py-2 border border-[#375534] rounded-md hover:bg-[#6B9071] hover:text-[#E3EED4]'}
        activeLinkClassName={'bg-[#6B9071] text-[#E3EED4]'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
      />

      {/* Modal de Eliminación */}
      <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        className="modal fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="p-6 bg-white rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-[#0F2A1D]">
            <FaExclamationTriangle className="text-yellow-600 mr-2" /> Confirmar Eliminación
          </h2>
          <p>¿Estás seguro de que deseas eliminar al estudiante <strong>{studentToDelete?.nombre} {studentToDelete?.apellidoPaterno}</strong>?</p>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-[#AEC3B0] hover:bg-[#6B9071] text-[#0F2A1D] font-semibold py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleDelete(studentToDelete.id)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de Edición */}
      <Modal
        isOpen={editingStudent !== null} // Abre el modal solo si hay un estudiante en edición
        onRequestClose={() => setEditingStudent(null)}
        className="modal fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="p-6 bg-[#E3EED4] rounded-lg shadow-lg w-11/12 max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-[#0F2A1D]">Editar Estudiante</h2>

          {/* Formulario de edición */}
          <form onSubmit={e => { e.preventDefault(); handleSaveEdit(); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block mb-1 text-[#0F2A1D]" htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={studentData.nombre}
                onChange={e => setStudentData({ ...studentData, nombre: e.target.value })}
                className="border border-[#375534] p-2 rounded-md w-full bg-white text-[#0F2A1D] focus:ring-[#6B9071] focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-[#0F2A1D]" htmlFor="apellidoPaterno">Apellido Paterno</label>
              <input
                type="text"
                id="apellidoPaterno"
                value={studentData.apellidoPaterno}
                onChange={e => setStudentData({ ...studentData, apellidoPaterno: e.target.value })}
                className="border border-[#375534] p-2 rounded-md w-full bg-white text-[#0F2A1D] focus:ring-[#6B9071] focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-[#0F2A1D]" htmlFor="apellidoMaterno">Apellido Materno</label>
              <input
                type="text"
                id="apellidoMaterno"
                value={studentData.apellidoMaterno}
                onChange={e => setStudentData({ ...studentData, apellidoMaterno: e.target.value })}
                className="border border-[#375534] p-2 rounded-md w-full bg-white text-[#0F2A1D] focus:ring-[#6B9071] focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-[#0F2A1D]" htmlFor="apellidoMaterno">DNI</label>
              <input
                type="text"
                id="dni"
                value={studentData.dni}
                onChange={e => setStudentData({ ...studentData, dni: e.target.value })}
                className="border border-[#375534] p-2 rounded-md w-full bg-white text-[#0F2A1D] focus:ring-[#6B9071] focus:outline-nonel"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-[#0F2A1D]" htmlFor="carrera">Carrera</label>
              <input
                type="text"
                id="carrera"
                value={studentData.carrera}
                onChange={e => setStudentData({ ...studentData, carrera: e.target.value })}
                className="border border-[#375534] p-2 rounded-md w-full bg-white text-[#0F2A1D] focus:ring-[#6B9071] focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-[#0F2A1D]" htmlFor="universidad">Universidad</label>
              <input
                type="text"
                id="universidad"
                value={studentData.universidad}
                onChange={e => setStudentData({ ...studentData, universidad: e.target.value })}
                className="border border-[#375534] p-2 rounded-md w-full bg-white text-[#0F2A1D] focus:ring-[#6B9071] focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-[#0F2A1D]" htmlFor="habilidades">Habilidades</label>
              <input
                type="text"
                id="habilidades"
                value={studentData.habilidades}
                onChange={e => setStudentData({ ...studentData, habilidades: e.target.value })}
                className="border border-[#375534] p-2 rounded-md w-full bg-white text-[#0F2A1D] focus:ring-[#6B9071] focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-[#0F2A1D]" htmlFor="horasCompletadas">Horas Completadas</label>
              <input
                type="text"
                id="horasCompletadas"
                value={studentData.horasCompletadas}
                onChange={e => setStudentData({ ...studentData, horasCompletadas: e.target.value })}
                className="border border-[#375534] p-2 rounded-md w-full bg-white text-[#0F2A1D] focus:ring-[#6B9071] focus:outline-none"
                required
              />
            </div>

            <div className="mt-6 flex justify-end col-span-1 md:col-span-2 space-x-4">
              <button
                onClick={() => setEditingStudent(null)}
                className="bg-[#AEC3B0] hover:bg-[#6B9071] text-[#0F2A1D] font-semibold py-2 px-4 rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[#375534] hover:bg-[#6B9071] text-white font-semibold py-2 px-4 rounded"
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

export default EstudianteCtrl;