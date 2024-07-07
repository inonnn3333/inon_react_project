import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const APIContext = createContext();

export const APIProvider = ({ children }) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards');
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <APIContext.Provider value={{ data, loading, error }}>
            {children}
        </APIContext.Provider>
    );
};
