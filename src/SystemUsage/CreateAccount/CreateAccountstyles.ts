import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

export const FormContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    padding: 2,
    '@media (max-width:600px)': {
        padding: 1, // For mobile view
    },
}));

export const BoxContainer = styled(Box)({
    width: 400,
    padding: "32px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Direct box-shadow value
    '@media (max-width:600px)': {
        width: "90%", // Full width on smaller screens
        padding: "24px", // Reduce padding on mobile
    },
});
export const ButtonStyles = styled(Button)(({ theme }) => ({
    backgroundColor: "#6C63FF",
    color: "#fff",
    padding: 1.5,
    fontSize: 16,
    textTransform: "none",
    width: "200px",
    "&:hover": {
        backgroundColor: "#5a54d2",
    },
    '@media (max-width:600px)': {
        width: "100%", // Full width button on small screens
    },
}));
