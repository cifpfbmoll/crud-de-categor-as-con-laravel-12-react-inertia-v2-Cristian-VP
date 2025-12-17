# Guía de Desarrollo: CRUD con Laravel 12 + React + Inertia.js + TypeScript

## 📚 Índice

1. [Introducción](#introducción)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Paso 1: Configuración del Entorno](#paso-1-configuración-del-entorno)
4. [Paso 2: Estructura de Base de Datos y Modelos](#paso-2-estructura-de-base-de-datos-y-modelos)
5. [Paso 3: Controladores con Inertia](#paso-3-controladores-con-inertia)
6. [Paso 4: Rutas](#paso-4-rutas)
7. [Paso 5: Tipos TypeScript](#paso-5-tipos-typescript)
8. [Paso 6: Componentes React](#paso-6-componentes-react)
9. [Paso 7: Integración Final](#paso-7-integración-final)
10. [Próximos Pasos](#próximos-pasos)

---

## Introducción

Esta guía te enseñará a crear una aplicación CRUD (Create, Read, Update, Delete) completa utilizando el stack moderno de Laravel con React. Es ideal para desarrolladores Junior que quieren aprender desarrollo full-stack.

### ¿Qué vas a construir?

Una aplicación de gestión de productos con:
- Listado de productos en tabla
- Crear nuevos productos
- Editar productos existentes
- Eliminar productos
- Autenticación de usuarios

---

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Laravel** | 12.x | Backend/API |
| **React** | 19.x | Frontend UI |
| **Inertia.js** | 2.x | Conecta Laravel con React (SPA sin API) |
| **TypeScript** | 5.x | Tipado estático para JavaScript |
| **Tailwind CSS** | 4.x | Estilos utilitarios |
| **Vite** | 7.x | Bundler de desarrollo |

### ¿Qué es Inertia.js?

Inertia.js es el "pegamento" entre Laravel y React. Te permite:
- Crear SPAs sin necesidad de API REST separada
- Usar el routing de Laravel directamente
- Compartir datos del backend al frontend de forma simple

---

## Paso 1: Configuración del Entorno

### 1.1 Crear proyecto Laravel

```bash
# Crear nuevo proyecto Laravel
composer create-project laravel/laravel mi-proyecto

# Entrar al directorio
cd mi-proyecto
```

### 1.2 Instalar Laravel Breeze con React

```bash
# Instalar Breeze (scaffolding de autenticación)
composer require laravel/breeze --dev

# Instalar con React + TypeScript
php artisan breeze:install react --typescript --pest
```

### 1.3 Instalar dependencias NPM

```bash
# Instalar dependencias de Node.js
npm install
```

### 1.4 Configurar base de datos

Edita el archivo `.env`:

```env
DB_CONNECTION=sqlite
# Para SQLite, Laravel crea automáticamente database/database.sqlite
```

### 1.5 Ejecutar migraciones

```bash
php artisan migrate
```

### 1.6 Iniciar servidor de desarrollo

```bash
# En una terminal
php artisan serve

# En otra terminal
npm run dev
```

Visita `http://localhost:8000` para ver tu aplicación.

---

## Paso 2: Estructura de Base de Datos y Modelos

### 2.1 Crear Modelo, Migración y Controlador

Laravel nos permite crear todo con un solo comando:

```bash
php artisan make:model Product -mcr
```

**Flags explicados:**
- `-m`: Crea la migración
- `-c`: Crea el controlador
- `-r`: Crea controlador con métodos resource (CRUD)

### 2.2 Definir la migración

Edita `database/migrations/xxxx_create_products_table.php`:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();                           // ID autoincremental
            $table->string('name');                  // Nombre del producto
            $table->text('description')->nullable(); // Descripción (opcional)
            $table->decimal('price', 10, 2);         // Precio con 2 decimales
            $table->integer('stock')->default(0);    // Stock disponible
            $table->enum('status', [                 // Estado del producto
                'active', 
                'inactive', 
                'discontinued'
            ])->default('active');
            $table->timestamps();                    // created_at y updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
```

### 2.3 Configurar el Modelo

Edita `app/Models/Product.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * Campos que pueden ser asignados masivamente.
     * Esto protege contra vulnerabilidades de asignación masiva.
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'status',
    ];

    /**
     * Conversiones de tipos automáticas.
     * Laravel convierte estos campos al tipo especificado.
     */
    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
    ];
}
```

### 2.4 Ejecutar la migración

```bash
php artisan migrate
```

---

## Paso 3: Controladores con Inertia

### 3.1 Conceptos clave

En Inertia, los controladores:
1. **Renderizan páginas React** en lugar de vistas Blade
2. **Pasan datos como props** directamente a los componentes

### 3.2 Implementar ProductController

Edita `app/Http/Controllers/ProductController.php`:

```php
<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Muestra el listado de productos.
     * Inertia::render() envía datos a un componente React.
     */
    public function index(): Response
    {
        return Inertia::render('Products/Index', [
            // 'products' estará disponible como prop en React
            'products' => Product::orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Almacena un nuevo producto.
     * Retorna JSON para manejar la respuesta en el frontend.
     */
    public function store(Request $request): JsonResponse
    {
        // Validación de datos
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'status' => 'required|in:active,inactive,discontinued',
        ]);

        $product = Product::create($validated);

        return response()->json([
            'message' => '¡Producto creado exitosamente!',
            'product' => $product,
        ], 201);
    }

    /**
     * Actualiza un producto existente.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'status' => 'required|in:active,inactive,discontinued',
        ]);

        $product = Product::findOrFail($id);
        $product->update($validated);

        return response()->json([
            'message' => '¡Producto actualizado exitosamente!',
            'product' => $product,
        ], 200);
    }

    /**
     * Elimina un producto.
     * Usa redirect para que Inertia recargue la página.
     */
    public function destroy(int $id): \Illuminate\Http\RedirectResponse
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->back()->with('success', '¡Producto eliminado!');
    }
}
```

---

## Paso 4: Rutas

### 4.1 Definir rutas en web.php

Edita `routes/web.php`:

```php
<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Página de inicio
Route::get('/', function () {
    return Inertia::render('Welcome');
});

// Dashboard (requiere autenticación)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Rutas de perfil
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ============================================
// RUTAS CRUD PARA PRODUCTOS
// Todas requieren autenticación y verificación
// ============================================
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/products', [ProductController::class, 'index'])
        ->name('products.index');
    
    Route::post('/products', [ProductController::class, 'store'])
        ->name('products.store');
    
    Route::put('/products/{id}', [ProductController::class, 'update'])
        ->name('products.update');
    
    Route::delete('/products/{id}', [ProductController::class, 'destroy'])
        ->name('products.destroy');
});

require __DIR__.'/auth.php';
```

---

## Paso 5: Tipos TypeScript

### 5.1 ¿Por qué TypeScript?

TypeScript añade tipado estático a JavaScript:
- **Detecta errores en tiempo de desarrollo**
- **Autocompletado inteligente** en el IDE
- **Documentación integrada** en el código

### 5.2 Definir tipos para Product

Edita `resources/js/types/index.d.ts`:

```typescript
export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

/**
 * Tipo para representar un Producto.
 * Refleja exactamente la estructura de la tabla 'products'.
 */
export interface Product {
    id: number;
    name: string;
    description: string | null;  // Puede ser null
    price: number;
    stock: number;
    status: 'active' | 'inactive' | 'discontinued';  // Union type
    created_at: string;
    updated_at: string;
}

/**
 * Props para páginas que reciben productos.
 */
export interface ProductsPageProps extends Record<string, unknown> {
    products: Product[];
}

/**
 * Props genéricas para todas las páginas.
 * Incluye información de autenticación.
 */
export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
```

---

## Paso 6: Componentes React

### 6.1 Estructura de archivos

```
resources/js/
├── Components/
│   └── Products/
│       ├── ProductTable.tsx    # Tabla de productos
│       └── ProductModal.tsx    # Modal crear/editar
├── Pages/
│   └── Products/
│       └── Index.tsx           # Página principal
└── types/
    └── index.d.ts              # Definiciones de tipos
```

### 6.2 Página principal (Index.tsx)

```tsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Product, PageProps, ProductsPageProps } from '@/types';
import ProductTable from '@/Components/Products/ProductTable';
import ProductModal from '@/Components/Products/ProductModal';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, products }: PageProps<ProductsPageProps>) {
    // Estado local para manejo optimista
    const [data, setData] = useState<Product[]>(products);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Sincronizar cuando cambien los props
    useEffect(() => {
        setData(products);
    }, [products]);

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            router.delete(`/products/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setData(prev => prev.filter(p => p.id !== id));
                },
            });
        }
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">
                        Gestión de Productos
                    </h2>
                    <PrimaryButton onClick={() => setIsCreateModalOpen(true)}>
                        + Nuevo Producto
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Productos" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <ProductTable 
                            products={data}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>

            <ProductModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={(product) => setData(prev => [product, ...prev])}
                mode="create"
            />

            <ProductModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={(updated) => 
                    setData(prev => prev.map(p => 
                        p.id === updated.id ? updated : p
                    ))
                }
                mode="edit"
                product={selectedProduct}
            />
        </AuthenticatedLayout>
    );
}
```

### 6.3 Conceptos clave de React usados

| Concepto | Uso en el código |
|----------|------------------|
| **useState** | Manejo de estado local |
| **useEffect** | Sincronización de datos |
| **Props tipadas** | `PageProps<ProductsPageProps>` |
| **Componentes funcionales** | Todo el código usa funciones |
| **Eventos** | `onClick`, `onClose` |

---

## Paso 7: Integración Final

### 7.1 Añadir navegación

En `resources/js/Layouts/AuthenticatedLayout.tsx`, añade el enlace:

```tsx
<NavLink
    href={route('products.index')}
    active={route().current('products.index')}
>
    Productos
</NavLink>
```

### 7.2 Compilar para producción

```bash
npm run build
```

### 7.3 Verificar rutas

```bash
php artisan route:list
```

---

## Próximos Pasos

### Mejoras sugeridas:

1. **Paginación**: Implementar paginación en la tabla
2. **Búsqueda**: Añadir filtro de búsqueda
3. **Ordenación**: Permitir ordenar por columnas
4. **Validación en tiempo real**: Usar React Hook Form
5. **Tests**: Escribir tests con Pest (PHP) y Jest (TS)

### Recursos adicionales:

- [Documentación Laravel](https://laravel.com/docs)
- [Documentación Inertia.js](https://inertiajs.com/)
- [Documentación React](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🎉 ¡Felicidades!

Has completado tu primer CRUD con Laravel + React + Inertia.js + TypeScript.

**Autor**: Máximo Fernández Riera  
**Fecha**: Diciembre 2024  
**Licencia**: MIT
