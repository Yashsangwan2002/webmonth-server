require("dotenv").config();
const express = require("express");
const cors = require("cors");
const client = require("./configs/db");
const authRoutes = require("./routes/auth");
const infoRoutes = require("./routes/info");

const booknowRoutes = require("./routes/booknow");

const app = express();

app.use("/public", express.static("public"));

app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT;

app.use(function (req, res, next) {
  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Credentials", true);
  req.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  req.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Server is up and running!!");
});

app.use("/auth", authRoutes);
app.use("/booknow", booknowRoutes);
app.use("/movie", infoRoutes);

client.connect(() => {
  console.log("Connected to database!");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
