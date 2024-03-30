import React, { useRef, useState, useEffect, useContext } from 'react';
import { FilterContext } from '../../../features/FilterContext';

const Filter = ({ isOpen, onClose }) => {

  const dishTypes = ['Italian', 'American', 'Chinese', 'Mexican', 'Kathiyawadi', 'Rajasthani', 'South Indian', 'Punjabi', 'Hydrabadi', 'Gujrati', 'Maharashtriyan', 'Indian', 'Jammu Kashmiri', 'Uttar predesh'];
  const categories = ['Breakfast', 'Fast food', 'Ice cream', 'Ice cream cake', 'Beverages', 'Snacks', 'Sweets', 'Jain', 'Deserts', 'Cookies'];
  const {filterData, setFilterData} = useContext(FilterContext);

  const [favoritism, setFavoritism] = useState('');
  const [vegNonVeg, setVegNonVeg] = useState('');
  const [selectedDishTypes, setSelectedDishTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    setFavoritism('');
    setVegNonVeg('');
    setSelectedCategories([]);
    setSelectedDishTypes([]);
  }, [window.location.href])
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleDishTypeChange = (e) => {
    const { value } = e.target;
    setSelectedDishTypes((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((type) => type !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setFilterData({
        ...filterData,
        dishTypes: selectedDishTypes,
        categories: selectedCategories,
        vegNonVeg: vegNonVeg,
        favoritism: favoritism
      });
    }
  }, [isOpen, filterData, selectedDishTypes, selectedCategories, vegNonVeg, favoritism, setFilterData]);

  useEffect(() => {
    if (isOpen) {
      setVegNonVeg(filterData.vegNonVeg);
      setFavoritism(filterData.favoritism);
      setSelectedDishTypes(filterData.dishTypes);
      setSelectedCategories(filterData.categories);
    }
  }, [isOpen, filterData]);
  
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((category) => category !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };
  
  const clearFilters = () => {
    setVegNonVeg('');
    setFavoritism('');
    setSelectedDishTypes([]);
    setSelectedCategories([]);
    setFilterData({
      categories: [],
      vegNonVeg: '',
      dishTypes: [],
      favoritism: '',
    });
  };
  const onApplyFilter = () => {
    setFilterData({
      ...filterData,
      dishTypes: selectedDishTypes,
      categories: selectedCategories,
      vegNonVeg: vegNonVeg,
      favoritism: favoritism
    });
    console.log(filterData);
    onClose();
    // onClose();
  };

  return (
    <div className={`fixed inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`} style={{ zIndex: 9999 }}>
      <div className="flex items-center justify-center min-h-screen pt-20 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div ref={ref} className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="w-full">

              <div className="mb-4">
                  <label
                    htmlFor="vegNonVeg"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Veg-Non Veg
                  </label>
                  <select
                    id="vegNonVeg"
                    name="vegNonVeg"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={vegNonVeg}
                    onChange={(e) => setVegNonVeg(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non Veg</option>
                    <option value="Both">Both</option>
                  </select>
                </div>


                <div className="mb-4">
                  <label
                    htmlFor="favoritism"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Favoritism
                  </label>
                  <select
                    id="favoritism"
                    name="favoritism"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={favoritism}
                    onChange={(e) => setFavoritism(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="high to low">high to low</option>
                    <option value="low to high">low to high</option>
                  </select>
                </div>


                <div className="mb-4">
                  <label htmlFor="dishType" className="block text-sm font-medium text-gray-700 mb-1">
                    Dish Type
                  </label>
                  <div>
                    {dishTypes.map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={type}
                          name={type}
                          value={type}
                          checked={selectedDishTypes.includes(type)}
                          onChange={handleDishTypeChange}
                          className="mr-2"
                        />
                        <label htmlFor={type}>{type}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <div>
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          id={category}
                          name={category}
                          value={category}
                          checked={selectedCategories.includes(category)}
                          onChange={handleCategoryChange}
                          className="mr-2"
                        />
                        <label htmlFor={category}>{category}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onApplyFilter}
            >
              Apply
            </button>
            <button
        type="button"
        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-200 text-base font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;

// import React, { useRef, useState, useEffect } from 'react';
// import { UseSelector, useSelector } from 'react-redux';

// const Filter = ({ isOpen, onClose }) => {
//   const recipes = useSelector((state) => state.recipes.recipes)

//   console.log(recipes);
//   const [dishType, setDishType] = useState('');
//   const [favoritism, setFavoritism] = useState('');
//   const [vegNonVeg, setVegNonVeg] = useState('');
//   const [category, setCategory] = useState('');
//   const ref = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (ref.current && !ref.current.contains(event.target)) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   const onApplyFilter = () => {

//   }

//   return (
//     <div 
//       className={`fixed inset-0 overflow-y-auto ${
//         isOpen ? 'block' : 'hidden'
//       }`}
//       style={{ zIndex: 9999 }}
//     >
//       <div
        
//         className="flex items-center justify-center min-h-screen pt-20 px-4 pb-20 text-center sm:block sm:p-0"
//       >
//         <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//         </div>

//         <span
//           className="hidden sm:inline-block sm:align-middle sm:h-screen"
//           aria-hidden="true"
//         >
//           &#8203;
//         </span>

//         <div ref={ref} className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <div className="sm:flex sm:items-start">
//               <div className="w-full">
//                 <div className="mb-4">
//                   <label
//                     htmlFor="dishType"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Dish Type
//                   </label>
//                   <select
//                     id="dishType"
//                     name="dishType"
//                     className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     value={dishType}
//                     onChange={(e) => setDishType(e.target.value)}
//                   >
//                     <option value="">Select</option>
//                     <option value="Italian">Italian</option>
//                     <option value="American">American</option>
//                     <option value="Chinese">Chinese</option>
//                     <option value="Mexican">Mexican</option>
//                     <option value="Kathiyawadi">Kathiyawadi</option>
//                     <option value="Rajasthani">Rajasthani</option>
//                     <option value="South-Indian">South-Indian</option>
//                     <option value="Punjabi">Punjabi</option>
//                     <option value="Hydrabadi">Hydrabadi</option>
//                     <option value="Indian">Indian</option>
//                   </select>
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="favoritism"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Favoritism
//                   </label>
//                   <input
//                     type="text"
//                     id="favoritism"
//                     name="favoritism"
//                     className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     value={favoritism}
//                     onChange={(e) => setFavoritism(e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="vegNonVeg"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Veg-Non Veg
//                   </label>
//                   <select
//                     id="vegNonVeg"
//                     name="vegNonVeg"
//                     className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     value={vegNonVeg}
//                     onChange={(e) => setVegNonVeg(e.target.value)}
//                   >
//                     <option value="">Select</option>
//                     <option value="veg">Veg</option>
//                     <option value="nonVeg">Non Veg</option>
//                   </select>
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="category"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Category
//                   </label>
//                   <select
//                     id="category"
//                     name="category"
//                     className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                   >
//                     <option value="">Select</option>
//                     <option value="Cake">Cake</option>
//                     <option value="Beverages">Beverages</option>
//                     <option value="Snacks">Snacks</option>
//                     <option value="Breakfast">Breakfast</option>
//                     <option value="Dinner">Dinner</option>
//                     <option value="Fast-food">Fast-food</option>
//                     <option value="Ice-Cream">Ice-Cream</option>
//                     <option value="Ice-Cream-Cake">Ice-Cream-Cake</option>
//                     <option value="Jain">Jain</option>
//                     <option value="Deserts">Deserts</option>
//                     <option value="Sweets">Sweets</option>
//                     <option value="Cookies">Cookies</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//             <button
//               type="button"
//               className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
//               onClick={onClose}
//             >
//               Close
//             </button>
//             <button
//               type="button"
//               className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
//               onClick={onApplyFilter}
//             >
//               Apply
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filter;