export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

/**
 * Tipo para representar una Categoría del CRUD.
 * Refleja la estructura de la tabla 'categories' en la base de datos.
 */
export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    industry_type: 'manufactura' | 'retail' | 'alimentacion' | 'salud' | 'educacion' | 'servicios';
    color: string | null;
    icon: string | null;
    active: boolean;
    priority: number;
    attributes: Record<string, any> | null;
    created_at: string;
    updated_at: string;
}

/**
 * Tipo para representar un Producto del CRUD.
 * Refleja la estructura de la tabla 'products' en la base de datos.
 */
export interface Product {
    id: number;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    status: 'active' | 'inactive' | 'discontinued';
    category_id: number | null;
    category?: Category;
    created_at: string;
    updated_at: string;
}

/**
 * Props para las páginas con categorías.
 */
export interface CategoriesPageProps extends Record<string, unknown> {
    categories: Category[];
}

/**
 * Props para las páginas con productos.
 */
export interface ProductsPageProps extends Record<string, unknown> {
    products: Product[];
    categories: Category[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
