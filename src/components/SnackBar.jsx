import { useState, useEffect } from "react";
import './styles/css.css';

const Snackbar = ({ message, showSnackbar, type }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (showSnackbar) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showSnackbar]);

    return (
        <div id="snackbar" className={`${show ? 'show' : ''} ${type}`}>
            {message}
        </div>
    );
}

export default Snackbar;
