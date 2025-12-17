# 📝 Práctica: CRUD de Categorías con Laravel + React + Inertia.js

## 🎯 Objetivos de Aprendizaje

Al completar esta práctica, el alumno será capaz de:

1. **Comprender** la arquitectura de una aplicación full-stack moderna
2. **Implementar** operaciones CRUD completas con Laravel y React
3. **Utilizar** Inertia.js como capa de conexión frontend-backend
4. **Aplicar** TypeScript para tipado estático en React
5. **Gestionar** relaciones entre modelos en Eloquent
6. **Diseñar** interfaces de usuario con Tailwind CSS

---

## 📋 Contexto

Se te proporciona un proyecto base de gestión de productos desarrollado con:

- **Backend**: Laravel 12 + PHP 8.2
- **Frontend**: React 19 + TypeScript 5
- **Integración**: Inertia.js 2
- **Estilos**: Tailwind CSS 4
- **Autenticación**: Laravel Breeze

**Repositorio base**: https://github.com/maximofernandezriera/laracrud

El proyecto actual incluye:
- ✅ Sistema de autenticación completo
- ✅ CRUD básico de Productos
- ✅ Tabla de listado con acciones
- ✅ Modales para crear/editar

**Tu tarea** es extender este proyecto añadiendo el CRUD de Categorías y relacionándolo con Productos.

---

## 🚀 Requisitos de la Práctica

### Paso 0: Configuración Inicial

```bash
# 1. Hacer fork del repositorio base en GitHub
# 2. Clonar tu fork
git clone https://github.com/TU_USUARIO/laracrud.git
cd laracrud

# 3. Instalar dependencias
composer install
npm install

# 4. Configurar entorno
cp .env.example .env
php artisan key:generate
php artisan migrate

# 5. Verificar funcionamiento
php artisan serve
npm run dev
```

Accede a `http://localhost:8000`, regístrate y comprueba que el CRUD de Productos funciona correctamente.

---

### Tarea 1: CRUD de Categorías

Implementa un CRUD completo para **Categorías** de productos, siguiendo la misma arquitectura que el CRUD de Productos existente.

#### 1.1 Especificaciones de la tabla `categories`

