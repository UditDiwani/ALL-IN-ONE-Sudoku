# 🎯 Sudoku Web Application

A fully interactive **Full-Stack Sudoku Web App** built with **HTML, CSS, JavaScript (Frontend)** and **Node.js, Express, MongoDB (Backend)**.  
It features user authentication, real-time progress saving, mistake tracking, and visually appealing game animations.

---

## 🚀 Features

### 🧩 Game Features
- Auto-generated Sudoku puzzles with random difficulty.
- Real-time **mistake tracking** (ends game after 3 errors).
- **Timer system** that records total playtime.
- **Undo functionality** for user moves.
- **Confetti animation** when the puzzle is solved.
- **Auto-save & resume** feature that stores user progress in the backend.

### 🔐 Authentication
- Secure **login & registration** system with password hashing using `bcrypt`.
- Each user has their own Sudoku session and stored progress.

### 🖥️ Frontend
- Built with **pure HTML, CSS, and Vanilla JS** (no frameworks).
- Dynamic grid rendering for Sudoku cells.
- Smooth visual effects with gradients, glow animations, and game overlays.
- Aesthetic, responsive UI optimized for desktop play.

### ⚙️ Backend (API)
- **Node.js + Express.js** server handling RESTful API endpoints.
- **MongoDB (Mongoose)** for user and Sudoku state storage.
- **CORS** configuration for local and public access.
- `.env` file for secure environment variables.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | HTML5, CSS3, JavaScript (ES6) |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ORM |
| Security | Bcrypt password hashing |
| Deployment | Localhost for testing |
| Version Control | Git & GitHub |

## 🔌 API Overview

### Base URL
http://localhost:3000/api

### Example Endpoints
| Method | Endpoint | Description |
|---------|-----------|-------------|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login existing user |
| `GET`  | `/sudoku/load/:userId` | Load user’s Sudoku progress |
| `POST` | `/sudoku/save` | Save Sudoku progress |
| `DELETE` | `/user/delete/:userId` | Delete user data (on game over) |

---

## 🧩 Setup Instructions

### 1️⃣ Clone the Repository
git clone https://github.com/UditDiwani/ALL-IN-ONE-Sudoku.git

cd ALL-IN-ONE-Sudoku

2️⃣ Install Dependencies

Navigate to the backend folder:

cd Backend
npm install

3️⃣ Set Up Environment Variables

Create a .env file in /Backend:

MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_token>
PORT=3000

4️⃣ Start the Server

node server.js

5️⃣ Open the Frontend

Simply open the UserSetUp.html file in your browser, or serve it using VS Code Live Server:

http://127.0.0.1:5500/



🧠 Key Learning Highlights

Implemented custom API communication between frontend and backend using fetch().

Learned CORS configuration

Built a stateful Sudoku logic engine with mistake and undo systems.

Practiced clean UI design using CSS animations and pseudo-elements.

Enhanced understanding of Express routing and MongoDB schema design.



🧰 Future Enhancements

Add leaderboard and difficulty levels.

Host backend on Render/Heroku and frontend on GitHub Pages.

Implement JWT authentication for secure sessions.

ngrok tunneling or something similar , and environment-based URL management.
