Aquí tienes el archivo `README.md` completo y final. Este documento ya incluye todos los pasos para configurar, ejecutar y entender tanto el backend como el frontend. Confirma que tu `README.md` tenga todo este contenido para que la persona que evalúe tu proyecto no tenga ninguna duda.

-----

### `README.md`

````markdown
# Aplicación de Gestión de Productos

Este es un proyecto de demostración que implementa una solución completa para la gestión de productos, con un **backend RESTful en Spring Boot** y un **frontend en React**.

El proyecto cumple con los requisitos de la prueba técnica para el cargo de Analista Desarrollador.

---

## 1. Requisitos Previos

Asegúrate de tener instalados los siguientes componentes en tu máquina:

* **Java JDK**: Versión 17 o superior.
* **Maven**: Versión 3.8.1 o superior.
* **MySQL**: Versión 8.0 o superior.
* **Node.js y npm**: Versión 18 o superior.

---

## 2. Configuración y Ejecución

Sigue estos pasos para configurar y ejecutar la aplicación de manera local.

### 2.1. Clonar el Repositorio

Clona este repositorio en tu máquina.

```bash
git clone <URL_del_repositorio>
cd <nombre-del-repositorio>
````

### 2.2. Configuración del Backend

Navega a la carpeta `backend/`.

**Configuración de la Base de Datos**

  * Asegúrate de que el servicio de MySQL esté corriendo.

  * Crea una base de datos llamada `crud_app`.

  * Ejecuta el siguiente script SQL para crear la tabla `producto`:

    ```sql
    -- scripts-bd.sql
    CREATE TABLE producto (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        descripcion VARCHAR(255),
        precio DECIMAL(10, 2) NOT NULL,
        cantidad_en_stock INT NOT NULL
    );
    ```

  * Abre el archivo `application.yml` y verifica que las credenciales de la base de datos coincidan con las tuyas.

**Ejecutar el Backend**

Desde la terminal, en la carpeta `backend/`, ejecuta el siguiente comando:

```bash
./mvnw spring-boot:run
```

El backend se iniciará en `http://localhost:8080`.

### 2.3. Configuración del Frontend

Navega a la carpeta `frontend/`.

```bash
cd ../frontend
```

**Instalar Dependencias**

```bash
npm install
```

**Ejecutar el Frontend**

```bash
npm start
```

El frontend se iniciará en `http://localhost:3000`.

-----

## 3\. Endpoints del Backend

La API REST del backend está documentada con **Swagger** y puedes acceder a su interfaz interactiva en la siguiente URL: `http://localhost:8080/swagger-ui.html`.

Aquí tienes un resumen de los endpoints principales:

  * `GET /api/v1/productos`: Obtiene todos los productos.
  * `GET /api/v1/productos/{id}`: Obtiene un producto por su ID.
  * `POST /api/v1/productos`: Crea un nuevo producto.
  * `PUT /api/v1/productos/{id}`: Actualiza un producto existente.
  * `DELETE /api/v1/productos/{id}`: Elimina un producto por su ID.
  * `GET /api/v1/productos/inventario/valor-total`: Calcula el valor total del inventario.
  * `GET /api/v1/productos/combinaciones?valor={valor}`: Retorna un listado de combinaciones de productos.

-----

## 4\. Funcionalidades del Frontend

La interfaz de usuario implementa las siguientes características:

  * Listado de productos con opciones para ordenar.
  * Formularios para agregar, actualizar y eliminar productos.
  * Funcionalidad para calcular y mostrar el valor total del inventario.
  * Una sección para mostrar combinaciones de productos según un valor numérico ingresado.
  * Uso de APIs externas para mostrar datos sobre gatos y "hechos inútiles".

-----

## 5\. Solución de Problemas Comunes

### Error 500 en la Documentación de Swagger

**Problema:** Al intentar acceder a la documentación en `http://localhost:8080/swagger-ui.html`, el navegador muestra un error `Failed to load API definition` con un `response status 500`. Esto indica un error interno al intentar generar la documentación.

**Causa:** Este problema suele ser causado por una incompatibilidad de versiones entre **Spring Boot** y la dependencia `springdoc-openapi` o por una configuración en conflicto. En este caso, el error se debió a un conflicto de configuración entre la anotación `@RequestMapping` del controlador y una línea `base-path` en el archivo `application.yml`.

**Solución:**

1.  **Limpiar la configuración:** Se debe eliminar la línea de configuración `spring.data.rest.base-path: /api/v1` del archivo `application.yml`.
2.  **Asegurar la versión:** Verificar que la versión de `springdoc-openapi-starter-webmvc-ui` en el `pom.xml` sea compatible con la versión de Spring Boot (por ejemplo, `2.x.x` para Spring Boot 3.x).
3.  **Reconstruir el proyecto:** Ejecutar los comandos `./mvnw clean` y `./mvnw install` para limpiar y reconstruir el proyecto con las dependencias correctas.

<!-- end list -->

```
```
