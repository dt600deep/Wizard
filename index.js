const express = require("express");
const server = express();
const cors = require("cors");
const path = require("path");

require("dotenv").config();
require("./connections/db_connection");

server.use(express.static(path.join(__dirname, "client/build")));
server.use(express.static("public"));
server.use(express.json());
server.use(
  cors({
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    origin: "*",
  }),
);

const loginController = require("./controllers/login");

server.use("/api/v1/login", loginController);
server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build/index.html"));
});

server.listen(
  process.env.PORT,
  console.log("Server running at http://localhost:" + process.env.PORT),
);
