from fastapi import FastAPI # Importa FastAPI
from fastapi.middleware.cors import CORSMiddleware # Middleware para CORS
import app.models # Importa los modelos para asegurarse de que estén registrados
from app.database import init_db # Función para inicializar la base de datos
from app.routers import rutinas, ejercicios # Importa los routers
from contextlib import asynccontextmanager 


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()  # Inicializa la base de datos al iniciar la aplicación
    yield
    # Aquí podrías agregar código para limpiar recursos al apagar la aplicación si es necesario

app = FastAPI(title="API de Gestión de Rutinas de Ejercicio", lifespan=lifespan) # Crea la instancia de FastAPI con lifespan

app.include_router(rutinas.router) # Incluye el router de rutinas
app.include_router(ejercicios.router) # Incluye el router de ejercicios

app.add_middleware( # Configura el middleware CORS
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas las fuentes (orígenes)
    allow_credentials=True, # Permite el uso de credenciales
    allow_methods=["*"],  # Permite todos los métodos HTTP
    allow_headers=["*"],  # Permite todos los encabezados
)

@app.get("/") 
def home():
    return {"message": "Me costo mucho, porfa pongame 10!"}