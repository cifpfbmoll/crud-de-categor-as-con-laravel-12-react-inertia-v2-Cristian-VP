
Vídeo demo

Para ver una demo en vídeo de la aplicación (grabación), utiliza el siguiente enlace:

[Link al vídeo demo](https://drive.google.com/file/d/1JILT7pwQmkpLwwU62zCL0mXhrrinqHqF/view?usp=sharing)

Laracrud es una aplicación de ejemplo construida con Laravel en el backend y Inertia en el frontend (React/TSX). Está pensada como una pequeña tienda/demo que gestiona categorías y productos y que incluye autenticación de usuarios.

Arquitectura general

- Backend: Laravel (PHP), controladores ubicados en `app/Http/Controllers`, modelos en `app/Models` y migraciones en `database/migrations`.
- Frontend: Inertia.js con componentes React/TypeScript (archivos en `resources/js/` y subcarpetas `Components`, `Pages`, etc.).
- Persistencia: base de datos SQLite por defecto para desarrollo en este proyecto (archivo en `database/database.sqlite`).

Modelos y relaciones

- Category (`app/Models/Category.php`)
  - Campos relevantes (se definen en la migración `database/migrations/2025_01_15_000001_create_categories_table.php`):
    - `id`: entero autoincremental
    - `name` (string, 100) — único
    - `slug` (string, 120) — único
    - `description` (text, nullable)
    - `industry_type` (enum) — ver valores abajo
    - `color` (string, 7, nullable) — pensado para almacenar un color hex (por ejemplo `#ff0000`)
    - `icon` (string, 50, nullable) — nombre o clave de icono
    - `active` (boolean) — indica si la categoría está activa
    - `priority` (integer) — valor para ordenar/priorizar categorías
    - `attributes` (json, nullable) — campos extra dependientes de la categoría
    - `timestamps` (`created_at`, `updated_at`)
  - Relación con productos: una categoría tiene muchos productos (`hasMany`).

- Product (`app/Models/Product.php`)
  - Campos habituales: `name`, `description`, `price` (decimal 2), `stock` (integer), `status` (por ejemplo `active`/`inactive`), `category_id` (clave foránea hacia `categories`), timestamps.
  - Relación: un producto pertenece a una categoría (`belongsTo`).

Tipos de categoría (`industry_type`)

La migración define los siguientes valores permitidos para `industry_type`:
- `manufactura`
- `retail`
- `alimentacion`
- `salud`
- `educacion`
- `servicios`

Estos valores sirven para clasificar la categoría según el sector/industria al que pertenecen los productos. En la UI se usan para filtrar o mostrar iconografía/colores relacionados con cada industria.

Significado de `priority`

- `priority` es un entero (por defecto 0) usado para ordenar o priorizar categorías en listados y menús.
- Convención habitual: valores más altos representan mayor prioridad y aparecen antes en los listados; valores menores (o negativos) bajan la prioridad.
- En ausencia de documentación específica en el código, la app espera que `priority` se use para controlar el orden visual de las categorías (por ejemplo, ordenar por `priority` DESC y luego por `name`).

Atributos extra (`attributes`)

- Campo JSON opcional para almacenar metadatos de la categoría (por ejemplo, atributos dinámicos que definan campos específicos para productos de esa categoría). Se serializa/convierte automáticamente a array por el cast en el modelo.

Autenticación y autorizaciones

- La aplicación incluye el sistema de autenticación integrado mediante controladores en `app/Http/Controllers/Auth` y rutas en `routes/auth.php`.
- El flujo de login/registro/recuperación de contraseña está implementado por los controladores `RegisteredUserController`, `AuthenticatedSessionController`, `PasswordResetLinkController`, etc. Estos controladores renderizan vistas a través de Inertia (por ejemplo `Inertia::render('Auth/Login')`).
- Conclusión práctica: la autenticación está implementada en la aplicación (no es solo «por defecto invisible»). Ha sido añadida mediante el scaffold de autenticación que integra Laravel con Inertia en el frontend.

Credenciales de prueba

Durante el seeding de desarrollo se crea un usuario de prueba con los siguientes datos (ver `database/seeders/DatabaseSeeder.php`):

- Email: `test@example.com`
- Contraseña: `password`

Puedes usar esas credenciales para acceder y probar las funcionalidades de la aplicación en un entorno de desarrollo.

Notas sobre CSRF e Inertia

- Las peticiones que mutan datos (POST/PUT/DELETE) requieren un token CSRF válido. En el caso de formularios Inertia, el token normalmente se inyecta automáticamente en la página (o se envía a través de cabeceras). Un error frecuente al probar la app manualmente es el `CSRF token mismatch.` — indica que la solicitud no incluyó el token o la sesión no coincide.
