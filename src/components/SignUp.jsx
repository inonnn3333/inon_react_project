import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserValidation from '../hooks/useUserValidation';

const SignUp = () => {
    const navigate = useNavigate();


    const initialFormState = {
        name: {
            first: '',
            middle: '',
            last: ''
        },
        phone: '',
        email: '',
        password: '',
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
        },
        isBusiness: false,
    };

    const placeholderTexts = {
        first: 'שם פרטי',
        middle: 'שם אמצעי',
        last: 'שם משפחה',
        phone: 'פלאפון',
        email: 'כתובת מייל',
        password: 'סיסמא',
        url: 'קישור לתמונה',
        alt: 'טקסט אלטרנטיבי לתמונה',
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
    } = useUserValidation(initialFormState);

    const [status, setStatus] = useState(false);
    // const [countdown, setCountdown] = useState(3);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const user = {
                name: {
                    first: formValues.name.first,
                    last: formValues.name.last,
                    middle: formValues.name.middle,
                },
                phone: formValues.phone,
                email: formValues.email,
                password: formValues.password,
                image: {
                    url: formValues.image.url,
                    alt: formValues.image.alt,
                },
                address: {
                    state: formValues.address.state,
                    country: formValues.address.country,
                    city: formValues.address.city,
                    street: formValues.address.street,
                    houseNumber: formValues.address.houseNumber,
                    zip: formValues.address.zip,
                },
                isBusiness: formValues.isBusiness
            };

            try {
                const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', user);
                if (response.status === 201) {
                    localStorage.setItem('userToken', response.data.token);
                    setStatus(true);
                    // setCountdown(3);
                    setMessage('ההרשמה הצליחה, יש להתחבר על מנת להמשיך!');
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                }
            } catch (error) {
                setMessage('הרישום נכשל');
            }
        } else {
            setStatus('error');
        }
    };

    // useEffect(() => {
    //     if (status === true) {
    //         if (countdown > 0) {
    //             const timer = setTimeout(() => {
    //                 setCountdown(countdown - 1);
    //             }, 1000);
    //             return () => clearTimeout(timer);
    //         } else {
    //             setStatus(false);
    //         }
    //     }
    // }, [status, countdown]);

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
                <Grid item xs={12} sm={5}>
                    <TextField
                        name="name.first"
                        label={placeholderTexts.first}
                        value={formValues.name.first}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors['name.first']}
                        helperText={errors['name.first']}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        name="name.middle"
                        label={placeholderTexts.middle}
                        value={formValues.name.middle}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors['name.middle']}
                        helperText={errors['name.middle']}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        name="name.last"
                        label={placeholderTexts.last}
                        value={formValues.name.last}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors['name.last']}
                        helperText={errors['name.last']}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        name="phone"
                        label={placeholderTexts.phone}
                        value={formValues.phone}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        name="email"
                        label={placeholderTexts.email}
                        value={formValues.email}
                        onChange={handleChange}
                        type="email"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        name="password"
                        label={placeholderTexts.password}
                        value={formValues.password}
                        onChange={handleChange}
                        type="password"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        name="image.url"
                        label={placeholderTexts.url}
                        value={formValues.image.url}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors['image.url']}
                        helperText={errors['image.url']}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        name="image.alt"
                        label={placeholderTexts.alt}
                        value={formValues.image.alt}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors['image.alt']}
                        helperText={errors['image.alt']}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        name="address.state"
                        label={placeholderTexts.state}
                        value={formValues.address.state}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors['address.state']}
                        helperText={errors['address.state']}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        name="address.country"
                        label={placeholderTexts.country}
                        value={formValues.address.country}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors['address.country']}
                        helperText={errors['address.country']}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        name="address.city"
                        label={placeholderTexts.city}
                        value={formValues.address.city}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors['address.city']}
                        helperText={errors['address.city']}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        name="address.street"
                        label={placeholderTexts.street}
                        value={formValues.address.street}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors['address.street']}
                        helperText={errors['address.street']}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        name="address.houseNumber"
                        label={placeholderTexts.houseNumber}
                        value={formValues.address.houseNumber}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors['address.houseNumber']}
                        helperText={errors['address.houseNumber']}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        name="address.zip"
                        label={placeholderTexts.zip}
                        value={formValues.address.zip}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors['address.zip']}
                        helperText={errors['address.zip']}
                    />
                </Grid>
                <Grid item xs={10}>
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
                <Button variant="contained" color="primary" type="submit">
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
            {status && <Typography sx={{ mt: 2, color: message === 'הרישום בוצע בהצלחה, מיד תעבור לדף הבית!' ? 'green' : 'red' }}>{message}</Typography>}
        </Box>
    );
};

export default SignUp;
