import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";

export const Container = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#F0F0F0",
})

export const LoginContainer = styled(Box)({
    display: "flex",         
    flexDirection: "column",
    alignItems: "center",    
    width: 400,
    padding: 32,             
    backgroundColor: "#fff",
    borderRadius: 8,        
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", 
    '@media (max-width:450px)': {
        width:  280, 
    },
    '@media (max-width:350px)': {
        width: 225, 
    },
})

export const HeadingLabel = styled(Typography)({
    marginBottom: 4, 
    color: "#6C63FF", 
    fontWeight: 600
})

export const EmailTextField = styled(TextField)({
    marginBottom: 20,
    height: 65,
})

export const PasswordTextField = styled(TextField)({
    marginBottom: 20,
    height: 65,
})

export const FooterLabel = styled(Typography)({
    marginTop: 10, 
    marginBottom: 10,
    '@media (max-width:450px)': {
        fontSize: '11px', 
    },
})

export const LoginButton = styled(Button)({
    backgroundColor: "#6C63FF",
    color: "#fff",
    padding: 1.5,
    fontSize: 16,
    width:'60%',
    minHeight:'20%',
    textTransform: "none",
    "&:hover": {
        backgroundColor: "#5a54d2",
    },
})