# Gestión de Rutinas de Ejercicio - Frontend

## Descripción del Proyecto
Esta es una aplicación web desarrollada para gestionar rutinas y ejercicios de entrenamiento. Permite a los usuarios crear, visualizar y editar rutinas y ejercicios a través de una interfaz intuitiva, conectándose a una API backend.

## Requisitos Previos
- Node.js 16 o superior
- npm o yarn (gestor de paquetes)

## Instalación
Instala las dependencias del proyecto:
```
npm install
```
O si usas yarn:
```
yarn install
```

## Configuración
La aplicación se conecta a la API backend. Configura la URL del backend en un archivo de configuración o variable de entorno.

### Archivo de Configuración
Crea un archivo `.env` en la raíz del proyecto con:
```
REACT_APP_API_URL=http://localhost:8000
```

Asegúrate de que la URL apunte al servidor backend en ejecución. Si cambias el puerto del backend, actualiza esta variable.

## Ejecución
1. Inicia el servidor en modo desarrollo:
   ```
   npm start
   ```
   O con yarn:
   ```
   yarn start
   ```
2. La aplicación corre en el puerto 3000 por defecto.
3. Para compilar para producción:
   ```
   npm run build
   ```
   O con yarn:
   ```
   yarn build
   ```

## Tecnologías Utilizadas
- React: Librería para construir la interfaz de usuario.
- Axios: Para realizar peticiones HTTP a la API.
- React Router: Para el enrutamiento de páginas.
- Bootstrap o Material-UI: Para estilos y componentes UI (ajusta según tu implementación).

## Estructura del Proyecto
- `src/components/`: Componentes reutilizables de la interfaz (ej. RutinaList, EjercicioForm).
- `src/pages/`: Páginas principales de la aplicación (ej. Home, Rutinas, Ejercicios).
- `src/services/`: Servicios para llamadas a la API (ej. api.js para Axios).
- `src/App.js`: Componente principal de la aplicación.
- `public/`: Archivos estáticos (ej. index.html).
- `.env`: Variables de entorno (no incluido en el repositorio).