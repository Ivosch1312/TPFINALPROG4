import React, { useState, useEffect } from 'react'; /* Para manejar estados */
import { useRutinas } from '../contexts/RutinasContext'; /* Importa el contexto de rutinas para manejar la lógica de las rutinas y ejercicios */
import { Ejercicio, EjercicioCreate, EjercicioUpdate, DiaSemana } from '../types'; /* Importa los tipos necesarios */
import './EjercicioForm.css'; /* Importa el CSS */

/* Los tsx determinan que existe, dónde existe y cómo se comporta */

const DIAS_SEMANA: DiaSemana[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]; /* Se usan para el mapeo del dropdown */

interface EjercicioFormProps { /* Contenedor de datos */
  rutinaId: number; /* ID de la rutina */
  ejercicio?: Ejercicio | null; /* Ejercicio a editar, si existe */
  onClose: () => void; /* Función para cerrar el formulario */
}

const EjercicioForm: React.FC<EjercicioFormProps> = ({ rutinaId, ejercicio, onClose }) => {
  const { createEjercicio, updateEjercicio, loading } = useRutinas(); /* Funciones del contexto */
  const isEditing = !!ejercicio; /* Determina si se está editando un ejercicio */

  const [formData, setFormData] = useState<EjercicioCreate>({ /* Crea una base para el ejercicio */
    nombre: '', /* Nombre del ejercicio */
    dia_semana: 'Lunes', /* Día de la semana por defecto */
    repeticiones: 1, /* Repeticiones por defecto */
    peso: undefined, /* Peso opcional */
    notas: '', /* Notas opcionales */
    orden: undefined, /* Orden opcional */
  });

  const [errors, setErrors] = useState<Record<string, string>>({}); /* Almacena errores de validación */

  useEffect(() => {
    if (isEditing && ejercicio) { /* Ventana para editar un ejercicio */
      setFormData({
        nombre: ejercicio.nombre,
        dia_semana: ejercicio.dia_semana,
        repeticiones: ejercicio.repeticiones,
        peso: ejercicio.peso,
        notas: ejercicio.notas || '',
        orden: ejercicio.orden,
      });
    }
  }, [isEditing, ejercicio]);

  const validateForm = (): boolean => { /* Función para validar el formulario */
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) { /* Mensaje de error si no se ingresa nombre */
      newErrors.nombre = 'El nombre es requerido';
    }

    if (formData.repeticiones < 1) { /* Mensaje de error si las repeticiones son menores a 1 */
      newErrors.repeticiones = 'Las repeticiones deben ser al menos 1';
    }

    if (formData.peso !== undefined && formData.peso < 0) { /* Mensaje de error si el peso es negativo */
      newErrors.peso = 'El peso no puede ser negativo';
    }

    setErrors(newErrors); 
    return Object.keys(newErrors).length === 0; /* Devuelve true si no hay errores */
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); /* Evita que la página se recargue */

    if (!validateForm()) { /* Por si se rompe */
      return;
    }

    try {
      if (isEditing && ejercicio) {
        await updateEjercicio(ejercicio.id, formData as EjercicioUpdate); /* Sucede el update si es un edit */
      } else {
        await createEjercicio(rutinaId, formData); /* Sucede la creación si es nuevo */
      }
      onClose(); /* Cierra el formulario */
    } catch (error) {
      // Error manejado en el contexto
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const processedValue = type === 'number' ? (value === '' ? undefined : Number(value)) : value;

    setFormData(prev => ({ ...prev, [name]: processedValue }));

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
    <div className="ejercicio-form"> {/* Contenedor principal del formulario */}
      <div className="form-header"> {/* Cabecera del formulario */}
        <h2>{isEditing ? 'Editar Ejercicio' : 'Nuevo Ejercicio'}</h2> {/* Título del formulario */}
        <button
          type="button"
          onClick={onClose}
          className="close-button"
        >
          × {/* Botón para cerrar */}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form"> {/* Formulario para enviar datos */}
        <div className="form-group"> {/* Grupo para el campo nombre */}
          <label htmlFor="nombre">Nombre del Ejercicio *</label> {/* Etiqueta para el nombre */}
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errors.nombre ? 'error' : ''}
            placeholder="Ej: Press de banca"
          /> {/* Campo de entrada para el nombre */}
          {errors.nombre && <span className="error-message">{errors.nombre}</span>} {/* Mensaje de error para nombre */}
        </div>

        <div className="form-group"> {/* Grupo para el campo día de la semana */}
          <label htmlFor="dia_semana">Día de la Semana *</label> {/* Etiqueta para el día */}
          <select
            id="dia_semana"
            name="dia_semana"
            value={formData.dia_semana}
            onChange={handleChange}
          > {/* Selector para el día de la semana */}
            {DIAS_SEMANA.map(dia => (
              <option key={dia} value={dia}>{dia}</option> /* Opciones del dropdown */
            ))}
          </select>
        </div>

        <div className="form-row"> {/* Fila para repeticiones y peso */}
          <div className="form-group"> {/* Grupo para repeticiones */}
            <label htmlFor="repeticiones">Repeticiones *</label> {/* Etiqueta para repeticiones */}
            <input
              type="number"
              id="repeticiones"
              name="repeticiones"
              value={formData.repeticiones}
              onChange={handleChange}
              min="1"
              className={errors.repeticiones ? 'error' : ''}
            /> {/* Campo de entrada para repeticiones */}
            {errors.repeticiones && <span className="error-message">{errors.repeticiones}</span>} {/* Mensaje de error para repeticiones */}
          </div>

          <div className="form-group"> {/* Grupo para peso */}
            <label htmlFor="peso">Peso (kg)</label> {/* Etiqueta para peso */}
            <input
              type="number"
              id="peso"
              name="peso"
              value={formData.peso || ''}
              onChange={handleChange}
              min="0"
              step="0.5"
              placeholder="Opcional"
              className={errors.peso ? 'error' : ''}
            /> {/* Campo de entrada para peso */}
            {errors.peso && <span className="error-message">{errors.peso}</span>} {/* Mensaje de error para peso */}
          </div>
        </div>

        <div className="form-group"> {/* Grupo para orden */}
          <label htmlFor="orden">Orden</label> {/* Etiqueta para orden */}
          <input
            type="number"
            id="orden"
            name="orden"
            value={formData.orden || ''}
            onChange={handleChange}
            min="1"
            placeholder="Opcional"
          /> {/* Campo de entrada para orden */}
        </div>

        <div className="form-group"> {/* Grupo para notas */}
          <label htmlFor="notas">Notas</label> {/* Etiqueta para notas */}
          <textarea
            id="notas"
            name="notas"
            value={formData.notas}
            onChange={handleChange}
            rows={3}
            placeholder="Notas adicionales..."
          /> {/* Área de texto para notas */}
        </div>

        <div className="form-actions"> {/* Contenedor de acciones del formulario */}
          <button
            type="button"
            onClick={onClose}
            className="cancel-button"
          >
            Cancelar {/* Botón para cancelar */}
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')} {/* Botón para enviar el formulario */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EjercicioForm; /* Exporta el componente */