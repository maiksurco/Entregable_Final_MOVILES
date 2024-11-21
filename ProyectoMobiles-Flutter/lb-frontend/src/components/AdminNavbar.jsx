import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <nav className="bg-[#0F2A1D] p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Menú de usuario */}
        <div className="relative">
          <button
            onClick={toggleUserMenu}
            className="text-[#E3EED4] text-xl font-bold flex items-center space-x-2 focus:outline-none"
          >
            <span>Admin Panel</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#AEC3B0] rounded-md shadow-lg z-20">
              <ul className="py-1 text-[#0F2A1D]">
              {/* <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 rounded-md transform hover:scale-105 transition duration-200 hover:bg-[#6B9071] hover:text-[#E3EED4]"
                  >
                    Ver Perfil
                  </button>
                </li> */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 rounded-md transform hover:scale-105 transition duration-200 hover:bg-[#6B9071] hover:text-[#E3EED4]"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Botón Hamburguesa (responsive) */}
        <button
          className="text-[#E3EED4] md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Menú de navegación */}
        <ul
          className={`flex-col md:flex-row md:flex md:space-x-6 lg:space-x-10 items-center space-y-4 md:space-y-0 mt-4 md:mt-0 transform ${isOpen ? 'flex' : 'hidden'
            } md:flex transition-all duration-300 ease-in-out`}
        >
          {[
            { name: 'Home', icon: 'M12 2L2 7h3v9h4V9h6v7h4V7h3L12 2z', path: '/admin' },
            { name: 'Usuarios', icon: 'M12 12c-2.21 0-4 1.79-4 4v3h8v-3c0-2.21-1.79-4-4-4z M12 4a4 4 0 100 8 4 4 0 000-8z', path: '/admin/users' },
            { name: 'Empresas', icon: 'M4 4h16v2H4V4zm0 5h16v2H4V9zm0 5h16v2H4v-2zm0 5h16v2H4v-2z', path: '/admin/empresa' },
            { name: 'Estudiantes', icon: 'M12 12c-2.21 0-4 1.79-4 4v3h8v-3c0-2.21-1.79-4-4-4z M12 4a4 4 0 100 8 4 4 0 000-8z', path: '/admin/estudiante' },
            //{ name: 'Notificaciones', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z M11 14h2v-2h-2v2zm0-4h2V7h-2v3z', path: '/admin/notificacion' },
            { name: 'Postulaciones', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z M11 14h2v-2h-2v2zm0-4h2V7h-2v3z', path: '/admin/postulacion' },
            { name: 'Ofertas', icon: 'M10 17l6-6-6-6v12z', path: '/admin/oferta' },
            { name: 'Seguimiento', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z', path: '/admin/seguimiento' },
          ].map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-[#E3EED4] flex items-center space-x-2'
                    : 'text-[#AEC3B0] flex items-center space-x-2 hover:text-[#E3EED4] transition-colors'
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={item.icon} />
                </svg>
                <span className="text-sm md:text-base lg:text-lg">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;