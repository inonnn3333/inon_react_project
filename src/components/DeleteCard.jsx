import React, { useState } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Snackbar from './SnackBar';


const DeleteCard = ({ cardId, onDelete }) => {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            window.location.reload();
        }, 2500);
    };

    const handleConfirmDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const header = {
                headers: {
                    'x-auth-token': token,
                    }
                };
            await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, header);
            if (onDelete) {
                onDelete(cardId);
            }
            handleClose();
            setStatus(true);
            
        } catch (error) {
            console.error("שגיאה במחיקת המוצר", error);
        }
    };

    return (
        <>
            <Tooltip title="מחיקה">
                <Button variant="outlined" onClick={handleClickOpen}>
                    <DeleteIcon />
                </Button>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"אישור מחיקה"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        האם אתה מעוניין למחוק את המוצר?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        לא
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                        כן
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar 
                message={<p>המחיקה בוצעה בהצלחה!</p>}
                showSnackbar={status === true}
            />
        </>
    );
};

export default DeleteCard;