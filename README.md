# 🎮 Multiplayer Quiz Game (Kahoot-style)

A real-time multiplayer quiz game where players can join a room, answer questions simultaneously, and compete on a live leaderboard.

---

## 🚀 Features

* 🏠 Create and join game rooms using a unique code
* ⚡ Real-time question broadcasting using WebSockets
* 🎯 Instant answer submission
* 📊 Live leaderboard updates after each question
* 👥 Multiple players in a single session

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express
* **Real-time Communication:** Socket.IO
* **Frontend:** HTML, JavaScript

---

## 🧠 System Design Concepts

This project demonstrates important distributed systems concepts:

* Real-time bidirectional communication
* Event-driven architecture
* Shared state management (game rooms)
* Scalability (can be extended using Redis)

---

## 📁 Project Structure

```
quiz-game/
│── server.js
│── package.json
│
└── public/
    │── index.html
    │── script.js
    |── style.css
```

---

## ▶️ Getting Started

### 1. Clone the repository

```
cd quiz-game
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Run the server

```
node server.js
```

---

### 4. Open in browser

```
http://localhost:3000
```

---

## 🎮 How to Play

1. Open the app in multiple browser tabs
2. One player creates a room
3. Others join using the room code
4. Click **Start Game**
5. Answer questions and compete on leaderboard

---

## 📸 Demo

<img width="1920" height="1020" alt="Screenshot 2026-05-05 220540" src="" />


---

## 🔥 Future Improvements

* ⏱️ Add countdown timer UI
* ⚡ Speed-based scoring system
* 🔄 Player reconnect support
* 📦 Redis integration for scaling across multiple servers
* 🎨 Improved UI (React or modern frontend)

---

## ⚠️ Limitations

* Currently uses in-memory storage (data resets on server restart)


---

## 🧩 Possible Extensions

* Microservices architecture (separate question/score services)
* Global leaderboard system
* Analytics dashboard
* Mobile-friendly UI

---

## 👨‍💻 Author

**Disha**

---

## ⭐ Contribute

Feel free to fork this project and improve it. Contributions are welcome!

---

## 📄 License

This project is licensed under the MIT License.




