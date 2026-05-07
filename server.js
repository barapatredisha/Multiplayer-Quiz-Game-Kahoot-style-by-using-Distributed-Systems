const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));


const questions = [
    {
      question: "What is the capital of India?",
      options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
      answer: "Delhi"
    },
    {
      question: "Which language runs in browser?",
      options: ["Python", "Java", "C++", "JavaScript"],
      answer: "JavaScript"
    },
    {
      question: "What is 5 + 3?",
      options: ["6", "8", "10", "9"],
      answer: "8"
    },
    {
      question: "Which company developed Node.js?",
      options: ["Google", "Microsoft", "Joyent", "Meta"],
      answer: "Joyent"
    },
     {
      question: "Which company developed JavaScript?",
      options: ["Microsoft", "Netscape", "Google", "IBM"],
      answer: "Netscape"
    },
    {
      question: "What does HTTP stand for?",
      options: [
        "HyperText Transfer Protocol",
        "HighText Transfer Protocol",
        "Hyper Transfer Text Process",
        "None"
      ],
      answer: "HyperText Transfer Protocol"
    },
    {
      question: "Which is not a programming language?",
      options: ["Python", "HTML", "Java", "C++"],
      answer: "HTML"
    },
    {
      question: "Which keyword is used in JavaScript for variable?",
      options: ["var", "int", "string", "define"],
      answer: "var"
    },
    {
      question: "Which HTML tag is used for links?",
      options: ["<a>", "<p>", "<div>", "<link>"],
      answer: "<a>"
    },
    {
      question: "Which CSS property changes text color?",
      options: ["font", "color", "background", "text-style"],
      answer: "color"
    },
    {
      question: "Which symbol is used for comments in JS?",
      options: ["//", "#", "<!-- -->", "**"],
      answer: "//"
    },
    {
      question: "Which database is NoSQL?",
      options: ["MySQL", "MongoDB", "Oracle", "PostgreSQL"],
      answer: "MongoDB"
    },
    {
      question: "Which protocol is secure?",
      options: ["HTTP", "FTP", "HTTPS", "SMTP"],
      answer: "HTTPS"
    },
    {
      question: "Which company owns Node.js?",
      options: ["Google", "Microsoft", "OpenJS Foundation", "Facebook"],
      answer: "OpenJS Foundation"
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Creative Style System",
        "Colorful Style Syntax"
      ],
      answer: "Cascading Style Sheets"
    }
  ];



let rooms = {};

io.on("connection", (socket) => {

  socket.on("joinRoom", ({ username, room }) => {

    socket.join(room);

    if (!rooms[room]) {

      rooms[room] = {
        players: [],
        host: socket.id,
        currentQ: 0,
        scores: {},
        started: false
      };
    }

    const game = rooms[room];

    game.players.push({
      id: socket.id,
      username
    });

    game.scores[socket.id] = 0;

    io.to(room).emit("roomData", {
      players: game.players,
      host: game.host
    });
  });

  socket.on("startGame", (room) => {

    const game = rooms[room];

    if (!game || socket.id !== game.host) return;

    game.started = true;

    game.currentQ = 0;

    sendQuestion(room);
  });

  socket.on("answer", ({ room, answer }) => {

    const game = rooms[room];

    if (!game) return;

    const q = questions[game.currentQ];

    if (answer === q.answer) {
      game.scores[socket.id]++;
    }
  });

  socket.on("nextQuestion", (room) => {

    const game = rooms[room];

    if (!game) return;

    game.currentQ++;

    if (game.currentQ < questions.length) {

      sendQuestion(room);

    } else {

      io.to(room).emit(
        "gameOver",
        game.scores,
        game.players
      );
    }
  });

  socket.on("disconnect", () => {

    for (let room in rooms) {

      let game = rooms[room];

      game.players =
        game.players.filter(
          p => p.id !== socket.id
        );
    }
  });

 function sendQuestion(room) {

  const game = rooms[room];

  if (!game) return;

  const q = questions[game.currentQ];

  let timeLeft = 10;

  // CLEAR OLD TIMER
  if (game.timer) {
    clearInterval(game.timer);
  }

  // SEND QUESTION
  io.to(room).emit("question", {
    q,
    index: game.currentQ
  });

  // SEND INITIAL TIMER
  io.to(room).emit("timer", timeLeft);

  game.timer = setInterval(() => {

    timeLeft--;

    io.to(room).emit("timer", timeLeft);

    // AUTO NEXT QUESTION
    if (timeLeft <= 0) {

      clearInterval(game.timer);

      game.currentQ++;

      if (game.currentQ < questions.length) {

        sendQuestion(room);

      } else {

        io.to(room).emit(
          "gameOver",
          game.scores,
          game.players
        );
      }
    }

  }, 1000);
}

});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});