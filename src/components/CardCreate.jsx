import React, { useEffect, useState } from "react";
import axios from "axios";
import FormPage from "./FormPage";

function CardCreate({ onClose, isOpen }) {
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    project_name: "",
    col: 1,
    issue_type: "task",
    status: "not-started",
    reporter: "",
    story_points: 1,
    assignee: "",
    summary: "",
    description: "",
    priority: 3,
    acceptance_criteria: "",
    start_date: "",
    end_date: "",
  });
  const [showCreateMessage, setShowCreateMessage] = useState(false); //Create card alert
  //get user data to display assignee and reporter
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:8000/board/users/");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  //post card data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:8000/board/cards/",
        formData
      );
      setShowCreateMessage(true);
      setTimeout(function () {
        window.location.reload(true);
      }, 500);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <FormPage
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      formData={formData}
      userData={userData}
      onClose={onClose}
      isOpen={isOpen}
      showCreateMessage={showCreateMessage}
    />
  );
}

export default CardCreate;
