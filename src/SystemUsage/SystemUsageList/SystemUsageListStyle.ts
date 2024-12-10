import styled from "@emotion/styled";
import Box from "@mui/material/Box";

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
    width: 800,
    padding: "32px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Direct box-shadow value
    '@media (max-width:600px)': {
        width: "90%", // Full width on smaller screens
        padding: "24px", // Reduce padding on mobile
    },
});