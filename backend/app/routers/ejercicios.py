from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.database import get_session
from app.models import Ejercicio, EjercicioUpdate, EjercicioCreate, EjercicioRead, Rutina

router = APIRouter(prefix="/api/ejercicios", tags=["ejercicios"])


#POST /api/rutinas/{id}/ejercicios - Agregar ejercicio a una rutina
@router.post("/rutinas/{rutina_id}/ejercicios", response_model=EjercicioRead, status_code=201)
def agregar_ejercicio(rutina_id: int, payload: EjercicioCreate, session: Session = Depends(get_session)):
    rutina = session.get(Rutina, rutina_id)
    if not rutina:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")

    ejercicio = Ejercicio(**payload.dict(), rutina_id=rutina_id)
    session.add(ejercicio)

    try:
        session.commit()
        session.refresh(ejercicio)
    except Exception:
        session.rollback()
        raise HTTPException(
            status_code=500,
            detail="Error interno al crear el ejercicio"
        )

    return ejercicio

#PUT /api/ejercicios/{id} - Actualizar un ejercicio
@router.patch("/{ejercicio_id}", response_model=EjercicioRead, status_code=200)
def update_ejercicio(ejercicio_id: int, ejercicio_update: EjercicioUpdate, session: Session = Depends(get_session)):
    ejercicio = session.get(Ejercicio, ejercicio_id)
    if not ejercicio:
        raise HTTPException(
            status_code=404,
            detail="Ejercicio no encontrado"
        )
    data = ejercicio_update.dict(exclude_unset=True)
    for key, value in data.items():
        setattr(ejercicio, key, value)
    try:
        session.commit()
        session.refresh(ejercicio)
    except Exception:
        session.rollback()
        raise HTTPException(
            status_code=500,
            detail="Error interno al actualizar el ejercicio"
        )

    return ejercicio

#DELETE /api/ejercicios/{id} - Eliminar un ejercicio
@router.delete("/{ejercicio_id}", status_code=204)
def delete_ejercicio(ejercicio_id: int, session: Session = Depends(get_session)):
    ejercicio = session.get(Ejercicio, ejercicio_id)
    if not ejercicio:
        raise HTTPException(
            status_code=404,
            detail="Ejercicio no encontrado"
        )

    try:
        session.delete(ejercicio)
        session.commit()
    except Exception:
        session.rollback()
        raise HTTPException(
            status_code=500,
            detail="Error interno al eliminar el ejercicio"
        )

