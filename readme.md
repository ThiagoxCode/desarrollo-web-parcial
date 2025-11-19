# Sistema de Gestión de Clientes y Mensajes - API REST

## 📝 Descripción

Sistema de gestión de clientes con envío de mensajes programados usando plantillas. Incluye autenticación de usuarios con roles (administrador y empleado). Los administradores pueden gestionar usuarios, clientes, plantillas y mensajes.

## 🛠️ Tecnologías

- Node.js
- Express
- MongoDB
- JWT para autenticación
- bcrypt para encriptación
- moment para manejo de fechas
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

### Usuarios
- `POST /api/user/create`: Crear un nuevo usuario (requiere token).
- `POST /api/user/login`: Iniciar sesión y obtener un token.
- `GET /api/user/read`: Obtener lista de usuarios (requiere token).
- `PUT /api/user/update`: Actualizar un usuario (requiere token).
- `DELETE /api/user/delete`: Eliminar un usuario (requiere token).

### Clientes
- `POST /api/customer/create`: Crear un nuevo cliente (requiere token).
- `GET /api/customer/read`: Obtener lista de clientes (requiere token).
- `PUT /api/customer/update`: Actualizar un cliente (requiere token).
- `DELETE /api/customer/delete`: Eliminar un cliente (requiere token).

### Plantillas
- `POST /api/template/create`: Crear una nueva plantilla (requiere token).
- `GET /api/template/read`: Obtener lista de plantillas (requiere token).
- `PUT /api/template/update`: Actualizar una plantilla (requiere token).
- `DELETE /api/template/delete`: Eliminar una plantilla (requiere token).

### Mensajes
- `POST /api/message/create`: Crear un nuevo mensaje programado (requiere token).
- `GET /api/message/read`: Obtener lista de mensajes (requiere token).
- `PUT /api/message/update`: Actualizar un mensaje (requiere token).
- `DELETE /api/message/delete`: Eliminar un mensaje (requiere token).

## 🔑 Autenticación y Autorización

- La autenticación se realiza mediante JWT. Al iniciar sesión, se debe enviar el token en el encabezado `Authorization` con el prefijo "Bearer " para acceder a los endpoints protegidos.
- Los tokens expiran en 15 minutos.
- Los usuarios tienen roles: 'administrator' o 'employee'. Los administradores tienen acceso completo.
