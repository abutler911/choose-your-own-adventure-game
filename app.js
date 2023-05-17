const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;
const authRoutes = require("./routes/auth");

// Create Express app
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Set up Express Layouts
app.use(expressLayouts);
app.set("layout", "layouts/layout");

// Routes
app.get("/", (req, res) => {
  // Render the index.ejs template
  res.render("index", { layout: "layouts/layout" });
});

app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
