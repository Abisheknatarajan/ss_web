import React, { useState } from "react";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { CREATE } from "../../apiinterface";
import { ButtonStyles, BoxContainer, FormContainer } from "./CreateAccountstyles";
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function CreateAccount() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [statusMessage, setStatusMessage] = useState<string>("");  // Message state
    const [statusColor, setStatusColor] = useState<string>(""); // Color state

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the field
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword((prev) => !prev);
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};
        const passwordValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/;
        const emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!formData.firstName.trim()) {
            newErrors.firstName = "Please Enter Firstname";
        } else {
            if (!formData.lastName.trim()) {
                newErrors.lastName = "Please Enter Lastname";
            } else {
                if (!formData.email.trim()) {
                    newErrors.email = "Please Enter Email";
                } else if (!emailValidation.test(formData.email)) {
                    newErrors.email = "Please Enter Valid Email";
                } else {
                    if (!formData.password.trim()) {
                        newErrors.password = "Please Enter Password";
                    } else if (!passwordValidation.test(formData.password)) {
                        newErrors.password =
                            "Use Strong Password(1,!,#,or%)";
                    } else {
                        if (!formData.confirmPassword.trim()) {
                            newErrors.confirmPassword = "Please Enter ConformPassword";
                        } else if (formData.password !== formData.confirmPassword) {
                            newErrors.confirmPassword = "Password Missmatched";
                        }
                    }
                }
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (validateForm()) {
            fetch(CREATE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.firstName + " " + formData.lastName,
                    email: formData.email,
                    password: formData.password, // Send encrypted password
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setStatusMessage("Registration Successful!");
                    setStatusColor("green"); // Set success message color to green
                })
                .catch((error) => {
                    console.error("Error:", error);
                    setStatusMessage("Registration Failed!");
                    setStatusColor("red"); // Set error message color to red
                });
        }
    };

    return (
        <FormContainer>
            <BoxContainer>
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ marginBottom: 4, color: "#6C63FF", fontWeight: 400 }}
                >
                    Create Your Account
                </Typography>
                {statusMessage && (
                    <Typography
                        variant="body1"
                        sx={{
                            color: statusColor,
                            fontWeight: "bold",
                            marginTop: 3,
                            textAlign: "center",
                            height: 30
                        }}
                    >
                        {statusMessage}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        fullWidth
                        label="First Name"
                        style={{ marginTop: 20, height: 55 }}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                        label="Last Name"
                        style={{ marginTop: 30, height: 55 }}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        label="Email"
                        style={{ marginTop: 30, height: 55 }}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        label="Password"
                        style={{ marginTop: 30, height: 55 }}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <KeyIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        label="Confirm Password"
                        style={{ marginTop: 30, height: 55 }}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <KeyIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                        <ButtonStyles type="submit" variant="contained">
                            Register
                        </ButtonStyles>
                    </Box>
                </form>

                <Box sx={{ textAlign: "center", marginTop: 2 }}>
                    <Typography variant="body2" >
                        Already have an account?{" "}
                        <a href="/login" style={{ color: "#6C63FF", textDecoration: "none" }}>
                            Login
                        </a>
                    </Typography>
                </Box>
            </BoxContainer>
        </FormContainer>
    );
}
