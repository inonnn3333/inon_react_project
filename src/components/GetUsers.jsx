import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 

const getUsers = async (token) => {
    try {
        
        let theUserId = null;
        if (token) {
            const decoded = jwtDecode(token);
            theUserId = decoded._id;
        }

        if (!theUserId) {
            throw new Error('User ID could not be decoded from the token');
        }

        const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${theUserId}`, {
            headers: {
                'x-auth-token': token,
            }
        });

        return response.data;

    } catch (error) {
        console.error('Error fetching users in getUsers:', error.response || error.message);
        throw error;
    }
};

export default getUsers;