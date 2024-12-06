import { useState } from "react";
import {
  InputAdornment,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import KeySharpIcon from '@mui/icons-material/KeySharp';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from '@mui/icons-material/Login';
import { LOGIN_AUTHENTICATION_API_URL } from "../apiinterface";
import { Container, LoginContainer, HeadingLabel, EmailTextField, PasswordTextField, FooterLabel, LoginButton } from "./LoginStyle";
import { useNavigate } from "react-router-dom";
import { LoginMessage } from "../CommonMessage";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
  };

  const validate = () => {
    const newErrors = { email: "", password: "" };
    let hasErrors = false;
    if (!email.trim()) {
      newErrors.email = LoginMessage.E0001;
      hasErrors = true;
    } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
      newErrors.email = LoginMessage.E0002;
      hasErrors = true;
    }
    if (!password.trim()) {
      newErrors.password = LoginMessage.E0003;
      hasErrors = true;
    }
    setErrors(newErrors);
    return !hasErrors;
  };

  const handleLogin = () => {
    if(validate()){
        fetch(LOGIN_AUTHENTICATION_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }).then(response => {
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          return response.json();
        })
          .then(data => {
            if (data && data.data === 'OK') {
              navigate("/next");
            } else {
              setStatusMessage(LoginMessage.E0004); 
              navigate("/");
            }
          })
          .catch(error => console.error('Error:', error));
        }
    };

  return (
    <Container>
      <LoginContainer>
        <HeadingLabel variant="h4" align="center">
          Log In
        </HeadingLabel>
        {statusMessage && (
            <Typography
                variant="body1"
                sx={{
                    color: 'Red',
                    fontWeight: "bold",
                    marginTop: 3,
                    marginBottom: 3,
                    textAlign: "center",
                    height: 30
                }}
            >
                {statusMessage}
            </Typography>
        )}
        <EmailTextField
          fullWidth
          type="text"
          onChange={handleEmailChange}
          value={email}
          label="Email"
          variant="outlined"
          placeholder='Please Enter Your Mail'
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <PasswordTextField
          fullWidth
          type={showPassword ? "text" : "password"}
          onChange={handlePasswordChange}
          label="Password"
          variant="outlined"
          error={!!errors.password}
          placeholder='Please Enter Your Password'
          helperText={errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeySharpIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoginButton
          fullWidth
          variant="contained"
          onClick={handleLogin}
        >
          Login
          <LoginIcon />
        </LoginButton>
        <FooterLabel align="center">
          Don't have an account?{" "}
          <Link sx={{ color: "#6C63FF", fontWeight: 500 }}>
            Create Your Account
          </Link>
        </FooterLabel>
      </LoginContainer>
    </Container>
  );
}
