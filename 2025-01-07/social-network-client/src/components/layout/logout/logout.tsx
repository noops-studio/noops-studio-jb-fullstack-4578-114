import React, { useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Cookies from 'js-cookie';

const LogoutPage = () => {
    useEffect(() => {
        // Delete the 'auth' cookie
        Cookies.remove('auth');

        // Redirect to the home page after a delay (optional)
        const timer = setTimeout(() => {
            window.location.href = '/';
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Container
            maxWidth={false}
            disableGutters
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                zIndex: 9999,
                textAlign: 'center',
            }}
        >
            <Box
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: 'white',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Thank You!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Thanks for using our social media software. We hope to see you again soon!
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { window.location.href = '/'; }}
                    sx={{ mt: 2 }}
                >
                    Go to Homepage
                </Button>
            </Box>
        </Container>
    );
};

export default LogoutPage;
