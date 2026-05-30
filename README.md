# <img src="docs/imagenes-readme/logo-readme.png" alt="Logo" width="70" align="absmiddle"> Invictus: La Disciplina en su Forma más Pura

Proyecto destinado a crear, personalizar y gestionar tus rutinas de entrenamiento. Descubre ejercicios, arma rutinas personalizadas y accede a información detallada de cada movimiento.

---

## Motivación

Invictus surge de una motivación personal, el crear una aplicación web que no solo fuera útil para mí, sino para personas que están comenzando en el gimnasio o desean tomárselo más en serio. La idea principal es proporcionar un espacio donde los usuarios puedan descubrir nuevos ejercicios con instrucciones paso a paso sobre la técnica correcta, agregarlos a rutinas personalizables con series y repeticiones adaptadas a su experiencia, y organizar entrenamientos según los días que prefieran.

Observé que aplicaciones similares, en su ambición por implementar funcionalidades avanzadas como IA, rankings, y planes de pago, generan interfaces complejas que abruman al usuario promedio. Invictus prioriza lo opuesto: una experiencia limpia y accesible.

---

## Despliegue en Producción

La aplicación está completamente desplegada y disponible en producción:

[https://invictus-web.netlify.app](https://invictus-web.netlify.app)

> Invictus está desplegado mediante los planes gratuitos de los tres siguientes servicios, por lo que puede ser necesario esperar medio minuto a que se encienda el servidor.

- **Frontend:** Netlify
- **Backend:** Render
- **Base de Datos:** PostgreSQL en Aiven

---

## Características

- Catálogo de Ejercicios — Explora un amplio catálogo clasificado por músculo y equipamiento
- Rutinas Personalizadas — Crea rutinas, asigna días y objetivos propios
- Drag & Drop — Reordena fácilmente ejercicios dentro de rutinas
- Gestión de Perfil — Mantén tu información personal y estadísticas actualizadas
- Autenticación JWT — Acceso seguro a tu contenido
- Interfaz Responsive — Accede desde cualquier dispositivo

---

## Las diferentes vistas de Invictus

<table width="100%">
  <tr>
    <td align="center">
      <img 
        src="./docs/imagenes-readme/inicio.png" 
        alt="Inicio" 
      >
      <br>
      <sub>Inicio</sub>
    </td>
    <td align="center">
      <img 
        src="./docs/imagenes-readme/catalogo.png" 
        alt="Catálogo" 
      >
      <br>
      <sub>Catálogo de Ejercicios</sub>
    </td>
  </tr>

  <tr>
    <td align="center">
      <img 
        src="./docs/imagenes-readme/rutinas.png" 
        alt="Mis Rutinas" 
      >
      <br>
      <sub>Gestión de rutinas</sub>
    </td>
    <td align="center">
      <img 
        src="./docs/imagenes-readme/rutina-detalle.png" 
        alt="Detalle de Rutina" 
      >
      <br>
      <sub>Edición de rutina</sub>
    </td>
  </tr>
</table>

<div align="center">
  <img 
    src="./docs/imagenes-readme/perfil.png" 
    alt="Perfil" 
    width="50%"
  >
  <br>
  <sub>Perfil</sub>
</div>

---

## Stack Tecnológico

| Componente    | Tecnología                            |
| ------------- | ------------------------------------- |
| Frontend      | JavaScript, React, Vite, Tailwind CSS |
| Backend       | Python, Flask                         |
| Base de Datos | PostgreSQL                            |
| Animaciones   | Framer Motion, dnd-kit                |
| Iconografía   | Lucide React, React Icons             |

---

## Requisitos

- Node.js v18 o superior
- Python 3.11 o superior
- PostgreSQL 15 o superior
- Docker & Docker Compose (opcional)

---

## Instalación Rápida

### Con Docker (recomendado)

```bash
git clone https://github.com/Izan206/Invictus.git
cd Invictus
docker-compose up
```

Accede a:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Instalación Manual

#### Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Configura las variables de entorno creando un archivo `.env`:

```env
RAPIDAPI_KEY=xxxxxxx
SECRET_KEY=xxxxxxx
JWT_SECRET_KEY=xxxxxxx
DATABASE_URL=postgresql://user:password@localhost:5433/invictus_db
FRONTEND_URL=http://localhost:5173
```

Luego inicia el servidor:

```bash
python app/main.py
```

#### Frontend

```bash
cd frontend
npm install
```

Configura las variables de entorno creando un archivo `.env`:

```env
VITE_API_URL=http://localhost:5000/
```

Finalmente:

```bash
npm run dev
```

---

## Configuración de Variables de Entorno

### Backend

Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:

| Variable         | Descripción                           | Ejemplo                                                 |
| ---------------- | ------------------------------------- | ------------------------------------------------------- |
| `RAPIDAPI_KEY`   | Clave API de RapidAPI para ExerciseDB | `xxxxxx`                                                |
| `SECRET_KEY`     | Clave secreta para sesiones Flask     | `xxxxxx`                                                |
| `JWT_SECRET_KEY` | Clave secreta para tokens JWT         | `xxxxxx`                                                |
| `DATABASE_URL`   | URL de conexión a PostgreSQL          | `postgresql://user:password@localhost:5433/invictus_db` |
| `FRONTEND_URL`   | URL del frontend (para CORS)          | `http://localhost:5173`                                 |

**Obtener RAPIDAPI_KEY:**

1. Regístrate en [RapidAPI](https://rapidapi.com)
2. Busca la API "ExerciseDB"
3. Copia tu clave API

### Frontend

Crea un archivo `.env` en la carpeta `frontend/` con:

| Variable       | Descripción     | Ejemplo                  |
| -------------- | --------------- | ------------------------ |
| `VITE_API_URL` | URL del backend | `http://localhost:5000/` |

### Con Docker

Si usas Docker, las variables ya están configuradas en `docker-compose.yml` (asegúrate de tener `RAPIDAPI_KEY`):

```bash
export RAPIDAPI_KEY=xxxxxx
docker-compose up
```

---

## Modelo Entidad-Relación

![MER](docs/imagenes-readme/entidad-relacion.png)

---

## Estructura del Proyecto

```
Invictus/
├── frontend/
│   ├── src/
│   │   ├── pages/             # Páginas principales
│   │   │   ├── Inicio.jsx
│   │   │   ├── Catalogo.jsx
│   │   │   ├── TusRutinas.jsx
│   │   │   ├── DetalleRutina.jsx
│   │   │   ├── DetalleEjercicio.jsx
│   │   │   ├── Perfil.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Registro.jsx
│   │   ├── components/        # Componentes reutilizables
│   │   ├── layouts/           # Layouts principales
│   │   ├── context/           # Context API (Auth)
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── main.py           # Entrada principal
│   │   ├── models/           # Modelos de BD
│   │   ├── routes/           # Rutas de API
│   │   ├── services/         # Lógica de negocio
│   │   ├── repositories/     # Acceso a BD
│   │   ├── exceptions/       # Excepciones personalizadas
│   │   └── migrations/       # Migraciones de BD
│   ├── requirements.txt
│   ├── Dockerfile
│   └── app.py
│
├── docker-compose.yml
└── README.md
```

---

## API Endpoints

### Autenticación

```
POST   /auth/register              Registrarse
POST   /auth/login                 Iniciar sesión
POST   /auth/logout                Cerrar sesión (requiere JWT)
```

### Ejercicios

```
GET    /ejercicios/catalogo                    Obtener catálogo (paginado, filtrable)
GET    /ejercicios/<id>                        Detalle de un ejercicio
GET    /ejercicios/buscar/<nombre>             Buscar ejercicio (requiere JWT)
GET    /ejercicios/obtener-ejercicios          Obtener todos (requiere JWT)
GET    /ejercicios/<id_api>/imagen             Obtener imagen del ejercicio
```

### Rutinas

```
POST   /rutinas/crear_rutina                   Crear rutina (requiere JWT)
GET    /rutinas/mis-rutinas                    Obtener mis rutinas (requiere JWT)
GET    /rutinas/rutina/<id>                    Detalle de rutina (requiere JWT)
PUT    /rutinas/actualizar-rutina/<id>         Editar rutina (requiere JWT)
DELETE /rutinas/eliminar-rutina/<id>           Eliminar rutina (requiere JWT)
```

### Ejercicios en Rutinas

```
POST   /rutinaejercicio/<id_rutina>/añadir-ejercicio              Agregar ejercicio (requiere JWT)
GET    /rutinaejercicio/<id_rutina>/obtener-ejercicios            Obtener ejercicios (requiere JWT)
PUT    /rutinaejercicio/<id_rutina>/editar-ejercicio/<id>         Editar ejercicio (requiere JWT)
PUT    /rutinaejercicio/<id_rutina>/reordenar                      Reordenar ejercicios (requiere JWT)
DELETE /rutinaejercicio/<id_rutina>/eliminar-ejercicio/<id>        Eliminar ejercicio (requiere JWT)
```

### Usuario

```
GET    /usuarios/perfil           Obtener perfil (requiere JWT)
PUT    /usuarios/perfil           Actualizar perfil (requiere JWT)
```

---

## Enlaces Importantes

- [Trello del Proyecto](https://trello.com/b/ffoNFdja/invictus) — Seguimiento de tareas y desarrollo
- [Figma - Diseño](https://www.figma.com/site/q7aHgFlNvm4lY0zLYQdFsN/Invictus?node-id=0-1&p=f&t=gPdQYt8PuMMYSPu8-0) — Boceto inicial de Invictus (Hubieron cambios)
- [Guía de estilos](https://canva.link/sjch42fa2s9yfxi)

---

## Autor

Desarrollado por <a href="https://www.linkedin.com/in/izan-alvarez/" style="color: #00ffff" target="_blank">Izan Álvarez Varela</a>.

## Licencia

MIT
