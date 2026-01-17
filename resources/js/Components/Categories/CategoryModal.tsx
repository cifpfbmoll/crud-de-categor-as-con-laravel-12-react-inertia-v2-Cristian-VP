import { useState, useEffect } from 'react';
import axios from 'axios';
import { Category } from '@/types';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

type IndustryType = 'manufactura' | 'retail' | 'alimentacion' | 'salud' | 'educacion' | 'servicios';

interface CategoryModalProps {
    isOpen: boolean;
    category: Category | null;
    onClose: () => void;
    onSuccess: () => void;
}

interface FormData {
    name: string;
    slug: string;
    description: string;
    industry_type: IndustryType;
    color: string;
    icon: string;
    active: boolean;
    priority: number;
}

export default function CategoryModal({ isOpen, category, onClose, onSuccess }: CategoryModalProps) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        slug: '',
        description: '',
        industry_type: 'retail',
        color: '#4ECDC4',
        icon: '',
        active: true,
        priority: 0,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
                slug: category.slug,
                description: category.description || '',
                industry_type: category.industry_type as IndustryType,
                color: category.color || '#4ECDC4',
                icon: category.icon || '',
                active: category.active,
                priority: category.priority || 0,
            });
        } else {
            resetForm();
        }
        setErrors({});
    }, [category, isOpen]);

    const resetForm = () => {
        setFormData({
            name: '',
            slug: '',
            description: '',
            industry_type: 'retail',
            color: '#4ECDC4',
            icon: '',
            active: true,
            priority: 0,
        });
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setFormData({
            ...formData,
            name,
            slug: generateSlug(name),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            if (category) {
                await axios.put(`/categories/${category.id}`, formData);
            } else {
                await axios.post('/categories', formData);
            }
            onSuccess();
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'Error al guardar la categoría' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                    {category ? 'Editar Categoría' : 'Nueva Categoría'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {errors.general && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {errors.general}
                        </div>
                    )}

                    <div>
                        <InputLabel htmlFor="name">Nombre</InputLabel>
                        <TextInput
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={handleNameChange}
                            className="mt-1 block w-full"
                            required
                        />
                        {errors.name && <InputError message={errors.name} />}
                    </div>

                    <div>
                        <InputLabel htmlFor="slug">URL amigable (slug)</InputLabel>
                        <TextInput
                            id="slug"
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="mt-1 block w-full"
                        />
                        {errors.slug && <InputError message={errors.slug} />}
                    </div>

                    <div>
                        <InputLabel htmlFor="industry_type">Tipo de Industria</InputLabel>
                        <select
                            id="industry_type"
                            value={formData.industry_type}
                            onChange={(e) => setFormData({ ...formData, industry_type: e.target.value as any })}
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        >
                            <option value="manufactura">🏭 Manufactura</option>\n                            <option value="retail">🏪 Retail</option>
                            <option value="alimentacion">🍔 Alimentación</option>
                            <option value="salud">🏥 Salud</option>
                            <option value="educacion">🎓 Educación</option>
                            <option value="servicios">🏢 Servicios</option>
                        </select>
                        {errors.industry_type && <InputError message={errors.industry_type} />}
                    </div>

                    <div>
                        <InputLabel htmlFor="description">Descripción</InputLabel>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            rows={3}
                        />
                        {errors.description && <InputError message={errors.description} />}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="color">Color</InputLabel>
                            <input
                                id="color"
                                type="color"
                                value={formData.color}
                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                className="mt-1 block w-full rounded-md h-10"
                            />
                            {errors.color && <InputError message={errors.color} />}
                        </div>

                        <div>
                            <InputLabel htmlFor="icon">Icono</InputLabel>
                            <TextInput
                                id="icon"
                                type="text"
                                placeholder="ej: mdi-factory"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="mt-1 block w-full"
                            />
                            {errors.icon && <InputError message={errors.icon} />}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="priority">Prioridad</InputLabel>
                            <input
                                id="priority"
                                type="number"
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                                className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.priority && <InputError message={errors.priority} />}
                        </div>

                        <div className="flex items-end">
                            <label className="flex items-center gap-2 mb-1">
                                <input
                                    type="checkbox"
                                    checked={formData.active}
                                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                    className="rounded"
                                />
                                <span className="text-sm font-medium text-gray-700">Activa</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            Cancelar
                        </button>
                        <PrimaryButton disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

