import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const API = "http://localhost:3001";  // Đảm bảo URL API chính xác

function CategoryList({ onEdit, onDelete }) {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch(`${API}/categories`);
                if (!response.ok) throw new Error('Failed to fetch categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        async function fetchProducts() {
            try {
                const response = await fetch(`${API}/products`);
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchCategories();
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                const response = await fetch(`${API}/categories/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) throw new Error('Failed to delete category');
                setCategories(categories.filter(category => category._id !== id));
                if (onDelete) onDelete();  // Call the onDelete callback if provided
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };
    console.log(products);
    console.log(categories);
    // Calculate number of products for each category
    const getNumberOfProducts = (categoryId) => {
        return products.filter(product => product.categoryId === categoryId).length;
    };

    return (
        <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">#</th>
                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-xs font-medium text-center  uppercase tracking-wider">Quantities</th>
                        <th className="px-6 py-3 text-xs font-medium text-center  uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className=" divide-y ">
                    {categories.map((category, index) => (
                        <tr key={category._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-4 text-sm font-medium ">
                                <img
                                    className='h-10 w-10 rounded-lg object-cover'
                                    src={`${API}/images/Categories-image/${category.image}`}
                                    alt={category.name}
                                />
                                <span>{category.name}</span>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm ">{category.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm ">{getNumberOfProducts(category._id)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                <div className='flex gap-2 justify-center'>
                                    <button
                                        onClick={() => onEdit(category)}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2  hover:text-indigo-900"
                                    >
                                        <FontAwesomeIcon icon={faEdit} className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category._id)}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2  hover:text-red-900"
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} className="h-5 w-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CategoryList;
