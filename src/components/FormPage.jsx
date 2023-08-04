import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  GridItem,
  Grid,
  Button,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
  ModalOverlay,
  Alert,
  AlertIcon,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React from "react";
import Comments from "./Comments";

function FormPage({
  handleSubmit,
  handleInputChange,
  formData,
  userData,
  onClose,
  isOpen,
  mode,
  handleDelete,
  showUpdateMessage,
  showCreateMessage,
  showDeleteMessage,
}) {
  return (
    <Modal size={"3xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>
            {showUpdateMessage && (
              <Alert status="success">
                <AlertIcon />
                Task Updated Successfully
              </Alert>
            )}
            {showCreateMessage && (
              <Alert status="success">
                <AlertIcon />
                Task Created Successfully
              </Alert>
            )}
            {showDeleteMessage && (
              <Alert status="success">
                <AlertIcon />
                Task Deleted Successfully
              </Alert>
            )}
            {mode === "edit" ? (
              <Text fontSize="26px" fontWeight="400" mt="27px" ml="20px">
                {formData.project_name}
              </Text>
            ) : (
              <Text fontWeight="400">Create Card</Text>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <fieldset disabled={formData.status === "completed" ? true : false}>
            <ModalBody maxHeight="400px" overflowY="auto">
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem ml="20px" colSpan={3}>
                  {mode !== "edit" ? (
                    <FormControl isRequired>
                      <FormLabel className="modal-button">
                        Project Name
                      </FormLabel>
                      <Input
                        name="project_name"
                        value={formData.project_name}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  ) : (
                    ""
                  )}
                  <FormControl>
                    <FormLabel className="modal-button">Summary</FormLabel>
                    <Input
                      name="summary"
                      value={formData.summary}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel className="modal-button">Description</FormLabel>
                    <Textarea
                      height="200px"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel className="modal-button">
                      Acceptance Criteria
                    </FormLabel>
                    <Textarea
                      name="acceptance_criteria"
                      value={formData.acceptance_criteria}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <Accordion allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            Comments
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Comments formData={formData} />
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel className="modal-button">Issue Type</FormLabel>
                    <Select
                      name="issue_type"
                      value={formData.issue_type}
                      onChange={handleInputChange}
                    >
                      <option value="task">Task</option>
                      <option value="story">Story</option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel className="modal-button">Priority</FormLabel>
                    <Select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                    >
                      <option value={1}>P1 - Resolve Immediately</option>
                      <option value={2}>P2 - High Attention</option>
                      <option value={3}>P3 - Normal</option>
                      <option value={4}>P4 - Low</option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel className="modal-button">Status</FormLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="not-started">Not-Started</option>
                      <option value="in-progress">In-Progress</option>
                      <option value="completed">Completed</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel className="modal-button">Story Points</FormLabel>
                    <Input
                      required
                      name="story_points"
                      pattern="^[1-5]$"
                      title="Value should be between 1 and 5"
                      value={formData.story_points}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel className="modal-button">Reporter</FormLabel>
                    <Select
                      name="reporter"
                      value={formData.reporter}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Reporter</option>
                      {userData.map((user) => (
                        <option key={user.user_id} value={user.user_id}>
                          {user.first_name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel className="modal-button">Assignee</FormLabel>
                    <Select
                      name="assignee"
                      value={formData.assignee}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Assignee</option>
                      {userData.map((user) => (
                        <option key={user.user_id} value={user.user_id}>
                          {user.first_name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel className="modal-button">Start Date</FormLabel>
                    <Input
                      required
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel className="modal-button">End Date</FormLabel>
                    <Input
                      required
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
            </ModalBody>
          </fieldset>
          <ModalFooter>
            <Grid templateColumns="repeat(5, 1fr)" gap={2}>
              <GridItem colSpan={1}>
                {mode === "edit" ? (
                  <Button onClick={handleDelete} colorScheme="red" mt={4}>
                    Delete
                  </Button>
                ) : (
                  ""
                )}
              </GridItem>
              <GridItem colStart={5} colEnd={5}>
                <Button
                  width="46px"
                  height="17px"
                  colorScheme="white"
                  mt={4}
                  mr={5}
                  onClick={onClose}
                  color="grey"
                >
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue" mt={4}>
                  Save
                </Button>
              </GridItem>
            </Grid>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}

export default FormPage;
