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
import { useAuth } from './AuthContext';
import { Stack, Tooltip } from '@mui/material';
import DeleteCard from './DeleteCard';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Gallery = ({ searchQuery }) => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = "65424ae9a8d1eae12d31e360";

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards');
                const cards = response.data;

                // Check if user has liked each card
                if (userId) {
                    cards.forEach((card) => {
                        card.liked = card.likes.includes(userId);
                    });
                }

                setData(cards);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [userId]);

    if (loading) return <div>רק רגע..</div>;
    if (error) return <p>Error: {error.message}</p>;

    const handleLike = async (productId) => {
        try {
            const response = await axios.patch(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${productId}`,
                {},
                {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                }
            );
            const updatedProduct = response.data;

            // Check if user has liked the updated product
            updatedProduct.liked = updatedProduct.likes.includes(userId);

            setData((prevData) =>
                prevData.map((product) =>
                    product._id === productId ? updatedProduct : product
                )
            );
        } catch (error) {
            console.error('Error liking the card:', error);
        }
    };

    const filteredData = data.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const displayData = isAuthenticated ? filteredData : filteredData.slice(0, 3);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            {!isAuthenticated && (
                <>
                    <Typography variant="h4" component="h1" gutterBottom>
                        ברוך הבא
                    </Typography>
                    <Typography variant="body1" component="p" gutterBottom>
                        lorem ipsum
                    </Typography>
                </>
            )}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', padding: 2 }}>
                {displayData.map(product => (
                    <Card key={product._id} sx={{ width: 300, height: 360, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography sx={{ fontSize: 18, fontWeight: 'bold', mb: 2 }} color="text.primary" gutterBottom>
                                {product.title}
                            </Typography>
                            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                                <Tooltip title="פרטים נוספים">
                                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                                        <img src={product.image.url} alt={`${product._id} Img`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                    </Box>
                                </Tooltip>
                            </Link>
                        </CardContent>
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                            {isAuthenticated ? (
                                <>
                                    <Tooltip title="עריכה" sx={{ mx: 0, padding: "0 10px" }}>
                                        <Button sx={{ margin: "0 5px" }} variant="outlined" onClick={() => navigate(`/edit/${product._id}`)}>
                                            <EditIcon />
                                        </Button>
                                    </Tooltip>
                                    <DeleteCard cardId={product._id} />
                                    
                                    <Tooltip title="לייק">
                                        <Button
                                            sx={{ margin: "0 5px", color: product.liked ? "red" : "default" }}
                                            variant="outlined"
                                            onClick={() => handleLike(product._id)}
                                        >
                                            <FavoriteIcon />
                                        </Button>
                                    </Tooltip>
                                </>
                            ) : (
                                <Tooltip title="פרטים נוספים">
                                    <Button sx={{ mx: 0 }} variant="outlined" onClick={() => navigate(`/product/${product._id}`)}>
                                        <VisibilityIcon />
                                    </Button>
                                </Tooltip>
                            )}
                        </Stack>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Gallery;
