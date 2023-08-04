import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [showRegisterMessage, setShowRegisterMessage] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:8000/board/register/",
        formData
      );
      setShowRegisterMessage(true);
      setTimeout(function () {
        navigate("/");
      }, 500);
    } catch (error) {
      alert("User with this email already exists");
      // alert((error.response.request.responseText));
    }
  };

  return (
    <Box
      boxShadow={"4px 4px 10px rgba(0, 0, 255, 0.1)"}
      maxWidth="400px"
      margin="auto"
      mt={40}
      p={4}
    >
      {showRegisterMessage && (
        <Alert boxShadow={"4px 4px 10px rgba(0, 0, 255, 0.1)"} status="success">
          <AlertIcon />
          User Registered Successfully
        </Alert>
      )}
      <Heading mb={2} display="flex" justifyContent="center">
        Register
      </Heading>
      <form onSubmit={handleRegistration}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            required
            name="password"
            type="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            value={formData.password}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            required
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4} width="full">
          Register
        </Button>
      </form>
      <Link to="/">
        <Button width="full" mt={2}>
          Already Have an account? Login
        </Button>
      </Link>
    </Box>
  );
}

export default RegistrationForm;
