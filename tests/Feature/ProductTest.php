<?php

use App\Models\Product;
use App\Models\User;

it('shows products index page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/products');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('Products/Index')
        ->has('products')
    );
});

it('can store a product', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson('/products', [
        'name' => 'Test Product',
        'description' => 'Test Description',
        'price' => 29.99,
        'stock' => 10,
        'status' => 'active',
    ]);

    $response->assertStatus(201);
    $response->assertJsonStructure(['message', 'product']);
    $this->assertDatabaseHas('products', ['name' => 'Test Product']);
});

it('cannot store product without name', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson('/products', [
        'name' => '',
        'price' => 29.99,
        'stock' => 10,
        'status' => 'active',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors('name');
});

it('cannot store product with invalid price', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson('/products', [
        'name' => 'Test Product',
        'price' => -10,
        'stock' => 10,
        'status' => 'active',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors('price');
});

it('can update a product', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create(['name' => 'Old Name']);

    $response = $this->actingAs($user)->putJson("/products/{$product->id}", [
        'name' => 'Updated Name',
        'description' => 'Updated Description',
        'price' => 39.99,
        'stock' => 20,
        'status' => 'inactive',
    ]);

    $response->assertStatus(200);
    $this->assertDatabaseHas('products', ['name' => 'Updated Name']);
});

it('can delete a product', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();

    $response = $this->actingAs($user)->deleteJson("/products/{$product->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('products', ['id' => $product->id]);
});

it('redirects to login when not authenticated', function () {
    $response = $this->get('/products');
    $response->assertRedirectToRoute('login');
});

