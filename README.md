
# **Librería API**

## **Descripción**
Desafío técnico: Creé una API RESTful para gestionar libros, autores y editoriales en una librería. Este proyecto está creado con NestJS y TypeORM, y proporciona operaciones CRUD con validation, gestión de errores y documentación Swagger acorde a lo pedido para el desafío.

---

## **Tecnologías usadas**

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Database**: SQLite
- **ORM**: [TypeORM](https://typeorm.io/)
- **Languaje**: TypeScript
- **Testing Framework**: [Jest](https://jestjs.io/)
- **Documentacion API**: [Swagger](https://swagger.io/)
- **Validation**: [class-validator](https://github.com/typestack/class-validator)

---

## **Características**

- Manejo de **Libros**, **Autores**, y **Editoriales**.
- RESTful API:
  - **POST**: Crea nuevas entidades.
  - **GET**: Recupera todas las entidades o por ID.
  - **PUT**: Actualiza entidades existentes.
  - **DELETE**: Elimina entidades.
- Manejo de errores con HTTP status codes.
- Validation:
  - Formato CUIT/DNI para editoriales y autores.
  - Fecha de realización aceptada y normalizada ISO 8601.
  - Se asegura que los autores y editoriales existan al crear un libro.
- Documentación API con Swagger.
- Unit testing con Jest.

---

## **Introducción**

### **1. Requisitos previos**

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [SQLite](https://sqlite.org/)

---

### **2. Instalación**

 ```npm install```

---

### **3. Setup de la base de datos**

 La base de datos se inicializa al iniciar el proyecto con ```npm run start ```

---

### **4. Correr la aplicación**

Correr la aplicación:

```npm run start```

---

### **5. Documentación Swagger API**

El API Swagger se abre en: 


[http://localhost:3000/api](https://)


---

### **6. Correr Tests**

```npm run test```


---

## **Comandos utilizados**

| Comando | Descripción |
|---------------------------------|---------------------------------------|
| \`npm run start\` | Iniciar la aplicación |
| \`npm run test\` | Correr todos los tests |
| \`npm run format\` | Formateo del código con Prettier |

## **Documentación Consultada**

```NestJS```
- [Documentación NestJS](https://docs.nestjs.com)
- [Tipos y Parámetros](https://docs.nestjs.com/openapi/types-and-parameters)

```class-validator```
- [Repositorio de class-validator](https://github.com/typestack/class-validator)

```class-transformer```
- [Repositorio de class-transformer](https://github.com/typestack/class-transformer)

```Swagger```
- [Docs Swagger/OpenAPI](https://swagger.io/specification/)
- [Integración NestJS Swagger](https://docs.nestjs.com/openapi/introduction)
- [Ejemplo Swagger](https://petstore.swagger.io/#/)

```SQLite```
- [Documentación SQLite](https://www.npmjs.com/package/sqlite3)

```TypeORM```
- [Documentación TypeORM](https://typeorm.io/)
- [Documentación FindOperator](https://typeorm.io/find-options)

```Jest Testing```
- [Documentación Jest](https://jestjs.io/docs/getting-started)

```date-fns```
- [date-fns](https://date-fns.org/)
- [parse](https://date-fns.org/v2.29.3/docs/parse)
- [isValid](https://date-fns.org/v2.29.3/docs/isValid)

```HTTP Exception Handling in NestJS```
- [HTTP Status Code](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
- [Excepciones customizables](https://docs.nestjs.com/exception-filters#custom-exceptions)