#Kanban Board

Kanban Board is a web application that helps you manage your tasks and projects using the Kanban methodology. The application allows you to create, track, and organize tasks across different stages of your project, such as "Not Started," "In Progress," and "Completed."

#Features

Create new tasks with project name, description, priority, and story points.
Edit task details and update their status.
Delete tasks from the board.
Search for tasks based on project names.
User authentication and login system.

#Technologies Used

Django: Backend framework to handle API requests and manage data in the database.
Django REST framework: Extension to Django for building RESTful APIs.
React: Frontend library for building dynamic user interfaces.
Chakra UI: Component library for building beautiful and responsive UIs.

#Getting Started

#Prerequisites

Python 3.11,
Node.js,
npm or yarn

#Backend Setup

Clone this repository.
Navigate to the backend directory.
Create a virtual environment: python -m venv venv
Activate the virtual environment:
Windows: venv\Scripts\activate
macOS/Linux: source venv/bin/activate
Install the required Python packages: pip install -r requirements.txt
Run database migrations: python manage.py migrate
Start the development server: python manage.py runserver

#Frontend Setup

Navigate to the frontend directory.
Install dependencies: npm install or yarn install
Start the development server: npm start or yarn start
Usage
Open your browser and visit http://127.0.0.1:5173/ to access the Kanban board application.
Use the registration form to create a new user account.
Log in with your credentials to access the Kanban board.
Create tasks using the "Create" button and fill in the project name, description, priority, and story points.
Click on a task to edit its details.
Use the search bar to search for tasks based on project names.
Click on the "Logout" button to log out of your account.

#Acknowledgments
The Kanban methodology for project management.
Chakra UI and React for building the frontend UI.
Django and Django REST framework for the backend API.
