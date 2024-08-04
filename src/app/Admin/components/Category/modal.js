import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const API = "http://localhost:3001";  // Ensure the correct API URL

// Validation schema using Yup
const schema = yup.object().shape({
    name: yup.string().required('Category name is required'),
    image: yup.mixed().required('Image is required'),
    description: yup.string(),
    status: yup.number().oneOf([0, 1], 'Status must be 0 or 1').required('Status is required')
});

function CategoryModal({ isOpen, onClose, category, onSave }) {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            image: '',
            description: '',
            status: 1
        }
    });

    useEffect(() => {
        if (category) {
            setValue('name', category.name);
            setValue('image', category.image);
            setValue('description', category.description);
            setValue('status', category.status);
        } else {
            reset(); // Reset the form if no category is selected
        }
    }, [category, setValue, reset]);

    const onSubmit = async (data) => {
        const method = category ? 'PUT' : 'POST';
        const url = category ? `${API}/categories/${category._id}` : `${API}/categories`;

        try {
            await axios({
                method,
                url,
                data,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            onSave();
            onClose();
        } catch (error) {
            console.error('Error saving category:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-lg font-bold text-gray-700">{category ? 'Edit Category' : 'Add Category'}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">Category Name</label>
                        <input
                            type="text"
                            {...register('name')}
                            className="mt-1 p-2 text-gray-700 border-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            {...register('image')}
                            className="mt-1 p-2 text-gray-700 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            {...register('description')}
                            className="mt-1 p-2 text-gray-700 border-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            {...register('status')}
                            className="mt-1 p-2 text-gray-700 border-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value={1}>Active</option>
                            <option value={0}>Inactive</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-xs">{errors.status.message}</p>}
                    </div>
                    <div className="mt-4 flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-500 hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CategoryModal;
