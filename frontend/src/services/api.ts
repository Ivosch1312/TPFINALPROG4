import { Rutina, RutinaCreate, RutinaUpdate, Ejercicio, EjercicioCreate, EjercicioUpdate } from '../types';

const API_BASE_URL = '/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Rutinas
  async getRutinas(): Promise<Rutina[]> {
    return this.request<Rutina[]>('/rutinas');
  }

  async getRutina(id: number): Promise<Rutina> {
    return this.request<Rutina>(`/rutinas/${id}`);
  }

  async searchRutinas(nombre: string): Promise<Rutina[]> {
    return this.request<Rutina[]>(`/rutinas/buscar?nombre=${encodeURIComponent(nombre)}`);
  }

  async createRutina(rutina: RutinaCreate): Promise<Rutina> {
    return this.request<Rutina>('/rutinas', {
      method: 'POST',
      body: JSON.stringify(rutina),
    });
  }

  async updateRutina(id: number, rutina: RutinaUpdate): Promise<Rutina> {
    return this.request<Rutina>(`/rutinas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(rutina),
    });
  }

  async deleteRutina(id: number): Promise<void> {
    await this.request(`/rutinas/${id}`, {
      method: 'DELETE',
    });
  }

  // Ejercicios
  async createEjercicio(rutinaId: number, ejercicio: EjercicioCreate): Promise<Ejercicio> {
    return this.request<Ejercicio>(`/ejercicios/rutinas/${rutinaId}/ejercicios`, {
      method: 'POST',
      body: JSON.stringify(ejercicio),
    });
  }

  async updateEjercicio(id: number, ejercicio: EjercicioUpdate): Promise<Ejercicio> {
    return this.request<Ejercicio>(`/ejercicios/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(ejercicio),
    });
  }

  async deleteEjercicio(id: number): Promise<void> {
    await this.request(`/ejercicios/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();