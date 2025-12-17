# 🛒 LaraCRUD - Laravel 12 + React + Inertia.js + TypeScript

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Inertia.js-2.x-9553E9?style=for-the-badge" alt="Inertia.js">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
</p>

## 📋 Descripción

Aplicación CRUD (Create, Read, Update, Delete) completa desarrollada con el stack moderno de Laravel. Este proyecto sirve como **tutorial y referencia** para desarrolladores Junior que quieren aprender desarrollo full-stack.

### ✨ Características

- ✅ **CRUD completo** de productos
- ✅ **Autenticación** con Laravel Breeze
- ✅ **SPA** (Single Page Application) con Inertia.js
- ✅ **Tipado estático** con TypeScript
- ✅ **UI moderna** con Tailwind CSS
- ✅ **Modales** para crear/editar productos
- ✅ **Validación** en frontend y backend

## 🚀 Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/maximofernandezriera/laracrud.git
cd laracrud

# Instalar dependencias PHP
composer install

# Instalar dependencias Node.js
npm install

# Configurar entorno
cp .env.example .env
php artisan key:generate

# Ejecutar migraciones
php artisan migrate

# Iniciar servidores de desarrollo
php artisan serve &
npm run dev
```

Visita `http://localhost:8000` 🎉

## 📁 Estructura del Proyecto

```
laracrud/
├── app/
│   ├── Http/Controllers/
│   │   └── ProductController.php    # Controlador CRUD
│   └── Models/
│       └── Product.php              # Modelo Eloquent
├── database/
│   └── migrations/
│       └── create_products_table.php
├── resources/js/
│   ├── Components/Products/
│   │   ├── ProductTable.tsx         # Tabla de productos
│   │   └── ProductModal.tsx         # Modal crear/editar
│   ├── Pages/Products/
│   │   └── Index.tsx                # Página principal
│   └── types/
│       └── index.d.ts               # Tipos TypeScript
├── routes/
│   └── web.php                      # Rutas de la aplicación
└── docs/
    ├── GUIA_DESARROLLO.md           # Guía paso a paso
    └── presentacion.html            # Presentación Reveal.js
```

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| [📖 Guía de Desarrollo](docs/GUIA_DESARROLLO.md) | Tutorial paso a paso para crear el proyecto |
| [🎯 Presentación](docs/presentacion.html) | Slides con Reveal.js para presentaciones |

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Laravel | 12.x | Backend/API |
| React | 19.x | Frontend UI |
| Inertia.js | 2.x | Conexión Laravel-React |
| TypeScript | 5.x | Tipado estático |
| Tailwind CSS | 4.x | Estilos |
| Vite | 7.x | Bundler |

## 📝 Comandos Útiles

```bash
# Desarrollo
php artisan serve          # Servidor PHP
npm run dev               # Servidor Vite (hot reload)

# Base de datos
php artisan migrate        # Ejecutar migraciones
php artisan migrate:fresh  # Reiniciar BD

# Producción
npm run build             # Compilar assets
```

## 🧪 Tests

```bash
# Tests PHP con Pest
php artisan test

# Verificar tipos TypeScript
npm run types
```

## 👨‍🏫 Autor

**Máximo Fernández Riera**  
CIFP Francesc de Borja Moll  
[GitHub](https://github.com/maximofernandezriera) | [Twitter](https://twitter.com/maximofernandez)

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.
