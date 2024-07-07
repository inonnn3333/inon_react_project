import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CssBaseline, Box, Container, Typography, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';
import DarkModeContext from './DarkModeContext';
import { useAuth } from './AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const navigate = useNavigate();
    const { darkMode } = useContext(DarkModeContext);
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({ email, password });
    };

    const handleLogin = async (user) => {
        try {
            const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login', user);
            if (response.status === 200) {
                const token = response.data;
                login(token);
                setMessage('התחברות הצליחה!');
                setShowSnackbar(true);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            setMessage('התחברות נכשלה');
            setShowSnackbar(true);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 2,
                    backgroundColor: darkMode ? 'grey.900' : 'white',
                    border: darkMode ? '1px solid white' : '1px solid black',
                }}
                elevation={3}
            >
                <Typography component="h1" variant="h5">
                    ברוכים הבאים!
                </Typography>
                <Typography component="p" variant="body2">
                    היכנס כדי להמשיך
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="כתובת מייל"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="סיסמא"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        התחבר
                    </Button>

                    {message && <Typography sx={{ mt: 2, color: message === 'התחברות הצליחה, מיד תעבור לדף הבית!' ? 'green' : 'red' }}>{message}</Typography>}
                    <Typography variant="body2" align="center">
                        אין לך חשבון? <Button color="primary" href="/sign-up">צור חשבון</Button>
                    </Typography>

                </Box>
            </Paper>
        </Container>
    );
}

export default Login;
