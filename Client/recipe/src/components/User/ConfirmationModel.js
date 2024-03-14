import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'flex' : 'hidden'}`}>
      <div className="modal-overlay fixed w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container absolute w-11/12 md:max-w-md mx-auto bg-white rounded-lg shadow-lg z-50 p-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="modal-content text-left">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Confirm Unfollow</p>
          </div>
          <p>Are you sure you want to unfollow this user?</p>
          <div className="mt-4 flex justify-end space-x-4">
            <button className="px-4 py-2 bg-gray-400 rounded-md text-white" onClick={onClose}>
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-900 rounded-md text-white" onClick={onConfirm}>
              Unfollow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
