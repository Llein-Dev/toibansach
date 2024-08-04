// components/ConfirmDialog.js
import React from 'react';

const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
