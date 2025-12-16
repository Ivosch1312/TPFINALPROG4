import React, { useState, useEffect } from 'react'; /* Para manejar estados y efectos */
import { useParams, useNavigate } from 'react-router-dom'; /* Para obtener parámetros de URL y navegación */
import { useRutinas } from '../contexts/RutinasContext'; /* Contexto para manejar rutinas */
import { Rutina, Ejercicio, DiaSemana } from '../types'; /* Tipos de datos */
import EjercicioForm from './EjercicioForm.tsx'; /* Componente para formulario de ejercicio */
import './RutinaDetail.css'; /* Estilos CSS */

const DIAS_SEMANA: DiaSemana[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]; /* Días de la semana */

const RutinaDetail: React.FC = () => { /* Componente para mostrar detalles de una rutina */
  const { id } = useParams<{ id: string }>(); /* Obtiene el ID de la rutina de la URL */
  const navigate = useNavigate(); /* Hook para navegación */
  const { rutinas, loading, deleteEjercicio } = useRutinas(); /* Datos y funciones del contexto */
  const [rutina, setRutina] = useState<Rutina | null>(null); /* Estado para la rutina actual */
  const [showEjercicioForm, setShowEjercicioForm] = useState(false); /* Estado para mostrar formulario */
  const [editingEjercicio, setEditingEjercicio] = useState<Ejercicio | null>(null); /* Estado para ejercicio en edición */
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null); /* Estado para confirmación de eliminación */

  useEffect(() => { /* Efecto para cargar la rutina al cambiar el ID */
    if (id) {
      const foundRutina = rutinas.find(r => r.id === parseInt(id));
      setRutina(foundRutina || null);
    }
  }, [id, rutinas]);

  const handleDeleteEjercicio = async (ejercicioId: number) => { /* Función para eliminar un ejercicio */
    try {
      await deleteEjercicio(ejercicioId);
      setRutina(prev => prev ? { ...prev, ejercicios: prev.ejercicios.filter(e => e.id !== ejercicioId) } : null);
      setDeleteConfirm(null);
    } catch (error) {
      // Error manejado en el contexto
    }
  };

  const groupEjerciciosByDia = (ejercicios: Ejercicio[]) => { /* Función para agrupar ejercicios por día */
    const grouped: Record<DiaSemana, Ejercicio[]> = {
      Lunes: [],
      Martes: [],
      Miércoles: [],
      Jueves: [],
      Viernes: [],
      Sábado: [],
      Domingo: [],
    };

    ejercicios.forEach(ejercicio => {
      grouped[ejercicio.dia_semana].push(ejercicio);
    });

    return grouped;
  };

  if (!rutina) { /* Si no hay rutina, muestra carga */
    return <div className="loading">Cargando rutina...</div>;
  }

  const ejerciciosGrouped = groupEjerciciosByDia(rutina.ejercicios); /* Agrupa ejercicios por día */

  return (
    <div className="rutina-detail"> {/* Contenedor principal */}
      <div className="detail-header"> {/* Cabecera con información de la rutina */}
        <div className="header-info">
          <h1>{rutina.nombre}</h1> {/* Nombre de la rutina */}
          {rutina.descripcion && (
            <p className="descripcion">{rutina.descripcion}</p> /* Descripción si existe */
          )}
          <div className="rutina-meta"> {/* Metadatos de la rutina */}
            <span>{rutina.ejercicios.length} ejercicios</span>
            <span>Creada: {new Date(rutina.fecha_creacion).toLocaleDateString()}</span>
            <span>{rutina.ejercicioXdia}</span>
          </div>
        </div>
        <div className="header-actions"> {/* Acciones de la cabecera */}
          <button
            onClick={() => navigate(`/rutinas/${rutina.id}/editar`)}
            className="action-button edit"
          >
            Editar Rutina
          </button>
          <button
            onClick={() => setShowEjercicioForm(true)}
            className="action-button add"
          >
            Agregar Ejercicio
          </button>
          <button
            onClick={() => navigate('/')}
            className="action-button back"
          >
            Volver
          </button>
        </div>
      </div>

      <div className="ejercicios-section"> {/* Sección de ejercicios */}
        <h2>Ejercicios por Día</h2>

        {DIAS_SEMANA.map(dia => { /* Mapea cada día de la semana */
          const ejerciciosDia = ejerciciosGrouped[dia];
          return (
            <div key={dia} className="dia-section"> {/* Sección por día */}
              <h3 className="dia-titulo">{dia}</h3>
              {ejerciciosDia.length === 0 ? (
                <p className="no-ejercicios">No hay ejercicios programados para este día.</p> /* Mensaje si no hay ejercicios */
              ) : (
                <div className="ejercicios-list"> {/* Lista de ejercicios */}
                  {ejerciciosDia.map(ejercicio => (
                    <div key={ejercicio.id} className="ejercicio-card"> {/* Tarjeta de ejercicio */}
                      <div className="ejercicio-info">
                        <h4>{ejercicio.nombre}</h4> {/* Nombre del ejercicio */}
                        <div className="ejercicio-details"> {/* Detalles del ejercicio */}
                          <span>{ejercicio.repeticiones} repeticiones</span>
                          {ejercicio.peso && <span>{ejercicio.peso} kg</span>}
                          {ejercicio.orden && <span>Orden: {ejercicio.orden}</span>}
                        </div>
                        {ejercicio.notas && (
                          <p className="ejercicio-notas">{ejercicio.notas}</p> /* Notas si existen */
                        )}
                      </div>
                      <div className="ejercicio-actions"> {/* Acciones del ejercicio */}
                        <button
                          onClick={() => setEditingEjercicio(ejercicio)}
                          className="action-button edit-small"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(ejercicio.id)}
                          className="action-button delete-small"
                          disabled={loading}
                        >
                          Eliminar
                        </button>
                      </div>

                      {deleteConfirm === ejercicio.id && ( /* Confirmación de eliminación */
                        <div className="delete-confirm">
                          <p>¿Eliminar este ejercicio?</p>
                          <div className="confirm-actions">
                            <button
                              onClick={() => handleDeleteEjercicio(ejercicio.id)}
                              className="confirm-button confirm"
                              disabled={loading}
                            >
                              {loading ? 'Eliminando...' : 'Sí'}
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="confirm-button cancel"
                            >
                              No
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
        })}
      </div>

      {(showEjercicioForm || editingEjercicio) && ( /* Modal para formulario de ejercicio */
        <div className="modal-overlay">
          <div className="modal-content">
            <EjercicioForm
              rutinaId={rutina.id}
              ejercicio={editingEjercicio}
              onClose={() => {
                setShowEjercicioForm(false);
                setEditingEjercicio(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RutinaDetail; /* Exporta el componente */