const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;

require("dotenv").config();

// Create Express app
const app = express();

// Configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/src/public"));

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/src/views");

// Set up Express Layouts
app.use(expressLayouts);
app.set("layout", "layouts/layout");

//Routes
app.get("/", (req, res) => {
  // Render the index.ejs template
  res.render("index", { layout: "./layouts/layout" });
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
