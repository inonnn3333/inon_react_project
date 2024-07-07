import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import DarkModeContext from './DarkModeContext';
import { useToken } from './TokenProvider';
import SnackBar from './SnackBar';

const initialFormState = {
    title: '',
    subtitle: '',
    description: '',
    phone: '',
    email: '',
    web: '',
    image: {
        url: '',
        alt: ''
    },
    address: {
        state: '',
        country: '',
        city: '',
        street: '',
        houseNumber: '',
        zip: ''
    }
};

const ProductEdit = () => {
    const { product_id } = useParams();
    const navigate = useNavigate();
    const { darkMode } = useContext(DarkModeContext);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState(initialFormState);
    const { theToken } = useToken();
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${product_id}`);
                const product = response.data;
                setFormState({
                    title: product.title,
                    subtitle: product.subtitle,
                    description: product.description,
                    phone: product.phone,
                    email: product.email,
                    web: product.web,
                    image: {
                        url: product.image.url,
                        alt: product.image.alt
                    },
                    address: {
                        state: product.address.state,
                        country: product.address.country,
                        city: product.address.city,
                        street: product.address.street,
                        houseNumber: product.address.houseNumber,
                        zip: product.address.zip
                    }
                });
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

    const handleSave = async () => {
        try {
            const response = await axios.put(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${product_id}`,
                formState,
                {
                    headers: {
                        'x-auth-token': theToken,
                    },
                }
            );
            setStatus(true);
            
            setTimeout(() => {
                navigate(`/product/${product_id}`);
            }, 3000);
        } catch (error) {
            setError("שגיאה בעדכון המוצר");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        if (keys.length === 2) {
            setFormState((prevState) => ({
                ...prevState,
                [keys[0]]: {
                    ...prevState[keys[0]],
                    [keys[1]]: value
                }
            }));
        } else {
            setFormState((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

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
        <Box sx={{ ...containerStyle, display: 'flex', justifyContent: 'center', padding: 2 }}>
            <Card sx={{ width: "80%", padding: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 'bold', mb: 2 }} color="text.primary" gutterBottom>
                        עריכת כרטיס ביקור
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="כותרת"
                                    variant="outlined"
                                    fullWidth
                                    name="title"
                                    value={formState.title}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="תת כותרת"
                                    variant="outlined"
                                    fullWidth
                                    name="subtitle"
                                    value={formState.subtitle}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="תיאור"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    name="description"
                                    value={formState.description}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="מספר פלאפון"
                                    variant="outlined"
                                    fullWidth
                                    name="phone"
                                    value={formState.phone}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="אימייל"
                                    variant="outlined"
                                    fullWidth
                                    name="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="אתר"
                                    variant="outlined"
                                    fullWidth
                                    name="web"
                                    value={formState.web}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="כתובת תמונה"
                                    variant="outlined"
                                    fullWidth
                                    name="image.url"
                                    value={formState.image.url}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="תיאור תמונה"
                                    variant="outlined"
                                    fullWidth
                                    name="image.alt"
                                    value={formState.image.alt}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="מדינה"
                                    variant="outlined"
                                    fullWidth
                                    name="address.state"
                                    value={formState.address.state}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="ארץ"
                                    variant="outlined"
                                    fullWidth
                                    name="address.country"
                                    value={formState.address.country}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="עיר"
                                    variant="outlined"
                                    fullWidth
                                    name="address.city"
                                    value={formState.address.city}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="רחוב"
                                    variant="outlined"
                                    fullWidth
                                    name="address.street"
                                    value={formState.address.street}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="מספר בית"
                                    variant="outlined"
                                    fullWidth
                                    name="address.houseNumber"
                                    value={formState.address.houseNumber}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="מיקוד"
                                    variant="outlined"
                                    fullWidth
                                    name="address.zip"
                                    value={formState.address.zip}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={handleSave}
                    >
                        שמור שינויים
                    </Button>
                </CardActions>
            </Card>
            <SnackBar 
                message={<p>
                    הכרטיס התעדכן בהצלחה!
                </p>}
                showSnackbar={status === true}
            />
        </Box>
    );
};

export default ProductEdit;
