import { useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Category, CategoriesPageProps, PageProps } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import CategoryTable from '@/Components/Categories/CategoryTable';
import CategoryModal from '@/Components/Categories/CategoryModal';
import { Head, router } from '@inertiajs/react';

export default function CategoriesIndex({ categories }: PageProps<CategoriesPageProps>) {
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const handleCreateNew = () => {
        setEditingCategory(null);
        setShowModal(true);
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingCategory(null);
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/categories/${id}`);
            // Recargar la página para actualizar la lista
            router.reload({ only: ['categories'] });
        } catch (error) {
            console.error('Error al eliminar categoría:', error);
        }
    };

    const handleSuccess = () => {
        // Recargar solo los datos de la página actual usando Inertia
        router.reload({ only: ['categories'] });
        handleCloseModal();
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Gestión de Categorías
                    </h2>
                    <PrimaryButton onClick={handleCreateNew}>
                        + Nueva Categoría
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Categorías" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <CategoryTable
                                categories={categories}
                                onDelete={handleDelete}
                                onSuccess={handleSuccess}
                                onEdit={handleEdit}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <CategoryModal
                isOpen={showModal}
                category={editingCategory}
                onClose={handleCloseModal}
                onSuccess={handleSuccess}
            />
        </AuthenticatedLayout>
    );
}

