// import React, { useContext, useState, createContext, useEffect} from 'react';
// import { useToken } from './TokenProvider';
// import getUsers from '../Components/Getting/getUsers';

// const TheUserContext = createContext();

// export const TheUserProvider = ({ children }) => {
//     const [theUser, setTheUser] = useState(null);
//     // const [loading, setLoading] = useState(true);
//     const { theToken } = useToken();

//     useEffect(() => {
//         if (theToken) {
//             getUsers(theToken)
//                 .then((data) => {
//                     setTheUser(data);
//                     setLoading(false);
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching user in TheUserProvider:', error);
//                     setLoading(false);
//                 });
//         }
//     }
//     , [theToken]);



//     return (
//         <TheUserContext.Provider value={{ theUser, setTheUser }}>
//             {children}
//         </TheUserContext.Provider>
//     );
// };

// export const useTheUser = () => {
//     return useContext(TheUserContext);
// };