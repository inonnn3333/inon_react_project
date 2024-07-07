import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip, Box, Button, Typography, Card, CardContent, CardActions, Grid } from '@mui/material';
import DarkModeContext from './DarkModeContext';
import { useAuth } from './AuthContext';
import DeleteCard from './DeleteCard';
import FavoriteIcon from '@mui/icons-material/Favorite';


const ProductView = () => {
    const { product_id } = useParams();
    const { darkMode } = useContext(DarkModeContext);
    const { isAuthenticated } = useAuth();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${product_id}`);
                setData(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError("המוצר לא נמצא");
                } else {
                    setError("שגיאה בטעינת המוצר");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [product_id]);

    if (isLoading) return <div>רק רגע..</div>;
    if (error) return <div>יש בעיה: {error}</div>;

    const containerStyle = {
        backgroundColor: darkMode ? '#333' : '#fff',
        color: darkMode ? '#fff' : '#000',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: darkMode ? '0 2px 10px rgba(255, 255, 255, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.1)',
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <Card sx={{ ...containerStyle, width: "80%" }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <img src={data.image?.url || 'ללא'} alt={data.image?.alt || 'ללא'} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }} color="text.primary">
                                {data.title || 'ללא'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }} color="text.secondary">
                                {data.subtitle || 'ללא'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                {data.description || 'ללא'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                מספר פלאפון ליצירת קשר:
                            </Typography>
                            <Typography variant="body2">
                                {data.phone || 'ללא'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                כתובת אימייל:
                            </Typography>
                            <Typography variant="body2">
                                {data.email || 'ללא'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                אתר אינטרנט:
                            </Typography>
                            <Typography variant="body2">
                                {data.web || 'ללא'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                כתובת:
                            </Typography>
                            <Typography variant="body2">
                                {`${data.address?.street || 'ללא'} ${data.address?.houseNumber || 'ללא'}, ${data.address?.city || 'ללא'}, ${data.address?.state || 'ללא'}, ${data.address?.country || 'ללא'}, ${data.address?.zip || 'ללא'}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', gap: 1 }}>
                    {isAuthenticated ? (
                        <>
                            <Button variant="outlined" component={Link} to={`/edit/${product_id}`}>
                                <Tooltip title="עריכה">
                                    <EditIcon />
                                </Tooltip>
                            </Button>
                            <Tooltip title="לייק">
                                        <Button sx={{ margin: "0 5px", color: "red" }} variant="outlined">
                                            <FavoriteIcon/>
                                        </Button>
                                    </Tooltip>
                            <DeleteCard cardId={product_id} />

                        </>
                    ) : (
                        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                            חזרה לדף הבית
                        </Button>
                    )}
                </CardActions>
            </Card>
        </Box>
    );
};

export default ProductView;
