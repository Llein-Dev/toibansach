import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';


const schema = yup.object({
  name: yup.string().required('Name is required'),
  price: yup.number().required('Price is required').positive('Price must be positive').integer('Price must be an integer'),
  description: yup.string(),
  category: yup.string().required('Category is required'),
  sale: yup.number().positive('Sale price must be positive').integer('Sale price must be an integer'),
  image: yup.mixed().nullable()
});

const API_BASE_URL = "http://localhost:3001/";

export default function AddProductModal({ isOpen, onClose, product }) {
  const [categories, setCategories] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { control, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      price: '',
      description: '',
      category: '',
      image: null,
      sale: '',
    }
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        category: product.categoryId || '',
        image: null,
        sale: product.sale || '',
      });
    } else {
      reset({
        name: '',
        price: '',
        description: '',
        category: '',
        image: null,
        sale: '',
      });
    }
  }, [product, reset]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    setShowConfirmDialog(true);
  };

  const handleConfirm = async () => {
    setShowConfirmDialog(false);
    const formData = new FormData();
    let isImageUpdated = false;

    for (const key in getValues()) {
      if (getValues(key) !== null && getValues(key) !== undefined) {
        if (key === 'image' && getValues(key) && getValues(key).name !== product?.image) {
          isImageUpdated = true;
        }
        formData.append(key === 'category' ? 'categoryId' : key, getValues(key));
      }
    }

    try {
      if (product) {
        if (!isImageUpdated && product.image === getValues('image')) {
          formData.delete('image');
        }
        await axios.put(`${API_BASE_URL}products/${product._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Updated successfully!');
      } else {
        await axios.post(`${API_BASE_URL}products/add`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Added successfully!');
      }
      onClose();
    } catch (error) { setErrorMessage(error.response?.data.message || error.message); }
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'} flex items-center justify-center bg-black/50`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-700 font-bold">{product ? 'Edit Product' : 'Add Product'}</h2>
     
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>
        {errorMessage && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded-md">
              {errorMessage}
            </div>
          )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="font-medium">Name</label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    id="name"
                    type="text"
                    {...field}
                    className="p-2 border border-gray-300 rounded-md w-full"
                  />
                )}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="price" className="font-medium">Price</label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <input
                    id="price"
                    type="number"
                    {...field}
                    className="p-2 border border-gray-300 rounded-md w-full"
                  />
                )}
              />
              {errors.price && <p className="text-red-500">{errors.price.message}</p>}
            </div>
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label htmlFor="description" className="font-medium">Description</label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <textarea
                    id="description"
                    {...field}
                    className="p-2 border border-gray-300 rounded-md w-full h-32 resize-none"
                  />
                )}
              />
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
            <div className="flex flex-col space-y-2 md:col-span-1">
              <label htmlFor="category" className="font-medium">Category</label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <select
                    id="category"
                    {...field}
                    className="p-2 border border-gray-300 rounded-md w-full"
                  >
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                )}
              />
              {errors.category && <p className="text-red-500">{errors.category.message}</p>}
            </div>
            <div className="flex flex-col space-y-2 md:col-span-1">
              <label htmlFor="sale" className="font-medium">Sale Price</label>
              <Controller
                name="sale"
                control={control}
                render={({ field }) => (
                  <input
                    id="sale"
                    type="number"
                    {...field}
                    className="p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Enter sale price or percentage"
                  />
                )}
              />
              {errors.sale && <p className="text-red-500">{errors.sale.message}</p>}
            </div>
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label htmlFor="image" className="font-medium">Image</label>
              <div className="flex items-center space-x-2">
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          field.onChange(e.target.files[0]);
                        }}
                        className="border border-gray-300 rounded-md"
                      />
                      {getValues('image') && (
                        <div className="flex items-center">
                          <span className="text-gray-600">{getValues('image').name}</span>
                        </div>
                      )}
                      {product && product.image && !getValues('image') && (
                        <div className="flex items-center">
                          <img src={`${API_BASE_URL}images/Books-image/${product.image}`} alt={product.name} className="h-16 w-16 object-cover" />
                        </div>
                      )}
                    </>
                  )}
                />
                {errors.image && <p className="text-red-500">{errors.image.message}</p>}
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-4">

            <button
              type="submit"
              className="shadow-md inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <FontAwesomeIcon icon={product ? faSave : faPlus} className="mr-2" />
              {product ? 'Save' : 'Add'}
            </button>
          </div>
        </form>

        {showConfirmDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm">
              <h3 className="text-lg font-bold">Confirmation</h3>
              <p className="text-gray-700">Are you sure you want to {product ? 'update' : 'add'} this product?</p>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowConfirmDialog(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="shadow-md inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  <FontAwesomeIcon icon={faCheck} className="mr-2" />
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
