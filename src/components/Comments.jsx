import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

const CommentCard = ({ username, comment, timestamp }) => {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
      <Flex align="baseline" mb={2}>
        <Text fontWeight="bold" fontSize="lg">
          {username}
        </Text>
        <Text ml={2} fontSize="sm" color="gray.500">
          {timestamp}
        </Text>
      </Flex>
      <Text>{comment}</Text>
    </Box>
  );
};

function Comments({ formData }) {
  const [comments, setComments] = useState([]);

  // Function to fetch comments from API (example)
  const fetchComments = async () => {
    try {
      const response = await fetch("https://localhost:8000/board/comments/");
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    // Fetch comments when component mounts
    fetchComments();
  }, []);

  return (
    <Box mt={8}>
      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          username={comment.user}
          comment={comment.comment_desc}
          timestamp={comment.ts}
        />
      ))}
    </Box>
  );
}

export default Comments;
