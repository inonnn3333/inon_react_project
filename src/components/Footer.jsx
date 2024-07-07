// src/Footer.js
import React, { useContext } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Box, Grid, Container, Tooltip } from '@mui/material';
import DarkModeContext from './DarkModeContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // ייבוא useAuth

const Footer = () => {
    const { darkMode } = useContext(DarkModeContext);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); // שימוש ב-useAuth

    const iconStyle = {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        color: darkMode ? 'white' : 'black',
        '&:hover': {
            transform: 'scale(1.1)',
            filter: darkMode ? 'drop-shadow(0 4px 8px rgba(255, 255, 255, 0.5))' : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))',
        },
    };

    return (
        <Box
            container
            justifyContent="center" alignItems="center"
            component="footer"
            sx={{
                margin: 0,
                position: 'fixed',
                bottom: 0,
                width: '100%',
                height: '50px', // הגדרת גובה נמוך יותר
                backgroundColor: darkMode ? '#333' : '#f8f8f8',
                boxShadow: darkMode ? '0 -2px 5px rgba(255,255,255,0.1)' : '0 -2px 5px rgba(0,0,0,0.1)',
                color: darkMode ? 'white' : 'black',
                zIndex: 1000, // הגדרת z-index של footer
            }}
        >
                <Grid container justifyContent="center" alignItems="center" spacing={2} sx={ {m: 0}}>
                    <Grid item sx={ {m: 0}} onClick={() => {navigate('/fav-cards')}}>
                        <Tooltip title="כרטיסי ביקור שאהבתי" >
                            <FavoriteBorderOutlinedIcon sx={iconStyle} />
                        </Tooltip>
                    </Grid>
                    <Grid item onClick={() => navigate('/my-cards')} sx={ {m: 0}}>
                        <Tooltip title="הכרטיסיות שלי">
                            <AccountBoxOutlinedIcon sx={iconStyle} />
                        </Tooltip>
                    </Grid>
                    {isAuthenticated && ( // הצגת האייקון רק אם המשתמש מחובר
                        <Grid item onClick={() => {navigate('/product/new')}} sx={ {m: 0}}>
                            <Tooltip title="כרטיס ביקור חדש">
                                <AddIcon sx={iconStyle} />
                            </Tooltip>
                        </Grid>
                    )}
                </Grid>
            {/* <Container width= '50%' justifyContent="center" alignItems="center" sx={ {m: 0} }>
            </Container> */}
        </Box>
    );
}

export default Footer;
