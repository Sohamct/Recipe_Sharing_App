import React from 'react';

const DeleteConfirmation = ({ deleteClick, handleCancelDelete, handleConfirmDelete }) => {
  return (
    <>
      {deleteClick && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-md">
              <div className="px-6 py-4">
                <div className="flex items-center justify-center">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={handleCancelDelete}
                      cursor={'pointer'}
                    >
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">Delete Recipe</h3>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Are you sure you want to delete this recipe?</p>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 flex justify-end">
                <button
                  onClick={handleConfirmDelete}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteConfirmation;