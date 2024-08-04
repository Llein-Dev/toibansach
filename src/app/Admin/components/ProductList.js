"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import AddProductModal from './addmodal';

const API_BASE_URL = "http://localhost:3001/";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                const productResponse = await axios.get(`${API_BASE_URL}products`);
                setProducts(productResponse.data);

                const categoryResponse = await axios.get(`${API_BASE_URL}categories`);
                setCategories(categoryResponse.data);
            } catch (error) {
                setError('Error fetching products or categories');
            } finally {
                setLoading(false);
            }
        };

        fetchProductsAndCategories();
    }, []);

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        setIsModalOpen(false);
        fetchProductsAndCategories();
    };

    const handleDeleteClick = (productId) => {
        setProductToDelete(productId);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        setShowDeleteConfirm(false);
        if (productToDelete) {
            try {
                await axios.delete(`${API_BASE_URL}products/${productToDelete}`);
                setProducts(products.filter(product => product._id !== productToDelete));
            } catch (error) {
                setError('Error deleting product');
            }
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= Math.ceil(products.length / productsPerPage)) {
            setCurrentPage(newPage);
        }
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    const categoryMap = categories.reduce((map, cat) => {
        map[cat._id] = cat.name; 
        return map;
    }, {});

    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center my-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="shadow-md hover:text-gray-700 hover:bg-gray-300 py-1 px-2 rounded-md"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <p>{currentPage} / {Math.ceil(products.length / productsPerPage)}</p>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(products.length / productsPerPage)}
                    className="shadow-md hover:text-gray-700 hover:bg-gray-300 py-1 px-2 rounded-md"
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            {currentProducts.map((product) => (
                <div key={product._id} className="border flex mb-4 flex-col md:flex-row p-4 rounded-md shadow-sm space-y-4 md:space-y-0 md:space-x-4">
                    <img
                        src={`${API_BASE_URL}img/Books-image/${product.image}`}
                        alt={product.name}
                        className="w-full md:w-32 h-full object-cover rounded-md"
                    />
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-gray-700 uppercase text-sm mb-4">{categoryMap[product.categoryId]}</p>
                        <p>{product.description}</p>
                        <p className="font-bold text-red-500">{product.price} đ</p>
                    </div>
                    <div className="flex space-x-2 self-center md:self-start">
                        <button
                            onClick={() => handleEditClick(product)}
                            className="shadow-md hover:text-gray-700 hover:bg-gray-300 py-1 px-2 rounded-md"
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                            onClick={() => handleDeleteClick(product._id)}
                            className="shadow-md hover:text-gray-700 hover:bg-gray-300 py-1 px-2 rounded-md"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            ))}
            

            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
                onSave={handleSave}
            />

            {/* Confirm Delete Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <p className="text-gray-700 mb-4">Are you sure you want to delete this product?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 focus:outline-none"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
