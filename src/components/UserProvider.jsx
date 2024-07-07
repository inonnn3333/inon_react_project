import React, { useContext, useState, createContext} from 'react';
// import { useToken } from './TokenProvider';
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

    // const { theToken } = useToken();

    // useEffect(() => {
    //     if (theToken) {
    //         getUsers(theToken)
    //             .then((data) => {
    //                 setTheUser(data);
    //                 localStorage.setItem('userData', JSON.stringify(theUser));
    //             })
    //             .catch((error) => {
    //                 console.error('Error fetching user in TheUserProvider:', error);
    //             });
    //     }
    // }
    // , [theToken]);
