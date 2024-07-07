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
import DeleteCard from './DeleteCard';
import FavoriteIcon from '@mui/icons-material/Favorite';


const MyCards = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyCards = async () => {
            try {
                const token = localStorage.getItem('token');
                const header = {
                    headers: {
                        'x-auth-token': token,
                    },
                };
                const response = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards', header);
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(true);
                setLoading(false);
            }
        };

        fetchMyCards();
    }, []);

    if (loading) return <div>רק רגע..</div>;
    if (error === true) return (
        <Typography variant="body2" align="center">
            בכדי לראות ולנהל את הכרטיסיות שלך עליך <Button color="primary" href="/Login">להתחבר</Button>
        </Typography>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <h1>הכרטיסים שלי</h1>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', padding: 2 }}>
                {data.map(product => (
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
                                    <Tooltip title="עריכה">
                                        <Button sx={{ margin: 0 }} variant="outlined" onClick={() => navigate(`/edit/${product._id}`)}>
                                            <EditIcon />
                                        </Button>
                                    </Tooltip>

                                    <Tooltip title="לייק">
                                        <Button sx={{ margin: "0 5px", color: "red" }} variant="outlined">
                                            <FavoriteIcon/>
                                        </Button>
                                    </Tooltip>
                                    <DeleteCard cardId={product._id} />
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

export default MyCards;
