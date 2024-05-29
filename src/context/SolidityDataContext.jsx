import React, { createContext, useState } from 'react';

export const SolidityDataContext = createContext();
const initialState=[{
    language: 'Solidity',
}
]
export const SolidityDataProvider = ({ children }) => {
    const [solidityData, setSolidityData] = useState(initialState);

    return (
        <SolidityDataContext.Provider value={{ solidityData, setSolidityData }}>
            {children}
        </SolidityDataContext.Provider>
    );
};
