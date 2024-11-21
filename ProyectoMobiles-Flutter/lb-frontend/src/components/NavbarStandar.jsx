import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavbarStandar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Opciones del menú con iconos y rutas correspondientes
  const menuItems = [
    { name: 'Inicio', icon: 'M12 2L2 7h3v9h4V9h6v7h4V7h3L12 2z', path: '/' },
    { name: 'Oferta', icon: 'M10 17l6-6-6-6v12z', path: '/oferta' },
    { name: 'Iniciar Sesión', icon: 'M10 17l6-6-6-6v12z', path: '/login' },
  ];

  return (
    <nav className="bg-[#0F2A1D] shadow-md p-2 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        {/* Botón Hamburguesa (solo visible en pantallas pequeñas) */}
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
          className={`flex-col md:flex-row md:flex md:space-x-6 lg:space-x-10 items-center space-y-4 md:space-y-0 mt-4 md:mt-0 transform ${
            isMenuOpen ? 'flex' : 'hidden'
          } md:flex transition-all duration-300 ease-in-out`}
        >
          {menuItems.map((item) => (
            <li key={item.name} className="flex items-center">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-[#E3EED4] flex items-center space-x-2 transition-colors duration-300 py-2 px-3 rounded'
                    : 'text-[#AEC3B0] flex items-center space-x-2 hover:text-[#E3EED4] transition-colors duration-300 py-2 px-3 rounded'
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

export default NavbarStandar;