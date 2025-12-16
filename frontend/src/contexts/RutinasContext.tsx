import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Rutina, RutinaCreate, RutinaUpdate, EjercicioCreate, EjercicioUpdate } from '../types';
import { apiService } from '../services/api';

interface RutinasContextType {
  rutinas: Rutina[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredRutinas: Rutina[];
  fetchRutinas: () => Promise<void>;
  createRutina: (rutina: RutinaCreate) => Promise<void>;
  updateRutina: (id: number, rutina: RutinaUpdate) => Promise<void>;
  deleteRutina: (id: number) => Promise<void>;
  createEjercicio: (rutinaId: number, ejercicio: EjercicioCreate) => Promise<void>;
  updateEjercicio: (id: number, ejercicio: EjercicioUpdate) => Promise<void>;
  deleteEjercicio: (id: number) => Promise<void>;
}

const RutinasContext = createContext<RutinasContextType | undefined>(undefined);

export const useRutinas = () => {
  const context = useContext(RutinasContext);
  if (!context) {
    throw new Error('useRutinas must be used within a RutinasProvider');
  }
  return context;
};

interface RutinasProviderProps {
  children: ReactNode;
}

export const RutinasProvider: React.FC<RutinasProviderProps> = ({ children }) => {
  const [rutinas, setRutinas] = useState<Rutina[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRutinas = rutinas.filter(rutina =>
    rutina.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchRutinas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getRutinas();
      setRutinas(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const createRutina = async (rutina: RutinaCreate) => {
    setLoading(true);
    setError(null);
    try {
      const newRutina = await apiService.createRutina(rutina);
      setRutinas(prev => [...prev, newRutina]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear rutina');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateRutina = async (id: number, rutina: RutinaUpdate) => {
    setLoading(true);
    setError(null);
    try {
      const updatedRutina = await apiService.updateRutina(id, rutina);
      setRutinas(prev => prev.map(r => r.id === id ? updatedRutina : r));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar rutina');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteRutina = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await apiService.deleteRutina(id);
      setRutinas(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar rutina');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createEjercicio = async (rutinaId: number, ejercicio: EjercicioCreate) => {
    setLoading(true);
    setError(null);
    try {
      const newEjercicio = await apiService.createEjercicio(rutinaId, ejercicio);
      setRutinas(prev => prev.map(rutina =>
        rutina.id === rutinaId
          ? { ...rutina, ejercicios: [...rutina.ejercicios, newEjercicio] }
          : rutina
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear ejercicio');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEjercicio = async (id: number, ejercicio: EjercicioUpdate) => {
    setLoading(true);
    setError(null);
    try {
      const updatedEjercicio = await apiService.updateEjercicio(id, ejercicio);
      setRutinas(prev => prev.map(rutina => ({
        ...rutina,
        ejercicios: rutina.ejercicios.map(ej =>
          ej.id === id ? updatedEjercicio : ej
        )
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar ejercicio');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteEjercicio = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await apiService.deleteEjercicio(id);
      setRutinas(prev => prev.map(rutina => ({
        ...rutina,
        ejercicios: rutina.ejercicios.filter(ej => ej.id !== id)
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar ejercicio');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRutinas();
  }, []);

  const value: RutinasContextType = {
    rutinas,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filteredRutinas,
    fetchRutinas,
    createRutina,
    updateRutina,
    deleteRutina,
    createEjercicio,
    updateEjercicio,
    deleteEjercicio,
  };

  return (
    <RutinasContext.Provider value={value}>
      {children}
    </RutinasContext.Provider>
  );
};