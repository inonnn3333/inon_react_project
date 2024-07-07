import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Snackbar from './SnackBar';
import useFormValidation from '../hooks/useFormValidation';

const SignUp = () => {
    const navigate = useNavigate();

    const initialFormState = {
        firstName: '',
        middleName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        imageUrl: '',
        imageAlt: '',
        state: '',
        country: '',
        city: '',
        street: '',
        houseNumber: '',
        zip: '',
        isBusiness: false
    };

    const placeholderTexts = {
        firstName: 'שם מלא',
        middleName: 'שם אמצעי',
        lastName: 'שם משפחה',
        phone: 'פלאפון',
        email: 'כתובת מייל',
        password: 'סיסמא',
        imageUrl: 'קישור לתמונה',
        imageAlt: 'טקסט אלטרנטיבי לתמונה',
        state: 'Enter your state',
        country: 'מדינה',
        city: 'עיר',
        street: 'רחוב',
        houseNumber: 'מספר בית',
        zip: 'מיקוד',
        isBusiness: 'התחבר כעסק'
    };

    const {
        formValues,
        errors,
        handleChange,
        handleReset,
        validateForm,
    } = useFormValidation(initialFormState);

    const [status, setStatus] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const user = {
                name: {
                    first: formValues.firstName,
                    last: formValues.lastName,
                    middle: formValues.middleName,
                },
                phone: formValues.phone,
                email: formValues.email,
                password: formValues.password,
                image: {
                    url: formValues.imageUrl,
                    alt: formValues.imageAlt,
                },
                address: {
                    state: formValues.state,
                    country: formValues.country,
                    city: formValues.city,
                    street: formValues.street,
                    houseNumber: formValues.houseNumber,
                    zip: formValues.zip,
                },
                isBusiness: formValues.isBusiness
            };

            try {
                const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', user);
                if (response.status === 200) {
                    localStorage.setItem('userToken', response.data.token);
                    setStatus(true);
                    setCountdown(3);
                    setMessage('ההרשמה הצליחה!');
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                }
            } catch (error) {
                setMessage('הרישום נכשל');
            }
        } else {
            setStatus('error');
        }
    };

    useEffect(() => {
        if (status === true) {
            if (countdown > 0) {
                const timer = setTimeout(() => {
                    setCountdown(countdown - 1);
                }, 1000);
                return () => clearTimeout(timer);
            } else {
                setStatus(false);
            }
        }
    }, [status, countdown]);

    const handleCheckboxChange = (event) => {
        handleChange({
            target: {
                name: event.target.name,
                value: event.target.checked
            }
        });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                '& .MuiTextField-root': { m: 0, width: '100%' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 2
            }}
            noValidate
            autoComplete="on"
        >
            <Typography variant="h4" gutterBottom>
                הרשמה
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {Object.keys(initialFormState).map((field) => (
                    field !== 'isBusiness' && (
                    <Grid item xs={12} sm={5} key={field}>
                        <TextField
                            name={field}
                            label={placeholderTexts[field]}
                            value={formValues[field]}
                            onChange={handleChange}
                            type={field === 'email' ? 'email' : 'text'}
                            fullWidth
                            error={!!errors[field]}
                            helperText={errors[field]}
                        />
                    </Grid>
                )))}
                <Grid item xs={10} >
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="isBusiness"
                                checked={formValues.isBusiness}
                                onChange={handleCheckboxChange}
                                color="primary"
                            />
                        }
                        label={placeholderTexts.isBusiness}
                    />
                </Grid>
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', width: '50%', marginBottom: '7em' }}>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    הירשם
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
            <Snackbar 
                message={<p>
                    {message}
                </p>}
                showSnackbar={status === true || message !== ''}
            />
        </Box>
    );
};

export default SignUp;
