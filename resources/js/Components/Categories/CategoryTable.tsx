import { useState } from 'react';
import { Category } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';

interface CategoryTableProps {
    categories: Category[];
    onDelete: (id: number) => void;
    onSuccess: () => void;
    onEdit: (category: Category) => void;
}

export default function CategoryTable({ categories, onDelete, onSuccess, onEdit }: CategoryTableProps) {
    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
            onDelete(id);
        }
    };

    const getIndustryTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            manufactura: '🏭 Manufactura',
            retail: '🏪 Retail',
            alimentacion: '🍔 Alimentación',
            salud: '🏥 Salud',
            educacion: '🎓 Educación',
            servicios: '🏢 Servicios'
        };
        return labels[type] || type;
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs font-semibold text-gray-800 bg-gray-100">
                    <tr>
                        <th className="px-6 py-3">Nombre</th>
                        <th className="px-6 py-3">Tipo de Industria</th>
                        <th className="px-6 py-3">Descripción</th>
                        <th className="px-6 py-3">Estado</th>
                        <th className="px-6 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">
                                <div className="flex items-center gap-2">
                                    {category.icon && <span className="text-lg">{category.icon}</span>}
                                    <span>{category.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {getIndustryTypeLabel(category.industry_type)}
                            </td>
                            <td className="px-6 py-4">
                                <p className="line-clamp-2">{category.description || '-'}</p>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    category.active
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {category.active ? 'Activa' : 'Inactiva'}
                                </span>
                            </td>
                            <td className="px-6 py-4 flex gap-2">
                                <PrimaryButton onClick={() => onEdit(category)}>
                                    Editar
                                </PrimaryButton>
                                <DangerButton onClick={() => handleDelete(category.id)}>
                                    Eliminar
                                </DangerButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {categories.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No hay categorías registradas aún.
                </div>
            )}
        </div>
    );
}

