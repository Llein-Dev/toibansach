// pages/categories.js
"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faPlus } from '@fortawesome/free-solid-svg-icons';
import HeaderComponents from '../components/HeaderComponent';
import CategoryList from '../components/Category/List';
import CategoryModal from '../components/Category/modal';

export default function CategoriesPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    const handleOpenModal = (category = null) => {
        setCurrentCategory(category);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setCurrentCategory(null);
    };

    const handleSaveCategory = () => {
        handleCloseModal(); // Refresh the list by fetching new data or using state
    };

    return (
        <>
            <HeaderComponents title="Categories" description="Manage your Categories" />
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
                        <p className="text-muted-foreground">Manage your Categories</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            type="button"
                            className="inline-flex h-10 items-center shadow-md justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            <FontAwesomeIcon icon={faSync} className="h-4 w-4" />
                        </button>
                        <button
                            className="inline-flex h-10 items-center shadow-md justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            onClick={() => handleOpenModal()}
                        >
                            <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                            <span className="ml-2">Add New</span>
                        </button>
                    </div>
                </div>
                <CategoryList onEdit={handleOpenModal} />
                <CategoryModal isOpen={isOpen} onClose={handleCloseModal} category={currentCategory} onSave={handleSaveCategory} />
            </div>
        </>
    );
}
