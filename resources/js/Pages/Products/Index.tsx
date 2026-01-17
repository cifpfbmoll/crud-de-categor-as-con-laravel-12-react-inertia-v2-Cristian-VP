import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Product, PageProps, ProductsPageProps } from '@/types';
import ProductTable from '@/Components/Products/ProductTable';
import ProductModal from '@/Components/Products/ProductModal';
import PrimaryButton from '@/Components/PrimaryButton';

/**
 * Página principal de Productos.
 * Muestra una tabla con todos los productos y permite operaciones CRUD.
 *
 * @param products - Array de productos recibidos desde el backend via Inertia
 * @param categories - Array de categorías recibidas desde el backend via Inertia
 */
export default function Index({ auth, products, categories }: PageProps<ProductsPageProps>) {
    // Estado local para manejar los productos (permite actualizaciones optimistas)
    const [data, setData] = useState<Product[]>(products);

    // Estados para controlar los modales
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Sincronizar datos cuando cambien los props
    useEffect(() => {
        setData(products);
    }, [products]);

    /**
     * Maneja la eliminación de un producto.
     * Usa router.delete de Inertia para enviar la petición al backend.
     */
    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            router.delete(`/products/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    // Recargar la lista de productos
                    router.reload({ only: ['products'] });
                },
            });
        }
    };

    /**
     * Abre el modal de edición con el producto seleccionado.
     */
    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    /**
     * Callback cuando se cierra el modal de edición.
     * El producto ya está actualizado por router.reload() en el modal.
     */
    const handleProductUpdate = () => {
        setIsEditModalOpen(false);
        setSelectedProduct(null);
    };

    /**
     * Callback cuando se cierra el modal de creación.
     * El producto ya está creado por router.reload() en el modal.
     */
    const handleProductCreate = () => {
        setIsCreateModalOpen(false);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
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
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Tabla de productos */}
                            <ProductTable
                                products={data}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />

                            {/* Mensaje cuando no hay productos */}
                            {data.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    No hay productos registrados. ¡Crea el primero!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para crear producto */}
            <ProductModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={handleProductCreate}
                mode="create"
                categories={categories}
            />

            {/* Modal para editar producto */}
            <ProductModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedProduct(null);
                }}
                onSuccess={handleProductUpdate}
                mode="edit"
                product={selectedProduct}
                categories={categories}
            />
        </AuthenticatedLayout>
    );
}
