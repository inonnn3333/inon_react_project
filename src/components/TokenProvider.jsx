import React, { useContext, useState, createContext } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [theToken, setTheToken] = useState(localStorage.getItem('token') || '');

    return (
        <TokenContext.Provider value={{ theToken, setTheToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => {
    return useContext(TokenContext);
};
