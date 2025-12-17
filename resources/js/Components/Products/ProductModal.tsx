import { useState, useEffect, FormEventHandler } from 'react';
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
    product 
}: ProductModalProps) {
    // Estado inicial del formulario
    const initialFormData: FormData = {
        name: '',
        description: '',
        price: '',
        stock: '0',
        status: 'active',
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
     * Realiza la petición al backend según el modo (crear/editar).
     */
    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setProcessing(true);

        try {
            const url = mode === 'create' 
                ? '/products' 
                : `/products/${product?.id}`;
            
            const method = mode === 'create' ? 'POST' : 'PUT';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector<HTMLMetaElement>(
                        'meta[name="csrf-token"]'
                    )?.content || '',
                },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description || null,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock),
                    status: formData.status,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                onSuccess(data.product);
                onClose();
                setFormData(initialFormData);
            } else {
                // Manejar errores de validación del servidor
                if (data.errors) {
                    setErrors(data.errors);
                }
            }
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        } finally {
            setProcessing(false);
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
