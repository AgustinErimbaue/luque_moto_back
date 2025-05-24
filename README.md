# 🏍️ Luque Moto (Back) - API RESTful

¡Bienvenido al backend de **Luque Moto**!  
Este proyecto es una API RESTful desarrollada en **Node.js** con **Express** y **Sequelize** para la gestión de usuarios, productos, órdenes, direcciones de envío y autenticación JWT.

---

## 🚀 Tecnologías

- **Node.js** + **Express**
- **Sequelize** (ORM)
- **MySQL**
- **JWT** (Autenticación)
- **bcryptjs** (Hash de contraseñas)
- **dotenv** (Variables de entorno)
- **CORS** (Cross-Origin Resource Sharing)
- **Joi** (Validación)

---

## 📦 Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tuusuario/luque-moto-back.git
   cd luque-moto-back
   ```
2. **Instala las dependencias:**
   ```bash
   npm install
   ```
3. **Configura las variables de entorno:**
   - Renombra el archivo `.env.example` a `.env`
   - Configura tus credenciales de base de datos y JWT en el archivo `.env`
4. **Sincroniza la base de datos:**
   ```bash
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
5. **Inicia el servidor:**
   ```bash
   npm start
   ```

---

## 📚 Endpoints

### Autenticación

- `POST /api/auth/register`: Registra un nuevo usuario.
- `POST /api/auth/login`: Inicia sesión y obtiene un token JWT.

### Usuarios

- `GET /api/users`: Obtiene todos los usuarios (protegido).
- `GET /api/users/:id`: Obtiene un usuario por ID (protegido).
- `PUT /api/users/:id`: Actualiza un usuario por ID (protegido).
- `DELETE /api/users/:id`: Elimina un usuario por ID (protegido).

### Productos

- `GET /api/products`: Obtiene todos los productos.
- `GET /api/products/:id`: Obtiene un producto por ID.
- `POST /api/products`: Crea un nuevo producto (protegido).
- `PUT /api/products/:id`: Actualiza un producto por ID (protegido).
- `DELETE /api/products/:id`: Elimina un producto por ID (protegido).

### Órdenes

- `GET /api/orders`: Obtiene todas las órdenes (protegido).
- `GET /api/orders/:id`: Obtiene una orden por ID (protegido).
- `POST /api/orders`: Crea una nueva orden (protegido).
- `PUT /api/orders/:id`: Actualiza una orden por ID (protegido).
- `DELETE /api/orders/:id`: Elimina una orden por ID (protegido).

### Direcciones de Envío

- `GET /api/addresses`: Obtiene todas las direcciones (protegido).
- `GET /api/addresses/:id`: Obtiene una dirección por ID (protegido).
- `POST /api/addresses`: Crea una nueva dirección (protegido).
- `PUT /api/addresses/:id`: Actualiza una dirección por ID (protegido).
- `DELETE /api/addresses/:id`: Elimina una dirección por ID (protegido).

---

## 🛠️ Desarrollo

Para contribuir al desarrollo de esta API:

1. Asegúrate de tener instalado **Node.js** y **MySQL**.
2. Clona el repositorio y navega a la carpeta del proyecto.
3. Instala las dependencias con `npm install`.
4. Configura tu base de datos en el archivo `.env`.
5. Inicia el servidor con `npm start`.
6. Realiza tus cambios y pruebas localmente.
7. Envía un pull request con una descripción clara de tus cambios.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

¡Gracias por usar **Luque Moto**! Esperamos que esta API te sea de gran utilidad. 🚀