const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/auth.js");
const port = process.env.PORT || 5000;

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);

app.listen(port, () => console.log("Listening..."));
