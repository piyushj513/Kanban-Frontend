import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function ErrorLogin() {
  return (
    <Box m={300}>
      <h1>Welcome</h1>
      <p>Please log in to access the full content.</p>
      <Link to="/">
        <Button colorScheme="blue">Login</Button>
      </Link>
    </Box>
  );
}

export default ErrorLogin;
