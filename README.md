# Study Tracker #

Creación de temas de auto-estudio, registro de las actividades ha realizar para culminar el estudio y registro del tiempo dedicado diario.

# 📦 Proyecto Fullstack (Express + React)

Este repositorio contiene dos proyectos:

- **Backend**: API construida con [Express.js](https://expressjs.com/).
- **Frontend**: Aplicación web construida con [React](https://react.dev/).
- **Base de datos**: MongoDB [MongoDb](https://www.mongodb.com/).

## 📂 Estructura del proyecto

```
/backend   → API en Express.js
/frontend  → Aplicación en React
```

---

## ⚙️ Requisitos previos

Antes de iniciar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

---

## 🛠️ Configuración de variables de entorno

Cada proyecto tiene su propio archivo `.env` que **debes crear manualmente** en la raíz de cada carpeta.

### 📌 Backend (`/backend/.env`)
Ejemplo de configuración:
```env
PORT=5000
DB_URI=mongodb://localhost:27017/mi_base_de_datos
```

---

## 🚀 Instalación

Clona el repositorio y entra en cada carpeta para instalar dependencias.

### 1️⃣ Backend (Express.js)
```bash
cd backend
npm install
```

### 2️⃣ Frontend (React)
```bash
cd frontend
npm install
```

---

## ▶️ Ejecución en desarrollo

### Backend
```bash
cd backend
npm run dev
```
El backend se iniciará en el puerto configurado en `.env` (por defecto `5000`).

### Frontend
```bash
cd frontend
npm run dev
```
El frontend se iniciará en `http://localhost:5173`.

---

## 🛠️ Tecnologías utilizadas

**Backend**: 🟢 Node.js | 🚂 Express.js | 🗄️ MongoDB  
**Frontend**: ⚛️ React | 🎨 CSS | 🔄 Axios
