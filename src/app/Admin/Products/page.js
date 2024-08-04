"use client"
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSync } from '@fortawesome/free-solid-svg-icons';
import HeaderComponents from '../components/HeaderComponent';
import AddProductModal from '../components/addmodal';
import ProductList from '../components/ProductList';
import ConfirmDialog from '../components/Notion';
export default function ProductsPage() {
  const title = "Products";
  const description = "Manage your products";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(() => () => { });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openConfirmDialog = (action) => {
    setConfirmAction(() => action);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirm = () => {
    confirmAction();
    setIsConfirmDialogOpen(false);
    setConfirmAction(() => () => { });
  };

  const handleCancel = () => {
    setIsConfirmDialogOpen(false);
    setConfirmAction(() => () => { });
  };

  const handleReload = () => {
    window.location.reload();  
  };

  return (
    <>
      <HeaderComponents title={title} description={description} />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleReload}
              className="inline-flex h-10 items-center shadow-md justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faSync} className="h-4 w-4" />
            
            </button>
            <button
              onClick={openModal}
              className="inline-flex h-10 items-center shadow-md justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
              Add product
            </button>
          </div>
        </div>
        <ProductList onShowConfirmDialog={openConfirmDialog} />
      </div>

      {/* AddProductModal Component */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={() => {
          handleReload();
          closeModal();
        }}
      />

      {/* ConfirmDialog Component */}
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        message="Are you sure you want to proceed?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