| Campo | Tipo | Restricciones |
|-------|------|---------------|
| id | bigint | PK, autoincrement |
| name | string(100) | required, unique |
| description | text | nullable |
| color | string(7) | nullable (código hex, ej: #FF5733) |
| active | boolean | default: true |
| created_at | timestamp | auto |
| updated_at | timestamp | auto |

#### 1.2 Subtareas - Checklist

- [ ] **Migración**: Crear archivo en `database/migrations/`
- [ ] **Modelo**: Crear `app/Models/Category.php` con `$fillable` y `$casts`
- [ ] **Controlador**: Crear `app/Http/Controllers/CategoryController.php` con métodos:
  - `index()` - Listar categorías con Inertia
  - `store()` - Crear categoría (validación + JSON response)
  - `update()` - Actualizar categoría (validación + JSON response)
  - `destroy()` - Eliminar categoría (redirect)
- [ ] **Rutas**: Añadir en `routes/web.php` dentro del grupo autenticado

#### 1.3 Subtareas - Checklist

- [ ] **Tipos TypeScript**: Añadir interface `Category` en `resources/js/types/index.d.ts`
- [ ] **Página**: Crear `resources/js/Pages/Categories/Index.tsx`
- [ ] **Componentes**: Crear en `resources/js/Components/Categories/`:
  - `CategoryTable.tsx` - Tabla con listado y acciones
  - `CategoryModal.tsx` - Modal para crear/editar
- [ ] **Navegación**: Añadir enlace "Categorías" en `AuthenticatedLayout.tsx`

---

### Tarea 2: Relación Producto-Categoría. Tarea de investigación.

Implementa una relación **Many-to-One** (muchos productos pertenecen a una categoría).

#### 2.1 Backend - Checklist

- [ ] **Migración**: Crear migración para añadir columna `category_id` a tabla `products`
  ```php
  $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
  ```
- [ ] **Modelo Product**: Añadir relación `belongsTo`
  ```php
  public function category(): BelongsTo
  {
      return $this->belongsTo(Category::class);
  }
  ```
- [ ] **Modelo Category**: Añadir relación `hasMany`
  ```php
  public function products(): HasMany
  {
      return $this->hasMany(Product::class);
  }
  ```
- [ ] **Controlador Product**: Modificar `index()` para incluir categorías
  ```php
  'products' => Product::with('category')->orderBy('created_at', 'desc')->get(),
  'categories' => Category::where('active', true)->get(),
  ```

#### 2.2 Subtareas - Checklist

- [ ] **Tipos TypeScript**: Actualizar interface `Product` para incluir `category_id` y `category`
- [ ] **Formulario Producto**: Añadir selector de categoría en `ProductModal.tsx`
- [ ] **Tabla Productos**: Mostrar nombre de categoría en `ProductTable.tsx`

---

### Tarea 3: Documentación y Entrega

#### 3.1 README.md
Actualiza el archivo `README.md` del proyecto con:
- [ ] **Instalación**: Instrucciones claras para clonar y configurar el proyecto
- [ ] **Uso**: Cómo ejecutar la aplicación y acceder a las funcionalidades
- [ ] **Características**: Listado de funcionalidades implementadas (CRUD Categorías, relación con Productos)
- [ ] **Capturas de pantalla**: Imágenes del CRUD de categorías funcionando

> 💡 **Nota sobre IA**: Podéis utilizar herramientas de IA para generar la documentación técnica, pero **debéis hacerla vuestra**. Revisad, adaptad y personalizad el contenido para que refleje vuestro trabajo real.

#### 3.2 Resumen Reflexivo
Crea un archivo `docs/REFLEXION.md` con un resumen de **máximo 1 página** que incluya:
- [ ] **Proceso de desarrollo**: ¿Cómo abordaste las tareas? ¿Qué pasos seguiste?
- [ ] **Dificultades encontradas**: ¿Qué problemas surgieron y cómo los resolviste?
- [ ] **Aprendizajes**: ¿Qué has aprendido con esta práctica?
- [ ] **Opinión personal**: ¿Qué te ha parecido trabajar con este stack tecnológico?

> ⚠️ **Importante**: Este resumen debe estar **escrito con tus propias palabras**. No se recomienda el uso de IA para esta parte. Se valorará la autenticidad y la reflexión personal.

#### 3.3 Vídeo Demostrativo (Obligatorio)
Graba un vídeo de **3-5 minutos** mostrando:
- [ ] **CRUD de Categorías**: Crear, listar, editar y eliminar una categoría
- [ ] **Relación Producto-Categoría**: Asignar categoría a un producto y mostrarla en la tabla
- [ ] **Explicación breve**: Comenta brevemente el código mientras demuestras las funcionalidades

**Requisitos del vídeo:**
- Duración: 3-5 minutos
- Debe mostrarse la aplicación funcionando en el navegador
- Audio claro explicando lo que se muestra
- Subir a YouTube (oculto o público) o similar y añadir enlace en el README

> 🎥 **Sin vídeo = práctica no evaluable**. El vídeo es obligatorio para la evaluación de la práctica.

---

## 📅 Fecha de entrega

- 16 de enero del 2026 a las 23:59 h.

---

## 🆘 Recursos de Ayuda

### Documentación Oficial
- [Laravel 12 Docs](https://laravel.com/docs/12.x)
- [Inertia.js Docs](https://inertiajs.com/)
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tutoriales del Proyecto
- [Guía de Desarrollo](./GUIA_DESARROLLO.md) - Tutorial paso a paso
- [Presentación](https://maximofernandezriera.github.io/laracrud/) - Slides explicativas

### Código de Referencia
Estudia el CRUD de Productos existente:
- `app/Http/Controllers/ProductController.php`
- `resources/js/Pages/Products/Index.tsx`
- `resources/js/Components/Products/ProductTable.tsx`
- `resources/js/Components/Products/ProductModal.tsx`
