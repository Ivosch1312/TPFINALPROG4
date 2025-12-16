export type DiaSemana = "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes" | "Sábado" | "Domingo";

export interface RutinaBase {
  nombre: string;
  descripcion?: string;
  fecha_creacion: string;
  ejercicioXdia: string;
}

export interface Rutina extends RutinaBase {
  id: number;
  ejercicios: Ejercicio[];
}

export interface RutinaCreate extends RutinaBase {}

export interface RutinaUpdate {
  nombre?: string;
  descripcion?: string;
  ejercicioXdia?: string;
}

export interface EjercicioBase {
  nombre: string;
  dia_semana: DiaSemana;
  repeticiones: number;
  peso?: number;
  notas?: string;
  orden?: number;
}

export interface Ejercicio extends EjercicioBase {
  id: number;
  rutina_id: number;
}

export interface EjercicioCreate extends EjercicioBase {}

export interface EjercicioUpdate {
  nombre?: string;
  dia_semana?: DiaSemana;
  series?: number;
  repeticiones?: number;
  peso?: number;
  notas?: string;
  orden?: number;
}