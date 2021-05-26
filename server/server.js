const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// API Routes
const apiRouter = require("./routes/api");
const musixMatchRouter = require("./routes/musixMatchAPI");

// socket.io0
var http = require("http");
var https = require("https");

const PORT = process.env.PORT || 3001;

// Check if SERVER_SECRET has been set and exit with an error if an env var is
// not set.
if (!process.env.SERVER_SECRET) {
  throw new Error(
    "A SERVER_SECRET env variable must be set. Please add to .env or include in Heroku config."
  );
}

// Setting up express to use json and set it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/appDB", {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error(err));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
}

app.use(apiRouter);
app.use(musixMatchRouter);

// Error handling
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    // Send the error rather than to show it on the console
    res.status(401).send(err);
  } else {
    next(err);
  }
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

// app.listen(PORT, function () {
//   console.log(`🌎 ==> Server now on port ${PORT}!`);
// });

// Socket IO 
// const server = http.createServer(app).listen(PORT);

const httpServer = http.createServer(app);
// https.createServer(app).listen(443);
const socketIO = require("socket.io")(httpServer, {
  cors: {
    origin: "https://localhost:3001",
    methods: ["GET", "POST"],
    allowHeaders: ["my-custom-header"],
    credentials: true
  }
});

// socketIO.use((socket,next) => {
//   const username = socket.handshake.auth.username;
//   if(!username) {
//     return next(new Error("invalid username"));
//   }
//   socket.username = username;
//   next();
// })
var clients = 0;

var connectedUsers = {};

socketIO.on("connection", (socket) => {
  clients++;
  console.log("New client connected");
  console.log(`number of clients ${clients}`);
  
  socket.on('register', function(username) {
    socket.username = username;
    connectedUsers[username] = socket;
  });

  socket.on("private_chat", function(data) {
    const to = data.to;
    const message = data.message;
    if(connectedUsers.hasOwnProperty(to)) {
      connectedUsers[to].emit("private_chat", {
        username: socket.username,
        message: message
      })
    }
  })

  socket.once("disconnect", () => {
    clients--;
    console.log("Client disconnected.");
    console.log(`Number of clients left: ${clients}`);
  });
});

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));