import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Container, Toolbar, IconButton, Typography, Menu, Button, Tooltip, MenuItem, Switch, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeContext from './DarkModeContext';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useAuth } from './AuthContext';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonIcon from '@mui/icons-material/Person';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    // עיצוב ה-Switch נשאר אותו הדבר
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Header = ({ onSearch }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const { isAuthenticated, logout } = useAuth();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavigate = (path) => {
        navigate(path);
        handleCloseNavMenu();
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={() => handleNavigate('/')}>
                                <Typography textAlign="center">BCard</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigate('/about')}>
                                <Typography textAlign="center">אודות</Typography>
                            </MenuItem>
                            {isAuthenticated ? (
                                <>
                                    <MenuItem onClick={() => handleNavigate('/my-cards')}>
                                        <Typography textAlign="center">הכרטיסיות שלי</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleNavigate('/fav-cards')}>
                                        <Typography textAlign="center">הכרטיסיות שאהבתי</Typography>
                                    </MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={() => handleNavigate('/sign-up')}>
                                        <Typography textAlign="center">הרשמה</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleNavigate('/login')}>
                                        <Typography textAlign="center">התחברות</Typography>
                                    </MenuItem>
                                </>
                            )}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: "Rubik",
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        BCard
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={() => handleNavigate('/about')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            אודות
                        </Button>

                        {isAuthenticated ? (
                            <>
                                <Button
                                    onClick={() => handleNavigate('/my-cards')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    הכרטיסיות שלי
                                </Button>
                                <Button
                                    onClick={() => handleNavigate('/fav-cards')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    הכרטיסיות שאהבתי
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    onClick={() => handleNavigate('/sign-up')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    הרשמה
                                </Button>
                                <Button
                                    onClick={() => handleNavigate('/login')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    התחברות
                                </Button>
                            </>
                        )}
                    </Box>
                    <FormControlLabel
                        control={
                            <MaterialUISwitch
                                sx={{ m: 1 }}
                                defaultChecked={darkMode}
                                color="default"
                                onChange={toggleDarkMode}
                            />}
                    />
                    <Search>
                        <SearchIconWrapper>
                            {/* <SearchIcon /> */}
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="חיפוש..."
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} style={isAuthenticated ? 
                                {background: "#2E7D32"} :
                                {background: "#8d8d8d"}
                            }>
                                {isAuthenticated ? <PersonIcon /> : <PersonOffIcon />}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {isAuthenticated ? (
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">התנתק</Typography>
                                </MenuItem>
                            ) : (
                                <MenuItem onClick={() => handleNavigate('/login')}>
                                    <Typography textAlign="center">התחברות</Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
