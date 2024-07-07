// src/themes.js
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    border: '1px solid #007FFF', // גבול שחור במצב בהיר
                },
            },
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    border: '1px solid #fff', // גבול לבן במצב כהה
                },
            },
        },
    },
});