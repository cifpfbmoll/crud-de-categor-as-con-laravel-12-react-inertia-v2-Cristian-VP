import { Product } from '@/types';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

/**
 * Props para el componente ProductTable.
 */
interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

/**
 * Componente para mostrar la tabla de productos.
 * Renderiza cada producto con sus acciones de editar y eliminar.
 * 
 * @example
 * <ProductTable 
 *   products={productos} 
 *   onEdit={handleEdit} 
 *   onDelete={handleDelete} 
 * />
 */
export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
    /**
     * Formatea un número como precio en euros.
     */
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
        }).format(price);
    };

    /**
     * Retorna las clases CSS para el badge de estado.
     */
    const getStatusClasses = (status: Product['status']): string => {
        const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full';
        const statusClasses = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-yellow-100 text-yellow-800',
            discontinued: 'bg-red-100 text-red-800',
        };
        return `${baseClasses} ${statusClasses[status]}`;
    };

    /**
     * Traduce el estado al español.
     */
    const translateStatus = (status: Product['status']): string => {
        const translations = {
            active: 'Activo',
            inactive: 'Inactivo',
            discontinued: 'Descontinuado',
        };
        return translations[status];
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Descripción
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Precio
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {product.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {product.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                {product.description || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatPrice(product.price)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {product.stock}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={getStatusClasses(product.status)}>
                                    {translateStatus(product.status)}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                <SecondaryButton onClick={() => onEdit(product)}>
                                    Editar
                                </SecondaryButton>
                                <DangerButton onClick={() => onDelete(product.id)}>
                                    Eliminar
                                </DangerButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
