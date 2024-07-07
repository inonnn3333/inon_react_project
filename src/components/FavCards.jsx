import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Stack, Tooltip } from '@mui/material';
import { useAuth } from './AuthContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteCard from './DeleteCard';

const FavCardPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated, theUser, setTheUser } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favCards, setFavCards] = useState([]);

    useEffect(() => {
        axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards')
            .then(response => {
                setData(response.data);
                setTheUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false); 
            });
    }, []);

    useEffect(() => {
        if (isAuthenticated && data.length > 0) {
            const filteredCards = data.filter(card => card.likes.includes(theUser._id));
            setFavCards(filteredCards);
        }
    }, [data, isAuthenticated, theUser]); // וודא שה-hook יפעל גם כאשר theUser משתנה

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!isAuthenticated) return (
        
        <Typography variant="body2" align="center">
            בכדי לראות את הכרטיסיות שאהבת עליך <Button color="primary" href="/Login">להתחבר</Button>
        </Typography>
    );

    return (
        <div>

            <button onClick={() => console.log(theUser)}>
                לחץ כאן
            </button>
        </div>
        // <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
        //     <h1>הכרטיסים המועדפים שלי</h1>
        //     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', padding: 2 }}>
        //         {favCards.length > 0 ? (
        //             favCards.map(card => (
        //                 <Card key={card._id} sx={{ width: 300, height: 360, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        //                     <CardContent sx={{ textAlign: 'center' }}>
        //                         <Typography sx={{ fontSize: 18, fontWeight: 'bold', mb: 2 }} color="text.primary" gutterBottom>
        //                             {card.title}
        //                         </Typography>
        //                         <Link to={`/product/${card._id}`} style={{ textDecoration: 'none' }}>
        //                             <Tooltip title="פרטים נוספים">
        //                                 <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        //                                     <img src={card.image.url} alt={`${card._id} Img`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        //                                 </Box>
        //                             </Tooltip>
        //                         </Link>
        //                     </CardContent>
        //                     <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
        //                         {isAuthenticated ? (
        //                             <>
        //                                 <Tooltip title="עריכה">
        //                                     <Button sx={{ margin: 0 }} variant="outlined" onClick={() => navigate(`/edit/${card._id}`)}>
        //                                         <EditIcon />
        //                                     </Button>
        //                                 </Tooltip>

        //                                 <Tooltip title="לייק">
        //                                     <Button sx={{ margin: "0 5px", color: "red" }} variant="outlined">
        //                                         <FavoriteIcon/>
        //                                     </Button>
        //                                 </Tooltip>
        //                                 <DeleteCard cardId={card._id} />
        //                             </>
        //                         ) : (
        //                             <Tooltip title="פרטים נוספים">
        //                                 <Button sx={{ mx: 0 }} variant="outlined" onClick={() => navigate(`/product/${card._id}`)}>
        //                                     <VisibilityIcon />
        //                                 </Button>
        //                             </Tooltip>
        //                         )}
        //                     </Stack>
        //                 </Card>
        //             ))
        //         ) : (
        //             <p>לא נמצאו כרטיסים מועדפים.</p>
        //         )}
        //     </Box>
        // </Box>
    );
};

export default FavCardPage;
