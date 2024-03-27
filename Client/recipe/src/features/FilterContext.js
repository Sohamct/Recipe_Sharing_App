import React, {createContext, useState} from 'react';

export const FilterContext= createContext()

export const FilterProvider = ({children}) => {
    const [filterData, setFilterData] = useState({
        categories: [],
        vegNonVeg: '',
        dishTypes: [],
        favoritism: '',
    });
  return (
    <FilterContext.Provider value={{filterData, setFilterData}}>
        {children}
    </FilterContext.Provider>
  )
}
