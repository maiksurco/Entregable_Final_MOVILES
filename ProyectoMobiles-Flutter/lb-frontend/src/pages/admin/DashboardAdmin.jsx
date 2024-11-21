import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { Outlet, useLocation } from 'react-router-dom';
import { apiGet } from '../../services/api';

const DashboardAdmin = () => {
  const location = useLocation();
  const isDashboardRoot = location.pathname === '/admin';

  const [userCount, setUserCount] = useState(0); // Estado para la cantidad de usuarios
  const [studentCount, setStudentCount] = useState(0); // Estado para la cantidad de estudiantes
  const [lastUpdated, setLastUpdated] = useState(''); // Estado para la última actualización
  const [ofertaCount, setOfertaCount] = useState(0);
  const [empresaCount, setEmpresaCount] = useState(0);
  const [postulacionCount, setPostulacionCount] = useState(0);
  const [seguimientoCount, setSeguimientoCount] = useState(0);

  // Función para obtener la cantidad de usuarios
  const getUsers = async () => {
    try {
      const users = await apiGet('/auth/users'); // Llama a la API para obtener los usuarios
      setUserCount(users.length); // Suponiendo que 'users' es un array de usuarios
      setLastUpdated(new Date().toLocaleString()); // Actualiza la fecha y hora actual
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Función para obtener la cantidad de estudiantes
  const getStudents = async () => {
    try {
      const students = await apiGet('/estudiante'); // Llama a la API para obtener los estudiantes
      setStudentCount(students.length); // Suponiendo que 'students' es un array de estudiantes
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Función para obtener la cantidad de ofertas
  const getOfertas = async () => {
    try {
      const ofertas = await apiGet('/oferta'); // Llama a la API para obtener los estudiantes
      setOfertaCount(ofertas.length); // Suponiendo que 'students' es un array de estudiantes
    } catch (error) {
      console.error('Error fetching ofertas:', error);
    }
  };

  // Función para obtener la cantidad de empresas
  const getEmpresas = async () => {
    try {
      const empresas = await apiGet('/empresa'); // Llama a la API para obtener los estudiantes
      setEmpresaCount(empresas.length); // Suponiendo que 'students' es un array de estudiantes
    } catch (error) {
      console.error('Error fetching empresas:', error);
    }
  };
  // Función para obtener la cantidad de postulacion
  const getPostulaciones = async () => {
    try {
      const postulaciones = await apiGet('/postulacion'); // Llama a la API para obtener los estudiantes
      setPostulacionCount(postulaciones.length); // Suponiendo que 'students' es un array de estudiantes
    } catch (error) {
      console.error('Error fetching postulacion:', error);
    }
  };
  // Función para obtener la cantidad de seguimiento
  const getSeguimientos = async () => {
    try {
      const seguimientos = await apiGet('/seguimiento'); // Llama a la API para obtener los estudiantes
      setSeguimientoCount(seguimientos.length); // Suponiendo que 'students' es un array de estudiantes
    } catch (error) {
      console.error('Error fetching seguimiento:', error);
    }
  };

  useEffect(() => {
    getUsers(); // Llama a la función para obtener usuarios al montar el componente
    getStudents();
    getOfertas();
    getEmpresas(); 
    getPostulaciones();
    getSeguimientos();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  // Función para actualizar la cuenta de usuarios
  const refreshUserCount = () => {
    getUsers(); // Llama a la función para obtener usuarios
  };

  // Función para actualizar la cuenta de estudiantes
  const refreshStudentCount = () => {
    getStudents(); // Llama a la función para obtener estudiantes
  };

  const refreshOfertaCount = () => {
    getOfertas();
  }
  const refreshEmpresaCount = () => {
    getEmpresas();
  }
  const refreshPostulacionCount = () => {
    getPostulaciones();
  }
  const refreshSeguimientoCount = () => {
    getSeguimientos();
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-[#E3EED4] to-[#AEC3B0]">
      <AdminNavbar />
      <div className="flex-1 p-4 bg-[#E3EED4] shadow-md rounded-lg overflow-auto">
        {isDashboardRoot && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tarjeta de Usuarios */}
            <div className="bg-[#375534] text-[#E3EED4] p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Usuarios</h3>
              <p className="text-4xl font-bold">{userCount}</p>
              <p className="text-sm mt-2">Última actualización: {lastUpdated}</p>
            </div>

            {/* Tarjeta de Estudiantes */}
            <div className="bg-[#6B9071] text-[#E3EED4] p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Estudiantes</h3>
              <p className="text-4xl font-bold">{studentCount}</p>
              <p className="text-sm mt-2">Última actualización: {lastUpdated}</p>
            </div>

            {/* Tarjeta de Empresas */}
            <div className="bg-[#0F2A1D] text-[#E3EED4] p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Empresas</h3>
              <p className="text-4xl font-bold">{empresaCount}</p>
              <p className="text-sm mt-2">Última actualización: {lastUpdated}</p>
            </div>

            {/* Tarjeta de Postulaciones */}
            <div className="bg-[#375534] text-[#E3EED4] p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Postulaciones</h3>
              <p className="text-4xl font-bold">{postulacionCount}</p>
              <p className="text-sm mt-2">Última actualización: {lastUpdated}</p>
            </div>
            {/* Tarjeta de Ofertas */}
            <div className="bg-[#6B9071] text-[#E3EED4] p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Ofertas</h3>
              <p className="text-4xl font-bold">{ofertaCount}</p>
              <p className="text-sm mt-2">Última actualización: {lastUpdated}</p>
            </div>

            {/* Tarjeta de Seguimientos */}
            <div className="bg-[#0F2A1D] text-[#E3EED4] p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Seguimiento</h3>
              <p className="text-4xl font-bold">{seguimientoCount}</p>
              <p className="text-sm mt-2">Última actualización: {lastUpdated}</p>
            </div>
          </div>
        )}

        {/* Aquí puedes añadir más contenido */}
        <Outlet context={{ refreshUserCount, refreshStudentCount, refreshOfertaCount, refreshEmpresaCount, refreshPostulacionCount, refreshSeguimientoCount }} /> {/* Pasamos las funciones al Outlet */}
      </div>
    </div>
  );
};

export default DashboardAdmin;