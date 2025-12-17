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
     * Renderiza la página React con los datos via Inertia.
     */
    public function index(): Response
    {
        return Inertia::render('Products/Index', [
            'products' => Product::orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Almacena un nuevo producto en la base de datos.
     * Valida los datos y devuelve respuesta JSON.
     */
    public function store(Request $request): JsonResponse
    {
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
     * Busca por ID, valida y actualiza.
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
     * Elimina un producto de la base de datos.
     * Usa soft delete si está configurado, sino elimina permanentemente.
     */
    public function destroy(int $id): \Illuminate\Http\RedirectResponse
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->back()->with('success', '¡Producto eliminado exitosamente!');
    }
}
