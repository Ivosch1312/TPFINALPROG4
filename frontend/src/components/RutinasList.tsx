import React, { useState } from 'react'; /* Para manejar estados */
import { Link } from 'react-router-dom'; /* Para navegación con enlaces */
import { useRutinas } from '../contexts/RutinasContext'; /* Contexto para manejar rutinas */
import { Rutina } from '../types'; /* Tipo de datos */
import './RutinasList.css'; /* Estilos CSS */

const RutinasList: React.FC = () => { /* Componente para listar rutinas */
  const { filteredRutinas, loading, error, searchTerm, setSearchTerm, deleteRutina } = useRutinas(); /* Datos y funciones del contexto */
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null); /* Estado para confirmación de eliminación */

  const handleDelete = async (id: number) => { /* Función para eliminar una rutina */
    try {
      await deleteRutina(id);
      setDeleteConfirm(null);
    } catch (error) {
      // Error manejado en el contexto
    }
  };

  if (loading && filteredRutinas.length === 0) { /* Si está cargando y no hay rutinas */
    return <div className="loading">Cargando rutinas...</div>;
  }

  if (error) { 
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="rutinas-list"> {/* Contenedor principal */}
      <div className="header"> {/* Cabecera */}
        <h1>Mis Rutinas de Ejercicio</h1> {/* Título */}
        <div className="search-container"> {/* Contenedor de búsqueda */}
          <input
            type="text"
            placeholder="Buscar rutinas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          /> {/* Campo de búsqueda */}
        </div>
      </div>

      {filteredRutinas.length === 0 ? ( /* Si no hay rutinas */
        <div className="empty-state"> {/* Estado vacío */}
          <p>No se encontraron rutinas.</p>
          <Link to="/rutinas/nueva" className="create-button"> {/* Enlace para crear rutina */}
            Crear primera rutina
          </Link>
        </div>
      ) : (
        <div className="rutinas-grid"> {/* Cuadrícula de rutinas */}
          {filteredRutinas.map((rutina: Rutina) => (
            <div key={rutina.id} className="rutina-card"> {/* Tarjeta de rutina */}
              <div className="rutina-header"> {/* Cabecera de la tarjeta */}
                <h3>{rutina.nombre}</h3> {/* Nombre de la rutina */}
                <div className="rutina-actions"> {/* Acciones de la rutina */}
                  <Link to={`/rutinas/${rutina.id}`} className="action-button view"> {/* Ver rutina */}
                    Ver
                  </Link>
                  <Link to={`/rutinas/${rutina.id}/editar`} className="action-button edit"> {/* Editar rutina */}
                    Editar
                  </Link>
                  <button
                    onClick={() => setDeleteConfirm(rutina.id)}
                    className="action-button delete"
                    disabled={loading}
                  > {/* Eliminar rutina */}
                    Eliminar
                  </button>
                </div>
              </div>

              {rutina.descripcion && ( /* Descripción si existe */
                <p className="rutina-description">{rutina.descripcion}</p>
              )}

              <div className="rutina-stats"> {/* Estadísticas de la rutina */}
                <span>{rutina.ejercicios.length} ejercicios</span>
                <span>Creada: {new Date(rutina.fecha_creacion).toLocaleDateString()}</span>
              </div>

              {deleteConfirm === rutina.id && ( /* Confirmación de eliminación */
                <div className="delete-confirm">
                  <p>¿Estás seguro de que quieres eliminar esta rutina?</p>
                  <div className="confirm-actions">
                    <button
                      onClick={() => handleDelete(rutina.id)}
                      className="confirm-button confirm"
                      disabled={loading}
                    >
                      {loading ? 'Eliminando...' : 'Sí, eliminar'}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="confirm-button cancel"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RutinasList; /* Exporta el componente */