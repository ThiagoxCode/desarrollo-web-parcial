# Sistema de Gestión de Películas - API REST

## 📝 Descripción

Sistema de gestión de películas con autenticación de usuarios y roles. Permite administrar un catálogo de películas donde solo los administradores pueden crear nuevos registros.

## 🛠️ Tecnologías

- Node.js
- Express
- MongoDB
- JWT para autenticación
- bcrypt para encriptación
- pnpm (gestor de paquetes)

## ⚙️ Requisitos Previos

1. Node.js (v14 o superior)
2. MongoDB
3. pnpm (`npm install -g pnpm`)

## 🚀 Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/ThiagoxCode/desarrollo-web-parcial.git
pnpm install
```

2. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto y agregar las siguientes líneas:

```
TOKEN=0213fd31-1897-4120-a5b8-7156f75c9ea6
```

3. **Iniciar la aplicación**

```bash
node index.js
```

## 📚 Endpoints

- `POST /api/user/create`: Registrar un nuevo usuario.
- `POST /api/user/login`: Iniciar sesión y obtener un token.
- `POST /api/movie/create`: Crear una nueva película (solo para administradores).
- `GET /api/movie/read`: Obtener lista de películas (solo para usuarios autenticados).

## 🔑 Autenticación y Autorización

- La autenticación se realiza mediante JWT. Al iniciar sesión, se debe enviar el token en el encabezado `Authorization` para acceder a los endpoints protegidos.
