const socket = io();

function createRoom() {
  socket.emit("createRoom");
}

function joinRoom() {
  const name = document.getElementById("name").value;
  const roomCode = document.getElementById("room").value;

  socket.emit("joinRoom", { roomCode, name });
}

function startGame() {
  const roomCode = document.getElementById("room").value;
  socket.emit("startGame", roomCode);
}

socket.on("roomCreated", (roomCode) => {
  document.getElementById("room").value = roomCode;
  alert("Room created: " + roomCode);
});

socket.on("question", (q) => {
  let html = `<h2>${q.question}</h2>`;
  q.options.forEach((opt, i) => {
    html += `<button onclick="sendAnswer(${i})">${opt}</button>`;
  });
  document.getElementById("game").innerHTML = html;
});

function sendAnswer(ans) {
  const roomCode = document.getElementById("room").value;
  socket.emit("answer", { roomCode, answer: ans });
}

socket.on("leaderboard", (players) => {
  let html = "<h2>Leaderboard</h2>";
  Object.values(players).forEach(p => {
    html += `<p>${p.name}: ${p.score}</p>`;
  });
  document.getElementById("game").innerHTML = html;
});

socket.on("gameOver", (players) => {
  alert("Game Over!");
});