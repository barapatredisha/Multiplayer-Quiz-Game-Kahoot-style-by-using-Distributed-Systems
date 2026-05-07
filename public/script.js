// script.js

const socket = io();

let room = "";
let username = "";

let currentQuestionIndex = 0;
let myScore = 0;

function joinRoom() {

  username = document.getElementById("name").value;
  room = document.getElementById("room").value;

  socket.emit("joinRoom", { username, room });

  document.getElementById("join").classList.add("hidden");
  document.getElementById("lobby").classList.remove("hidden");
}

socket.on("roomData", ({ players, host }) => {

  const playersDiv = document.getElementById("players");

  playersDiv.innerHTML =
    players.map(p => `<p>👤 ${p.username}</p>`).join("");

  if (socket.id === host) {
    document.getElementById("startBtn").classList.remove("hidden");
  }
});

function startGame() {
  socket.emit("startGame", room);
}

socket.on("question", ({ q, index }) => {

  currentQuestionIndex = index;

  document.getElementById("lobby").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");

  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");

  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {

    const btn = document.createElement("button");

    btn.innerText = opt;

    btn.onclick = () => {

      socket.emit("answer", { room, answer: opt });

      btn.style.background = "#22c55e";

      myScore++;
      document.getElementById("score").innerText = myScore;
    };

    optionsDiv.appendChild(btn);
  });
});

socket.on("timer", (time) => {
  document.getElementById("timer").innerText = time;
});

document.getElementById("nextBtn").onclick = () => {
  socket.emit("nextQuestion", room);
};

document.getElementById("backBtn").onclick = () => {

  alert("Back button clicked!");

  // Optional:
  // You can implement previous question logic here
};

socket.on("gameOver", (scores, players) => {

  document.getElementById("quiz").classList.add("hidden");

  document.getElementById("result").classList.remove("hidden");

  let resultHTML = "";

  players.forEach(p => {

    resultHTML += `
      <p>
        🏅 ${p.username}: ${scores[p.id]}/15
      </p>
    `;
  });

  document.getElementById("scores").innerHTML = resultHTML;
});