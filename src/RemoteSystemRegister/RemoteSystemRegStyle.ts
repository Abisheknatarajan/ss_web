import styled from "@emotion/styled";
import { Box, Button, Container, Typography } from "@mui/material";

export const TopContainer = styled(Box)({
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})

export const MainContainer = styled(Container)({
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    width:550,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    '@media (max-width:500px)': {
      width: '90%', 
    },
    '@media (min-width:530px)': {
      width: '470px', 
    },
})

export const HeadingLabel = styled(Typography)({
    textAlign:"center",
    fontWeight:"bold",
    color: '#6c63ff',
    marginBottom: '2rem' ,
    '@media (max-width:500px)': {
        fontSize:'24px' , 
    },
    '@media (max-width:360px)': {
        fontSize:'21px' , 
    },
})

export const AlartLabel = styled(Typography)({
    fontWeight: "bold",
    marginTop: 3,
    marginBottom: 3,
    textAlign: "center",
    height: 30
})

export const RegBtnContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
})

export const RegBtn = styled(Button)({
    backgroundColor: '#6c63ff',
    color: 'white',
    padding: '0.75rem',
    marginTop: '1rem',
    textTransform: 'none',
    fontSize: '1rem',
    '&:hover': {
    backgroundColor: '#5b54d7',
    },
    width:'55%',
    alignItems:'center',
})