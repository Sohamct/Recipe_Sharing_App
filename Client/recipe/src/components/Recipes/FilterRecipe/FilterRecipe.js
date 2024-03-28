import React, { useState } from 'react';
import { SearchRecipe } from '../SearchRecipe/SearchRecipe';
import { FaFilter } from "react-icons/fa6";
import Filter from '../FilterRecipe/Filter';

export const FilterRecipe = ({ onFilter }) => {
  const [category, setCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFilter = () => {
    onFilter({ category });
  };

  return (
    <div>
      <div className="flex items-center">
        
        <FaFilter onClick={toggleFilter} className="w-6 h-6 text-gray-500 hover:text-gray-900 cursor-pointer mr-4" />
        {isFilterOpen && <Filter  isOpen={isFilterOpen} onClose={closeFilter}/>}

        <SearchRecipe className="mr-4"/>
        
        <div>
        </div>
      </div>
    </div>
  );
};


// import React, { useState } from 'react';
// import { SearchRecipe } from '../SearchRecipe/SearchRecipe';
// import Filter from '../FilterRecipe/Filter'
// import { FaFilter } from "react-icons/fa6";

// export const FilterRecipe = ({ onFilter }) => {
//   const [category, setCategory] = useState('all');
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   const toggleFilter = () => {
//     setIsFilterOpen(!isFilterOpen);
//   };

//   const closeFilter = () => {
//     setIsFilterOpen(false);
//   };

//   const handleCategoryChange = (event) => {
//     setCategory(event.target.value);
//   };

//   const handleFilter = () => {
//     // Pass the filter options to the parent component
//     onFilter({ category });
//   };

//   return (
//     <div>
//       <div className="flex items-center">
//       <FaFilter />
//         <SearchRecipe />
//         <div className='mx-3'>
//           <select
//             id="category"
//             className="border rounded-md p-2"
//             value={category}
//             onChange={handleCategoryChange}
//           >
//             <option value="all">All</option>
//             <option value="veg">Veg</option>
//             <option value="nonveg">Non-Veg</option>
//           </select>
//         </div>
//         <div>
//           <button
//             className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
//             onClick={handleFilter}
//           >
//             Filter
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

