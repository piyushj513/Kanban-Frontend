// src/components/DarkModeSwitch.js

import { useColorMode, IconButton, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useEffect, useRef } from "react";

const DarkModeSwitch = () => {
  const buttonRef = useRef(null);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     buttonRef.current.click();
  //   }, 10000);
  //   return () => clearInterval(intervalId);
  // }, []);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      position="absolute"
      marginTop="50px"
      marginLeft="970px"
      // ref={buttonRef}
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      aria-label="Toggle dark mode"
    />
  );
};

export default DarkModeSwitch;
