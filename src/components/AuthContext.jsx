// AuthContext.js
import React, { createContext, useState, useEffect, useContext,} from 'react';
import getUsers from './GetUsers';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [theUser, setTheUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const login = async (token) => {
        localStorage.setItem('token', token);
        const getUsetDetailes = await getUsers(token);
        setTheUser(JSON.stringify(getUsetDetailes)); //! לוקח את פרטי היוזר
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, theUser, setTheUser }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth };
