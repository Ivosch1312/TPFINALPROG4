from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import select, Session
from sqlalchemy.orm import selectinload
from app.database import get_session
from app.models import Rutina, RutinaCreate, RutinaUpdate, RutinaWithEjercicios

router = APIRouter(prefix="/api/rutinas", tags=["rutinas"])

#GET /api/rutinas - Listar todas las rutinas
@router.get("/", response_model=List[RutinaWithEjercicios])
def read_rutinas(session: Session = Depends(get_session)):
    rutinas = session.exec(
        select(Rutina).options(selectinload(Rutina.ejercicios))
    ).all()
    return rutinas

#GET /api/rutinas/{id} - Obtener detalle de una rutina específica
@router.get("/{rutina_id}", response_model=RutinaWithEjercicios)
def read_rutina(rutina_id: int, session: Session = Depends(get_session)):
    rutina = session.exec(
        select(Rutina).where(Rutina.id == rutina_id).options(selectinload(Rutina.ejercicios))
    ).first()
    if not rutina:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
    return rutina

#GET /api/rutinas/buscar?nombre={texto} - Buscar rutinas por nombre
@router.get("/buscar/", response_model=List[RutinaWithEjercicios])
def search_rutinas(nombre: str = Query(..., min_length=1), session: Session = Depends(get_session)):
    rutinas = session.exec(
        select(Rutina).where(Rutina.nombre.contains(nombre)).options(selectinload(Rutina.ejercicios))
    ).all()
    return rutinas

#POST /api/rutinas - Crear una nueva rutina
@router.post("/", response_model=RutinaWithEjercicios, status_code=201)
def create_rutina(rutina: RutinaCreate, session: Session = Depends(get_session)):
    db_rutina = Rutina.from_orm(rutina)
    session.add(db_rutina)
    session.commit()
    session.refresh(db_rutina)
    return db_rutina

#PUT /api/rutinas/{id} - Actualizar una rutina existente
@router.put("/{rutina_id}", response_model=RutinaWithEjercicios)
def update_rutina(rutina_id: int, rutina_update: RutinaUpdate, session: Session = Depends(get_session)):
    rutina = session.get(Rutina, rutina_id)
    if not rutina:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
    rutina_data = rutina_update.dict(exclude_unset=True)
    for key, value in rutina_data.items():
        setattr(rutina, key, value)
    session.add(rutina)
    session.commit()
    session.refresh(rutina)
    return rutina

#DELETE /api/rutinas/{id} - Eliminar una rutina
@router.delete("/{rutina_id}")
def delete_rutina(rutina_id: int, session: Session = Depends(get_session)):
    rutina = session.get(Rutina, rutina_id)
    if not rutina:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
    session.delete(rutina)
    session.commit()
    return {"detail": "Rutina eliminada correctamente"}


