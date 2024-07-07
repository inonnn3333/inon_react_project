import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import useFormValidation from '../hooks/useFormValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToken } from './TokenProvider';
import SnackBar from './SnackBar';

const ProductNew = () => {
    const navigate = useNavigate();
    const { theToken } = useToken();
    const [status, setStatus] = useState(null);

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

    const placeholderTexts = {
        title: 'כותרת',
        subtitle: 'כותרת משנה',
        description: 'תיאור',
        phone: 'פלאפון',
        email: 'כתובת מייל',
        web: 'אתר אינטרנט',
        'image.url': 'קישור לתמונה',
        'image.alt': 'טקסט אלטרנטיבי לתמונה',
        'address.state': 'מדינה',
        'address.country': 'ארץ',
        'address.city': 'עיר',
        'address.street': 'רחוב',
        'address.houseNumber': 'מספר בית',
        'address.zip': 'מיקוד'
    };

    const {
        formValues,
        errors,
        handleChange,
        handleReset,
        validateForm,
    } = useFormValidation(initialFormState);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(
                    'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards',
                    formValues,
                    {
                        headers: {
                            'x-auth-token': theToken,
                        },
                    }
                );
                setStatus(true)

                setTimeout(() => {
                    navigate('/my-cards');
                }, 3000);
                console.log(response.data);
            } catch (err) {
                setStatus(false)
            }
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                '& .MuiTextField-root': { m: 0, width: '95%' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 2
            }}
            noValidate
            autoComplete="on"
        >
            <Typography variant="h4" gutterBottom>
                כרטיס ביקור חדש
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {Object.keys(placeholderTexts).map((field) => (
                    <Grid item xs={12} sm={6} key={field}>
                        <TextField
                            name={field}
                            label={placeholderTexts[field]}
                            value={field.includes('.')
                                ? formValues[field.split('.')[0]][field.split('.')[1]]
                                : formValues[field]}
                            onChange={handleChange}
                            type={field === 'email' ? 'email' : 'text'}
                            fullWidth
                            error={!!errors[field]}
                            helperText={errors[field]}
                            placeholder={placeholderTexts[field]}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', width: '50%' }}>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    שלח
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleReset}
                    sx={{ ml: 2 }}
                >
                    נקה הכל
                </Button>
            </Box>
            <SnackBar 
                message={<p>הכרטיס נוצר בהצלחה!</p>}
                showSnackbar={status === true}
                type="success"
            />
            <SnackBar 
                message={<p>משהו השתבש..</p>}
                showSnackbar={status === false}
                type="error"
            />
        </Box>
    );
};

export default ProductNew;
