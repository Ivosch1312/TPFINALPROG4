# Gestión de Rutinas de Ejercicio

Un sistema completo para gestionar rutinas de ejercicio con backend FastAPI y frontend React.

## Arquitectura

- **Backend**: FastAPI con SQLModel y base de datos SQLite
- **Frontend**: React + TypeScript + Vite
- **Base de datos**: SQLite (configurado para desarrollo)

## Características

### Backend (FastAPI)
- ✅ API RESTful para rutinas y ejercicios
- ✅ Base de datos SQLModel con SQLite
- ✅ Validación automática con Pydantic
- ✅ CORS habilitado
- ✅ Documentación automática en `/docs`

### Frontend (React + Vite)
- 📱 **Interfaz Responsive**: Diseño adaptable
- ➕ **Gestión Completa**: CRUD de rutinas y ejercicios
- 🔍 **Búsqueda**: Filtrar rutinas por nombre
- ✅ **Validación**: Formularios con validación del cliente
- 🔄 **Estados de Carga**: Feedback visual durante operaciones
- 🎯 **Organización**: Ejercicios agrupados por día de la semana

## Instalación y Ejecución

### Prerrequisitos
- Python 3.8+
- Node.js 16+
- npm o yarn

### Backend

1. **Instalar dependencias de Python:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Configurar base de datos:**
   - El archivo `.env` ya está configurado para usar SQLite
   - La base de datos se crea automáticamente al iniciar

3. **Ejecutar el servidor:**
   ```bash
   cd backend
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

   El backend estará disponible en: http://localhost:8000
   Documentación API: http://localhost:8000/docs

### Frontend

1. **Instalar dependencias:**
   ```bash
   cd frontend
   npm install
   ```

2. **Ejecutar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

   El frontend estará disponible en: http://localhost:5173

## Uso

1. **Iniciar ambos servidores** (backend y frontend)
2. **Abrir el navegador** en http://localhost:5173
3. **Crear rutinas** usando el botón "Nueva Rutina"
4. **Agregar ejercicios** a cada rutina organizados por día
5. **Buscar y filtrar** rutinas por nombre
6. **Editar y eliminar** rutinas y ejercicios según necesites

## Estructura del Proyecto

```
TPFINALPROG4/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py          # Punto de entrada FastAPI
│   │   ├── database.py      # Configuración base de datos
│   │   ├── models.py        # Modelos SQLModel
│   │   └── routers/         # Endpoints API
│   │       ├── rutinas.py
│   │       └── ejercicios.py
│   ├── requirements.txt     # Dependencias Python
│   └── .env                 # Variables de entorno
└── frontend/
    ├── src/
    │   ├── components/      # Componentes React
    │   ├── contexts/        # Context API
    │   ├── services/        # Servicios API
    │   ├── types/           # Tipos TypeScript
    │   └── App.tsx          # App principal
    ├── package.json         # Dependencias Node.js
    └── vite.config.ts       # Configuración Vite
```

## API Endpoints

### Rutinas
- `GET /api/rutinas` - Listar todas las rutinas
- `GET /api/rutinas/{id}` - Obtener rutina específica
- `GET /api/rutinas/buscar?nombre={texto}` - Buscar rutinas
- `POST /api/rutinas` - Crear nueva rutina
- `PUT /api/rutinas/{id}` - Actualizar rutina
- `DELETE /api/rutinas/{id}` - Eliminar rutina

### Ejercicios
- `POST /api/ejercicios/rutinas/{id}/ejercicios` - Crear ejercicio
- `PATCH /api/ejercicios/{id}` - Actualizar ejercicio
- `DELETE /api/ejercicios/{id}` - Eliminar ejercicio

## Desarrollo

### Backend
- **Framework**: FastAPI
- **ORM**: SQLModel (SQLAlchemy + Pydantic)
- **Base de datos**: SQLite para desarrollo
- **Documentación**: Swagger UI automática

### Frontend
- **Framework**: React 18 con TypeScript
- **Build tool**: Vite
- **Routing**: React Router v6
- **State**: Context API + useState
- **Styling**: CSS Modules

## Próximos Pasos

- [ ] Agregar autenticación de usuarios
- [ ] Implementar tests unitarios
- [ ] Agregar más tipos de ejercicios
- [ ] Implementar seguimiento de progreso
- [ ] Agregar exportación/importación de rutinas
- [ ] Notificaciones push para recordatorios

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto es para fines educativos.

CAMBIOS IMPORTANTES:
1) Que cuando borre algo, se actualize la pagina (no llegue a solucionarlo)
2) No tenia en cuenta las series (solucionado)
3) Tiene que pedir las series en el front cuando crea y edita un ejercicio (solucionado)
4) Que mustre las series de base (solucionado)