import React, { useState, useContext } from 'react';
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import ProductView from "./components/ProductView";
import ProductNew from "./components/ProductNew";
import ProductEdit from './components/ProductEdit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { ThemeProvider } from '@mui/material/styles';
import { Paper } from "@mui/material";
// import ProtectedRoute from "./components/ProtectedRoute";
import About from "./components/About";
import DarkModeContext, { DarkModeProvider } from './components/DarkModeContext';
import { lightTheme, darkTheme } from "./components/styles/themes";
import { AuthProvider } from './components/AuthContext';
import { TokenProvider } from './components/TokenProvider';
import { TheUserProvider } from './components/UserProvider';
import MyCards from './components/MyCards';
import FavCard from './components/FavCards';
import './components/styles/css.css'


function App() {
    const { darkMode } = useContext(DarkModeContext);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <AuthProvider>
            <TokenProvider>
                <TheUserProvider>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                <Paper>
                    <div className='main-content'>
                        <Router>
                            <Header onSearch={handleSearch} />
                            <Routes>
                                <Route path="/" element={<Gallery searchQuery={searchQuery} />} />
                                <Route path="/product/:product_id" element={<ProductView />} />
                                <Route exact path="/edit/:product_id" element={<ProductEdit />} />
                                <Route path="/product/new" element={<ProductNew />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/sign-up" element={<SignUp />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/my-cards" element={<MyCards />} />
                                <Route path="/fav-cards" element={<FavCard />} />
                            </Routes>
                            <Footer />
                        </Router>
                    </div>
                </Paper>
            </ThemeProvider>
            </TheUserProvider>
            </TokenProvider>
        </AuthProvider>
    );
}

const RootApp = () => (
    <DarkModeProvider>
        <App />
    </DarkModeProvider>
);

export default RootApp;
