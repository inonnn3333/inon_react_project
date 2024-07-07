import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box, Paper } from "@mui/material";
import { styled } from '@mui/system';

const CustomBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxSizing: 'border-box',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
    color: theme.palette.text.primary,
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: theme.shape.borderRadius,
    maxWidth: '800px',
    width: '100%',
    margin: theme.spacing(2, 0),
}));

const CustomButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const About = () => {
    const navigate = useNavigate();

    return (
        <CustomBox>
            <CustomPaper>
                <CustomButton
                    variant="contained"
                    onClick={() => navigate("/")}
                >
                    חזרה לדף הבית
                </CustomButton>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        ברוכים הבאים ל-BCard
                    </Typography>
                    <Typography variant="body1" paragraph>
                        הפלטפורמה המובילה לניהול ושיתוף כרטיסי ביקור באינטרנט. הפלטפורמה שלנו מספקת פתרון מקיף ליצירה, עריכה וארגון כרטיסי הביקור שלך בקלות, כך שתמיד תשאיר רושם נהדר.
                    </Typography>
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                        איך להשתמש ב-BCard
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" paragraph>
                            <strong>הרשמה והתחברות:</strong> צור חשבון על ידי
                            <Button color="secondary" href="/sign-up">הרשמה</Button>
                            עם כתובת האימייל שלך. אם כבר יש לך חשבון, פשוט
                            <Button color="secondary" href="/Login">התחבר</Button>.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>יצירת כרטיס ביקור:</strong> עבור לקטגוריית 'יצירת כרטיס', מלא את פרטיך והעלה תמונת פרופיל. שמור את הכרטיס כדי להתחיל להשתמש בו.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>ערוך את הכרטיסים שלך:</strong> עבור ל
                            <Button color="secondary" href="/my-cards">כרטיסיות שלי</Button>
                            כדי לצפות ולערוך את הכרטיסים הקיימים שלך. ערוך את השינויים הנדרשים ושמור אותם.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>ארגן את הכרטיסים שלך:</strong> השתמש בדף
                            <Button color="secondary" href="/fav-cards">כרטיסיות שאהבתי</Button>
                            כך שיהיה קל יותר לנהל ולמצוא אותם מאוחר יותר.
                        </Typography>
                    </Box>
                </Box>
            </CustomPaper>
        </CustomBox>
    );
};

export default About;
