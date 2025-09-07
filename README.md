TaskMaster – Full-Stack Web App

A full-stack web application to manage daily tasks with add, delete, complete, and view functionality. Built using Node.js, Express, MySQL, and  JavaScript.

Features

- Add new tasks with a single click  
- Delete tasks when completed or no longer needed  
- Mark tasks as completed (with strikethrough effect)  
- Tasks are **persisted in a MySQL database**  
- Responsive and modern UI built with HTML, CSS, and JavaScript  

Tech Stack

- Frontend: HTML, CSS, JavaScript  
- Backend: Node.js, Express.js  
- Database: MySQL  
- Other: Fetch API, CORS handling  

Folder Structure

todo-list/
├── backend/          # Node.js + Express backend
│   ├── db.js         # MySQL connection
│   └── server.js     # Express server with REST API
├── frontend/         # Frontend files
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md

 Installation & Setup

1.Clone the repository
bash
git clone https://github.com/Firoz-S/TaskMaster.git
cd TaskMaster

2.	Setup backend

cd backend
npm install

3.	Start MySQL server and create the database/table:

CREATE DATABASE todo_db;
USE todo_db;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false
);

4.	Run the backend

node server.js

5.	Open frontend

	•	Open frontend/index.html in your browser

Usage
	•	Add a task → type in the input and click “Add”
	•	Mark as completed → click on the task text
	•	Delete a task → click the “Delete” button

All tasks are stored in the MySQL database, so they persist even after refreshing the page.

Future Enhancements
	•	Edit tasks functionality
	•	Add due dates or categories
	•	Deploy backend to a cloud server and frontend to Netlify/Vercel
	•	User authentication (login/signup)
