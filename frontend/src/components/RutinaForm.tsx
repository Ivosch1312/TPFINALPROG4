import React, { useState, useEffect } from 'react'; /* Para manejar estados y efectos */
import { useNavigate, useParams } from 'react-router-dom'; /* Para navegación y parámetros de URL */
import { useRutinas } from '../contexts/RutinasContext'; /* Contexto para manejar rutinas */
import { RutinaCreate, RutinaUpdate } from '../types'; /* Tipos de datos */
import './RutinaForm.css'; /* Estilos CSS */

const RutinaForm: React.FC = () => { /* Componente para formulario de rutina */
  const { id } = useParams<{ id: string }>(); /* Obtiene el ID de la rutina si es edición */
  const navigate = useNavigate(); /* Hook para navegación */
  const { createRutina, updateRutina, rutinas, loading } = useRutinas(); /* Funciones del contexto */
  const isEditing = !!id; /* Determina si se está editando */

  const [formData, setFormData] = useState<Omit<RutinaCreate, 'fecha_creacion'>>({ /* Estado para datos del formulario */
    nombre: '', /* Nombre de la rutina */
    descripcion: '', /* Descripción opcional */
    ejercicioXdia: '', /* Ejercicios por día */
  });

  const [errors, setErrors] = useState<Record<string, string>>({}); /* Estado para errores */

  useEffect(() => { /* Efecto para cargar datos si es edición */
    if (isEditing && id) {
      const rutina = rutinas.find(r => r.id === parseInt(id));
      if (rutina) {
        setFormData({
          nombre: rutina.nombre,
          descripcion: rutina.descripcion || '',
          ejercicioXdia: rutina.ejercicioXdia,
        });
      }
    }
  }, [isEditing, id, rutinas]);

  const validateForm = (): boolean => { /* Función para validar el formulario */
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.ejercicioXdia.trim()) {
      newErrors.ejercicioXdia = 'Los ejercicios por día son requeridos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => { /* Función para enviar el formulario */
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isEditing && id) {
        await updateRutina(parseInt(id), formData as RutinaUpdate);
      } else {
        await createRutina(formData as RutinaCreate);
      }
      navigate('/');
    } catch (error) {
      // Error manejado en el contexto
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { /* Función para manejar cambios en inputs */
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="rutina-form"> {/* Contenedor principal */}
      <div className="form-header"> {/* Cabecera del formulario */}
        <h1>{isEditing ? 'Editar Rutina' : 'Nueva Rutina'}</h1> {/* Título */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="cancel-button"
        >
          Cancelar {/* Botón para cancelar */}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form"> {/* Formulario */}
        <div className="form-group"> {/* Grupo para nombre */}
          <label htmlFor="nombre">Nombre de la Rutina *</label> {/* Etiqueta */}
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errors.nombre ? 'error' : ''}
            placeholder="Ej: Rutina de fuerza superior"
          /> {/* Campo de entrada */}
          {errors.nombre && <span className="error-message">{errors.nombre}</span>} {/* Mensaje de error */}
        </div>

        <div className="form-group"> {/* Grupo para descripción */}
          <label htmlFor="descripcion">Descripción</label> {/* Etiqueta */}
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={3}
            placeholder="Describe tu rutina..."
          /> {/* Área de texto */}
        </div>

        <div className="form-group"> {/* Grupo para ejercicios por día */}
          <label htmlFor="ejercicioXdia">Ejercicios por Día *</label> {/* Etiqueta */}
          <input
            type="text"
            id="ejercicioXdia"
            name="ejercicioXdia"
            value={formData.ejercicioXdia}
            onChange={handleChange}
            className={errors.ejercicioXdia ? 'error' : ''}
            placeholder="Ej: 3 ejercicios por día"
          /> {/* Campo de entrada */}
          {errors.ejercicioXdia && <span className="error-message">{errors.ejercicioXdia}</span>} {/* Mensaje de error */}
        </div>

        <div className="form-actions"> {/* Acciones del formulario */}
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Guardando...' : (isEditing ? 'Actualizar Rutina' : 'Crear Rutina')} {/* Botón de envío */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RutinaForm; /* Exporta el componente */