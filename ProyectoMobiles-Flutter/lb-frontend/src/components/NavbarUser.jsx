import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBell } from 'react-icons/fa'; // Importar el ícono de campana

const NavbarUser = () => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true); // Estado para verificar notificaciones nuevas

  const toggleProfileMenu = () => {
    setProfileOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Función para manejar el clic en "Notificaciones"
  const handleNotificationsClick = () => {
    setHasNewNotifications(false); // Ocultar el ícono de notificación
  };

  const menuItems = [
    { name: 'Inicio', icon: 'M12 2L2 7h3v9h4V9h6v7h4V7h3L12 2z', path: '/user' },
    { name: 'Postulaciones', icon: 'M12 12c-2.21 0-4 1.79-4 4v3h8v-3c0-2.21-1.79-4-4-4z M12 4a4 4 0 100 8 4 4 0 000-8z', path: '/user/postulaciones' },
    { name: 'Ofertas', icon: 'M10 17l6-6-6-6v12z', path: '/user/ofertas' },
  ];

  return (
    <nav className="bg-[#0F2A1D] fixed top-0 left-0 right-0 p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Título */}
        <div className="text-[#E3EED4] text-2xl font-bold"></div>

        {/* Menú de navegación */}
        <ul className="hidden md:flex md:space-x-6 items-center">
          {menuItems.map((item) => (
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
                  className="h-5 w-5 md:h-6 md:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={item.icon} />
                </svg>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Perfil */}
        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="text-[#AEC3B0] hover:text-[#6B9071] cursor-pointer flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c-2.21 0-4 1.79-4 4v3h8v-3c0-2.21-1.79-4-4-4z" />
              <path d="M12 4a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
            <span className="ml-2">Perfil</span>
          </button>
          {isProfileOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-[#375534] text-[#E3EED4] shadow-lg rounded-md z-20">
              <li>
                <NavLink
                  to="/user/perfil"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md ${isActive ? 'bg-[#6B9071]' : 'hover:bg-[#6B9071]'
                    } transform hover:scale-105 transition duration-200`
                  }
                >
                  Ver Perfil
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/notificaciones"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md ${isActive ? 'bg-[#6B9071]' : 'hover:bg-[#6B9071]'
                    } transform hover:scale-105 transition duration-200`
                  }
                  onClick={handleNotificationsClick}
                >
                  <div className="flex items-center">
                    {hasNewNotifications && (
                      <FaBell className="h-5 w-5 text-[#E3EED4] mr-2" />
                    )}
                    <span>Notificaciones</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="block px-4 py-2 text-[#E3EED4] hover:text-[#AEC3B0] hover:bg-[#6B9071] rounded-md transform hover:scale-105 transition duration-200"
                >
                  Cerrar Sesión
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* Botón de menú (solo visible en pantallas pequeñas) */}
        <button onClick={toggleMenu} className="text-[#E3EED4] md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Menú desplegable en pantallas pequeñas */}
        {isMenuOpen && (
          <ul className="flex flex-col mt-4 space-y-2 md:hidden bg-[#375534] text-[#E3EED4] p-4 rounded-lg shadow-lg">
            {menuItems.map((item) => (
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
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={item.icon} />
                  </svg>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavbarUser;