from datetime import datetime
from enum import Enum
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, String

class DiaSemana(str, Enum): #Daba un error raro cuando estaban en mayusculas, desconosco por que, pero al ponerlas en minusculas anda bien
    Lunes = "Lunes"
    Martes = "Martes"
    Miércoles = "Miércoles"
    Jueves = "Jueves"
    Viernes = "Viernes"
    Sábado = "Sábado"
    Domingo = "Domingo"

class RutinaBase(SQLModel): #Segui el mismo patron que en el tp 1, primero una base, despues la tabla y luego los schemas de creacion, lectura y actualizacion
    nombre: str = Field(sa_column=Column("nombre", String, unique=True, nullable=False))
    descripcion: Optional[str] = None
    fecha_creacion: datetime = Field(default_factory=datetime.utcnow)
    ejercicioXdia: str

class Rutina(RutinaBase, table=True):
    __tablename__ = "rutina"
    id: int = Field(default=None, primary_key=True)
    
    ejercicios: List["Ejercicio"] = Relationship(
        back_populates="rutina", 
        sa_relationship_kwargs={"cascade": "all, delete-orphan"}
    )

class RutinaCreate(RutinaBase):
    pass

class RutinaRead(RutinaBase):
    id: int

class RutinaUpdate(SQLModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    ejercicioXdia: Optional[str] = None


class EjercicioBase(SQLModel):
    nombre: str
    dia_semana: DiaSemana
    series: int = Field(default=None, gt=0) #Que sea mayor a 0
    repeticiones: int = Field(default=None, gt=0) #Que sea mayor a 0
    peso: Optional[float] = Field(default=None, gt=0)#same
    notas: Optional[str]
    orden: Optional[int]
   

class Ejercicio(EjercicioBase, table=True):
    __tablename__ = "ejercicio" #Nombre de la tabla en la base de datos
    id: int = Field(default=None, primary_key=True) #Clave primaria auto incremental
    rutina_id: int = Field(default=None, foreign_key="rutina.id")
    rutina: Rutina = Relationship(back_populates="ejercicios")

class EjercicioCreate(EjercicioBase):
    pass

class EjercicioRead(EjercicioBase):
    id: int

class EjercicioUpdate(SQLModel):
    nombre: Optional[str]
    dia_semana: Optional[DiaSemana]
    series: Optional[int] = Field(default=None, gt=0) #Que sea mayor a 0
    repeticiones: Optional[int] = Field(default=None, gt=0) #Que sea mayor a 0
    peso: Optional[float] = Field(default=None, gt=0) #same
    notas: Optional[str]
    orden: Optional[int]

class RutinaWithEjercicios(RutinaRead):
    ejercicios: List[Ejercicio]


