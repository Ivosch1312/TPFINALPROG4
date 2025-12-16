# API de Gestión de Rutinas de Ejercicio - Backend

## Descripción del Proyecto
Esta es una API REST desarrollada con FastAPI para gestionar rutinas y ejercicios de entrenamiento. Permite crear, leer, actualizar y eliminar rutinas y ejercicios, facilitando la organización de programas de ejercicio.

## Requisitos Previos
- Python 3.8 o superior
- PostgreSQL instalado y en ejecución

## Instalación
1. Crea un entorno virtual:
   ```
   python -m venv venv
   ```
2. Activa el entorno virtual:
   - En Windows: `venv\Scripts\activate`
   - En macOS/Linux: `source venv/bin/activate`
3. Instala las dependencias:
   ```
   pip install -r requirements.txt
   ```

## Configuración de la Base de Datos
La aplicación utiliza PostgreSQL como base de datos. Debes configurar la cadena de conexión.

### String de Conexión
El formato de la cadena de conexión es: `postgresql://usuario:contraseña@host:puerto/nombre_db`

### Variables de Entorno
Configura las siguientes variables de entorno en un archivo `.env` en la raíz del proyecto:
```
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_db
```

Ejemplo de archivo `.env`:
```
DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/ejercicio_db
```

### Instrucciones para Crear la Base de Datos
1. Abre PostgreSQL (por ejemplo, con psql o pgAdmin).
2. Crea una base de datos nueva:
   ```
   CREATE DATABASE ejercicio_db;
   ```
3. Crea un usuario si es necesario:
   ```
   CREATE USER myuser WITH PASSWORD 'mypassword';
   GRANT ALL PRIVILEGES ON DATABASE ejercicio_db TO myuser;
   ```

### Migraciones
Si utilizas Alembic para migraciones (recomendado para cambios en el esquema), ejecuta:
```
alembic upgrade head
```
Asegúrate de tener configurado Alembic en el proyecto.

## Ejecución
1. Inicia el servidor:
   ```
   uvicorn app.main:app --reload
   ```
2. La aplicación corre en el puerto 8000 por defecto.
3. Accede a la documentación automática de FastAPI (Swagger) en: http://localhost:8000/docs

## Endpoints Disponibles
- `GET /`: Mensaje de bienvenida.
- `GET /rutinas`: Lista todas las rutinas.
- `POST /rutinas`: Crea una nueva rutina.
- `GET /rutinas/{id}`: Obtiene una rutina por ID.
- `PUT /rutinas/{id}`: Actualiza una rutina.
- `DELETE /rutinas/{id}`: Elimina una rutina.
- `GET /ejercicios`: Lista todos los ejercicios.
- `POST /ejercicios`: Crea un nuevo ejercicio.
- `GET /ejercicios/{id}`: Obtiene un ejercicio por ID.
- `PUT /ejercicios/{id}`: Actualiza un ejercicio.
- `DELETE /ejercicios/{id}`: Elimina un ejercicio.

## Estructura del Proyecto
- `app/main.py`: Punto de entrada de la aplicación FastAPI.
- `app/models/`: Modelos de datos (ej. Rutina, Ejercicio).
- `app/database/`: Configuración de la base de datos y conexión.
- `app/routers/`: Routers para rutinas y ejercicios.
- `requirements.txt`: Dependencias del proyecto.
- `.env`: Archivo de variables de entorno (no incluido en el repositorio).
