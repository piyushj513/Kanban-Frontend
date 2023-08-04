import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Button,
  Modal,
  ModalOverlay,
  useColorMode,
  InputGroup,
  Input,
  InputRightElement,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import CardEdit from "./CardEdit";
import Low from "../assets/low.svg";
import High from "../assets/high.svg";
import Med from "../assets/med.svg";
import { Doughnut, PolarArea } from "react-chartjs-2";
import "chart.js/auto";
import { SearchIcon } from "@chakra-ui/icons";

function CardList() {
  const { colorMode } = useColorMode();
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const statusLabels = {
    "not-started": "Not Started",
    "in-progress": "In Progress",
    completed: "Completed",
  };
  const todoCards = cards.filter(
    (card) => card.status === "not-started"
  ).length;
  const inProgressCards = cards.filter(
    (card) => card.status === "in-progress"
  ).length;
  const completedCards = cards.filter(
    (card) => card.status === "completed"
  ).length;

  const p1 = cards.filter((card) => card.priority === 1).length;
  const p2 = cards.filter((card) => card.priority === 2).length;
  const p4 = cards.filter((card) => card.priority === 4).length;

  const priorityMap = {
    1: { img: High, label: "High" },
    2: { img: Med, label: "Med" },
    3: { img: Med, label: "Med" },
    4: { img: Low, label: "Low" },
  };
  const statusColors = {
    light: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
    dark: ["#1c4075", "#491a2f", "#220039"],
  };
  const data1 = {
    labels: ["Not Started", "In Progress", "Completed"],
    datasets: [
      {
        data: [todoCards, inProgressCards, completedCards],
        backgroundColor: statusColors[colorMode],
        hoverOffset: 4,
      },
    ],
  };
  const data = {
    labels: ["High", "Med", "Low"],
    datasets: [
      {
        data: [p1, p2, p4],
        backgroundColor: statusColors[colorMode],
      },
    ],
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:8000/board/cards/");
        const data = await response.json();
        setCards(data);
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  //sort based on priority
  const getSortedCards = (status) => {
    return cards
      .filter((card) => card.status === status)
      .sort((a, b) => a.priority - b.priority);
  };

  const renderCards = (status) => {
    const sortedCards = getSortedCards(status);
    const filteredCards = searchQuery
      ? sortedCards.filter(
          (card) =>
            card.project_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            card.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            card.priority.toString().includes(searchQuery)
        )
      : sortedCards;

    return filteredCards.map((card) => (
      <Box
        onClick={() => handleCardClick(card)}
        key={card.card_id}
        borderWidth="1px"
        p={2}
        mb={1}
        width="auto"
        minHeight="108px"
        transition="0.2s ease-in"
        _hover={{
          transform: "scale(1.05)",
        }}
        backgroundColor={colorMode === "light" ? "white" : "black"}
      >
        <Text
          minWidth="125px"
          minHeight="17px"
          fontWeight="500"
          fontSize="14px"
          lineHeight="normal"
        >
          {card.project_name}
        </Text>
        <Text
          // minWidth="177px"
          // minHeight="45px"
          width="auto"
          maxW="177px"
          height="auto"
          top="352px"
          fontSize="12px"
          // overflow="hidden"
          // textOverflow="ellipsis"
          // whiteSpace="nowrap"
        >
          {card.description}
        </Text>
        <Grid mt="20px">
          <GridItem display="flex" justifyContent="end">
            <>
              <img
                width="9.5px"
                height="5.5575px"
                src={priorityMap[card.priority].img}
              />
              <Text ml="2.75px" minWidth="20px" height="12px" fontSize="10px">
                {priorityMap[card.priority].label}
              </Text>
            </>
            <Button
              marginLeft="10px"
              width="28px"
              height="16px"
              borderRadius="8px"
              background="#EEEEEE"
              size="sm"
            >
              <Text
                fontFamily="Inter"
                color="#333"
                width="7px"
                height="12px"
                fontSize="10px"
                fontWeight="400"
              >
                {card.story_points}
              </Text>
            </Button>
          </GridItem>
        </Grid>
      </Box>
    ));
  };

  return (
    <>
      <Box position="absolute" mt="250px" ml="950px" width="300px">
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Status</Tab>
            <Tab>Priority</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Doughnut data={data1} />
            </TabPanel>
            <TabPanel>
              <PolarArea data={data} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Grid
        templateColumns="repeat(5, 1fr)"
        marginTop="180px"
        marginLeft="360px"
        height="0px"
        width="791px"
      >
        <GridItem colSpan={3}>
          <InputGroup>
            <Input
              placeholder="Search cards..."
              _placeholder={{
                color: colorMode === "light" ? "black" : "white",
              }}
              value={searchQuery}
              onChange={handleChange}
            />
            <InputRightElement pointerEvents="none">
              <SearchIcon color={colorMode === "light" ? "black" : "white"} />
            </InputRightElement>
          </InputGroup>
        </GridItem>
      </Grid>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap="43px"
        position="absolute"
        minWidth="618px"
        height="637px"
        marginTop="70px"
        marginLeft="102px"
      >
        {["not-started", "in-progress", "completed"].map((status) => (
          <GridItem
            key={status}
            backgroundColor={colorMode === "light" ? "#eeeeee" : "#131720"}
            overflowY="auto"
          >
            <Text
              backgroundColor={colorMode === "light" ? "white" : "#1A202C"}
              pb="8px"
              minWidth="200px"
              fontSize="16px"
            >
              {statusLabels[status]}({getSortedCards(status).length})
            </Text>

            <Box pt="15px" pr="10px" pl="11px">
              {renderCards(status)}
            </Box>
          </GridItem>
        ))}
        {selectedCard && (
          <Modal size={"3xl"} isOpen={isModalOpen} onClose={handleCloseModal}>
            <ModalOverlay />
            <CardEdit
              selectedCard={selectedCard}
              onClose={handleCloseModal}
              isOpen={isModalOpen}
            />
          </Modal>
        )}
      </Grid>
    </>
  );
}

export default CardList;
