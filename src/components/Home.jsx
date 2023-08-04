import React, { useState } from "react";
import CardCreate from "./CardCreate";
import CardList from "./CardList";
import { Heading, Button, Text, useColorMode } from "@chakra-ui/react";
import DarkModeSwitch from "./DarkModeSwitch";
function Home() {
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <>
      <Heading
        position="absolute"
        minWidth="239px"
        minHeight="44px"
        top="102px"
        left="102px"
        fontFamily="Inter"
        fontWeight={400}
        fontSize="36px"
      >
        Kanban Board
      </Heading>
      <Button
        backgroundColor={colorMode === "light" ? "#eeeeee" : "#131720"}
        top="50px"
        left="1150px"
        onClick={handleLogout}
      >
        Logout
      </Button>
      <DarkModeSwitch />
      <Text
        position="absolute"
        minWidth="210px"
        minHeight="29px"
        top="146px"
        left="102px"
        fontWeight={400}
        fontSize="24px"
        lineHeight="normal"
      >
        {localStorage.getItem("user")}’s tasks
      </Text>
      <Button
        onClick={() => setIsOpen(true)}
        position="absolute"
        _hover={{ backgroundColor: "blue" }}
        maxWidth="79px"
        maxHeight="30px"
        top="225px"
        left="106px"
        border="1px solid #D9D9D9"
        background="#2A4ECB"
        borderRadius="4px"
      >
        <Text
          fontFamily="Inter"
          color="#FFF"
          width="45px"
          height="17px"
          fontSize="14px"
          fontWeight="400"
          lineHeight="normal"
        >
          Create
        </Text>
      </Button>
      <CardCreate onClose={handleCloseModal} isOpen={isOpen} />
      <CardList />
    </>
  );
}

export default Home;
