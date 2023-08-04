import React, { useEffect, useState } from "react";
import axios from "axios";
import FormPage from "./FormPage";

function CardEdit({ selectedCard, onClose, isOpen }) {
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    project_name: selectedCard.project_name,
    col: selectedCard.col,
    issue_type: selectedCard.issue_type,
    status: selectedCard.status,
    reporter: selectedCard.reporter,
    story_points: selectedCard.story_points,
    assignee: selectedCard.assignee,
    summary: selectedCard.summary,
    description: selectedCard.description,
    priority: selectedCard.priority,
    acceptance_criteria: selectedCard.acceptance_criteria,
    start_date: selectedCard.start_date,
    end_date: selectedCard.end_date,
  });
  const [showUpdateMessage, setShowUpdateMessage] = useState(false); //Update alert
  const [showDeleteMessage, setShowDeleteMessage] = useState(false); //Delete alert
  const mode = "edit"; //for delete button

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
  //update selected data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:8000/board/cards/${selectedCard.card_id}`,
        formData
      );
      setShowUpdateMessage(true);
      setTimeout(function () {
        window.location.reload(true);
      }, 500);
    } catch (error) {
      alert(error);
    }
  };
  //delete selected card
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://localhost:8000/board/cards/${selectedCard.card_id}`
      );
      if (response.status === 204) {
        setShowDeleteMessage(true);
        setTimeout(function () {
          window.location.reload(true);
        }, 500);
      }
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
      mode={mode}
      handleDelete={handleDelete}
      showUpdateMessage={showUpdateMessage}
      showDeleteMessage={showDeleteMessage}
    />
  );
}

export default CardEdit;
