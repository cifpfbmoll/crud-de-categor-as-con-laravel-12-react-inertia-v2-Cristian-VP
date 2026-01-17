import { useState, useEffect, FormEventHandler } from 'react';
import { router } from '@inertiajs/react';
import { Product } from '@/types';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

/**
 * Props para el componente ProductModal.
 */
interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (product: Product) => void;
    mode: 'create' | 'edit';
    product?: Product | null;
    categories?: any[]; // Añadido para recibir categorías
}

/**
 * Estado del formulario para crear/editar productos.
 */
interface FormData {
    name: string;
    description: string;
    price: string;
    stock: string;
    status: Product['status'];
    category_id: string; // Añadido
}

/**
 * Errores de validación del formulario.
 */
interface FormErrors {
    name?: string;
    description?: string;
    price?: string;
    stock?: string;
    status?: string;
    category_id?: string;
}

/**
 * Modal reutilizable para crear y editar productos.
 * Maneja validación del lado del cliente y peticiones al backend.
 *
 * @example
 * // Modo crear
 * <ProductModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   onSuccess={handleCreate}
 *   mode="create"
 * />
 *
 * // Modo editar
 * <ProductModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   onSuccess={handleUpdate}
 *   mode="edit"
 *   product={selectedProduct}
 * />
 */
export default function ProductModal({
    isOpen,
    onClose,
    onSuccess,
    mode,
    product,
    categories = [] // Añadido
}: ProductModalProps) {

    // Estado inicial del formulario
    const initialFormData: FormData = {
        name: '',
        description: '',
        price: '',
        stock: '0',
        status: 'active',
        category_id: '', // Añadido
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>({});
    const [processing, setProcessing] = useState(false);

    // Cargar datos del producto cuando se edita
    useEffect(() => {
        if (mode === 'edit' && product) {
            setFormData({
                name: product.name,
                description: product.description || '',
                price: product.price.toString(),
                stock: product.stock.toString(),
                status: product.status,
                category_id: product.category_id?.toString() || '', // Añadido
            });
        } else {
            setFormData(initialFormData);
        }
        setErrors({});
    }, [mode, product, isOpen]);

    /**
     * Valida el formulario antes de enviar.
     * Retorna true si es válido.
     */
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
        }

        if (!formData.price || parseFloat(formData.price) < 0) {
            newErrors.price = 'El precio debe ser un número positivo';
        }

        if (!formData.stock || parseInt(formData.stock) < 0) {
            newErrors.stock = 'El stock debe ser un número positivo';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Maneja el envío del formulario.
     * Realiza la petición al backend usando router de Inertia que maneja CSRF automáticamente.
     */
    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setProcessing(true);

        const data = {
            name: formData.name,
            description: formData.description || null,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            status: formData.status,
            category_id: formData.category_id ? parseInt(formData.category_id) : null,
        };

        console.log('Enviando datos con router:', { data });

        if (mode === 'create') {
            router.post('/products', data, {
                onSuccess: () => {
                    console.log('Producto creado, recargando...');
                    router.reload({ only: ['products'] });
                    onClose();
                    setFormData(initialFormData);
                },
                onError: (errors: any) => {
                    console.error('Errores del servidor:', errors);
                    setErrors(errors);
                    setProcessing(false);
                },
            });
        } else {
            router.put(`/products/${product?.id}`, data, {
                onSuccess: () => {
                    console.log('Producto actualizado, recargando...');
                    router.reload({ only: ['products'] });
                    onClose();
                    setFormData(initialFormData);
                },
                onError: (errors: any) => {
                    console.error('Errores del servidor:', errors);
                    setErrors(errors);
                    setProcessing(false);
                },
            });
        }
    };

    /**
     * Actualiza un campo del formulario.
     */
    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Limpiar error del campo al modificarlo
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                    {mode === 'create' ? 'Crear Nuevo Producto' : 'Editar Producto'}
                </h2>

                {/* Campo: Nombre */}
                <div className="mb-4">
                    <InputLabel htmlFor="name" value="Nombre *" />
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Nombre del producto"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Campo: Descripción */}
                <div className="mb-4">
                    <InputLabel htmlFor="description" value="Descripción" />
                    <textarea
                        id="description"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Descripción del producto (opcional)"
                        rows={3}
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                {/* Campos: Precio y Stock (en grid) */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <InputLabel htmlFor="price" value="Precio (€) *" />
                        <TextInput
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            className="mt-1 block w-full"
                            value={formData.price}
                            onChange={(e) => handleChange('price', e.target.value)}
                            placeholder="0.00"
                        />
                        <InputError message={errors.price} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="stock" value="Stock *" />
                        <TextInput
                            id="stock"
                            type="number"
                            min="0"
                            className="mt-1 block w-full"
                            value={formData.stock}
                            onChange={(e) => handleChange('stock', e.target.value)}
                            placeholder="0"
                        />
                        <InputError message={errors.stock} className="mt-2" />
                    </div>
                </div>

                {/* Campo: Categoría */}
                <div className="mb-6">
                    <InputLabel htmlFor="category" value="Categoría *" />
                    <select
                        id="category"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={formData.category_id}
                        onChange={(e) => handleChange('category_id', e.target.value)}
                        required
                    >
                        <option value="">Seleccionar una categoría...</option>
                        {categories && categories.map((cat: any) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.category_id} className="mt-2" />
                </div>

                {/* Campo: Estado */}
                <div className="mb-6">
                    <InputLabel htmlFor="status" value="Estado *" />
                    <select
                        id="status"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={formData.status}
                        onChange={(e) => handleChange('status', e.target.value as Product['status'])}
                    >
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                        <option value="discontinued">Descontinuado</option>
                    </select>
                    <InputError message={errors.status} className="mt-2" />
                </div>

                {/* Botones de acción */}
                <div className="flex justify-end space-x-3">
                    <SecondaryButton type="button" onClick={onClose}>
                        Cancelar
                    </SecondaryButton>
                    <PrimaryButton type="submit" disabled={processing}>
                        {processing
                            ? 'Guardando...'
                            : (mode === 'create' ? 'Crear Producto' : 'Guardar Cambios')
                        }
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
