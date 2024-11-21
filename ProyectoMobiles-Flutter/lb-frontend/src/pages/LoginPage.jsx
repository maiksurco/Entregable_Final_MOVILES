import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../services/api'; // Importamos la función apiPost para las solicitudes
import CreateModal from '../components/CreateModal'; // Importamos el modal de crear cuenta

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false); // Para controlar la visibilidad del fondo
  const [isModalOpen, setIsModalOpen] = useState(false); // Para controlar la visibilidad del modal de creación de cuenta
  const navigate = useNavigate();

  // Efecto para manejar la visibilidad del fondo
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200); // Mostrar con animación
    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = {
        userName: username,
        password: password,
      };
  
      const response = await apiPost('/auth/login', data);
  
      // Asegúrate de que la API devuelva el authUserId
      console.log('Respuesta de la API (Login):', response);
  
      const { role, token, authUserId } = response; // Asegúrate de extraer authUserId
  
      // Almacenar el token y el authUserId en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', authUserId);  // Aquí se guarda authUserId correctamente
  
      console.log('authUserId guardado en localStorage:', authUserId);
  
      if (role === 'USER_ADMIN') {
        navigate('/admin');
      } else if (role === 'USER_DEFAULT') {
        navigate('/user');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || 'Usuario o contraseña incorrectos'}`);
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirigir a la ruta principal
  };

  // Función para manejar la apertura del modal de creación de cuentas
  const handleCreateAccount = () => {
    setIsModalOpen(true); // Abrir el modal
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  // Función para redirigir después de crear el usuario
  const handleUserCreated = () => {
    navigate('/'); // Redirigir a la ruta de inicio (o donde desees)
  };

  return (
    <div className={`fixed inset-0 bg-gradient-to-r from-[#375534] to-[#6B9071] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Fondo borroso */}
      <div className={`absolute inset-0 bg-[#0F2A1D] transition-opacity duration-300 ${isVisible ? 'opacity-50' : 'opacity-0'}`} />

      <div className={`flex items-center justify-center min-h-screen relative transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-8'}`}>
        <div className={`bg-[#E3EED4] rounded-lg shadow-xl p-4 w-full max-w-sm`}>
          <h2 className="text-2xl font-semibold text-[#375534] text-center mb-8">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#375534] text-sm font-bold mb-2" htmlFor="username">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="shadow appearance-none border border-[#AEC3BO] rounded w-full py-2 px-3 text-[#0F2A1D] leading-tight focus:outline-none focus:ring focus:ring-[#6B9071]"
                placeholder="Ingresar Usuario"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[#375534] text-sm font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="shadow appearance-none border border-[#AEC3BO] rounded w-full py-2 px-3 text-[#0F2A1D] leading-tight focus:outline-none focus:ring focus:ring-[#6B9071]"
                placeholder="Ingresar Contraseña"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <button
                type="submit"
                className="bg-[#375534] hover:bg-[#6B9071] text-[#E3EED4] font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-[#AEC3BO] transition-colors duration-300"
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-[#375534] hover:bg-[#6B9071] text-[#E3EED4] font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-[#AEC3BO] transition-colors duration-300"
              >
                Cancelar
              </button>
            </div>
          </form>
          {/* Sección de creación de cuenta */}
          <div className="mt-4 flex justify-center">
            <ul className="list-disc text-gray-300">

              <button
                onClick={handleCreateAccount}
                className="bg-[#6B9071] text-[#E3EED4] font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-[#375534] transition duration-300 transform hover:scale-105"
              >
                Crear Cuenta
              </button>

            </ul>
          </div>
        </div>
      </div>

      {/* Modal para crear cuenta */}
      <CreateModal isOpen={isModalOpen} onClose={handleCloseModal} onUserCreated={handleUserCreated} />
    </div>
  );
};

export default LoginPage;