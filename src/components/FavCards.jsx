import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth } from './AuthContext';


const FavCardPage = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return (
        
        <Typography variant="body2" align="center">
            בכדי לראות את הכרטיסיות שאהבת עליך <Button color="primary" href="/Login">להתחבר</Button>
        </Typography>
    );

    return (
        <div style={{textAlign: "center"}}>
            <h3 >
                לצערי, לא הצלחתי להגיע לזה. 😢
            </h3>
        </div>
    );
};

export default FavCardPage;
