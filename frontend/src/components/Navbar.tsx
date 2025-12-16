import React from 'react'; /* Importa React para crear componentes */
import { Link, useNavigate } from 'react-router-dom'; /* Importa componentes de navegación de React Router */
import './Navbar.css'; /* Importa el archivo CSS para estilos */

const Navbar: React.FC = () => { /* Componente funcional de la barra de navegación */
  const navigate = useNavigate(); /* Hook para navegación programática */

  return (
    <nav className="navbar"> {/* Elemento de navegación principal */}
      <div className="navbar-container"> {/* Contenedor de la barra de navegación */}
        <Link to="/" className="navbar-logo"> {/* Enlace al inicio con el logo */}
          🏋️ Rutinas de Ejercicio
        </Link>
        <div className="navbar-menu"> {/* Menú de navegación */}
          <Link to="/" className="navbar-link"> {/* Enlace a todas las rutinas */}
            Todas las Rutinas
          </Link>
          <button
            onClick={() => navigate('/rutinas/nueva')} /* Navega a la página de nueva rutina */
            className="navbar-button"
          >
            Nueva Rutina {/* Botón para crear nueva rutina */}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; /* Exporta el componente */