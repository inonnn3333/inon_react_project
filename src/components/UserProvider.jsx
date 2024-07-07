import React, { useContext, useState, createContext} from 'react';
import getUsers from './GetUsers';

const TheUserContext = createContext();

export const TheUserProvider = ({ children }) => {
    const [theUser, setTheUser] = useState(null);

    const userDetailes = (theToken) => {
        getUsers(theToken)
            .then((data) => {
                setTheUser(data);
                localStorage.setItem('userData', JSON.stringify(theUser));
            })
            .catch((error) => {
                console.error('Error fetching user in TheUserProvider:', error);
            });
    }

    return (
        <TheUserContext.Provider value={{ theUser, setTheUser, userDetailes }}>
            {children}
        </TheUserContext.Provider>
    );
};

export const useTheUser = () => {
    return useContext(TheUserContext);
};
