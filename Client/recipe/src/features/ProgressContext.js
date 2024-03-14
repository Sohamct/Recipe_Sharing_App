import React, {createContext, useContext, useState} from "react";

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext)

export const ProgressProvider = ({children}) => {
    const [progress, setProgress] = useState(0);

    const updateProgress = (value) => {
        setProgress(value);
    }

    return (
        <ProgressContext.Provider value={{progress, updateProgress}}>
            {children}
        </ProgressContext.Provider>
    )
}