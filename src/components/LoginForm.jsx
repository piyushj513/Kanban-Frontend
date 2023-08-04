import { useState } from "react";
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
import { Link } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showFailMessage, setShowFailMessage] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setShowFailMessage(false);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowFailMessage(false);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //get user data from databse
      const response = await axios.post("https://localhost:8000/board/login/", {
        email,
        password,
      });
      //compare with user input
      const user = response.data.name;
      if (user) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", user);
        setShowLoginMessage(true);
        setTimeout(function () {
          window.location.href = "/home";
        }, 500);
      }
    } catch (error) {
      setShowFailMessage(true);
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
      {showFailMessage && (
        <Alert boxShadow={"4px 4px 10px rgba(0, 0, 255, 0.1)"} status="error">
          <AlertIcon />
          Invalid username or password
        </Alert>
      )}
      {showLoginMessage && (
        <Alert boxShadow={"4px 4px 10px rgba(0, 0, 255, 0.1)"} status="success">
          <AlertIcon />
          Login Successful
        </Alert>
      )}
      <Heading mb={2} display="flex" justifyContent="center">
        Login
      </Heading>
      <form onSubmit={handleLogin}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            boxShadow={"4px 4px 10px rgba(0, 0, 255, 0.1)"}
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            boxShadow={"4px 4px 10px rgba(0, 0, 255, 0.1)"}
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4} width="full">
          Login
        </Button>
      </form>
      <Link to="/register">
        <Button width="full" mt={2}>
          New User? Register now
        </Button>
      </Link>
    </Box>
  );
}

export default LoginForm;
