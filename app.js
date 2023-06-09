const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("connect-flash");
const Character = require("./src/models/character");

dotenv.config();

const PORT = process.env.PORT || 3000;

// Import User model
const User = require("./src/models/user");

// Create Express app
const app = express();

// Connect to MongoDB
console.log("connecting to database...");
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
app.use(
  session({
    secret: "myfunapp",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

// Configure Passport
app.use(passport.initialize());
app.use(passport.session());

// Define the local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
    },
    async (username, password, done) => {
      console.log(`Authenticating user: ${username}`);
      try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, {
            message: "Invalid username or password",
          });
        }

        // Compare the password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, {
            message: "Invalid username or password",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

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

// Routes
app.get("/", (req, res) => {
  console.log("received request for the slash route...");
  res.render("index", { layout: "layouts/layout" });
});

app.get("/register", (req, res) => {
  res.render("register", { layout: "layouts/layout" });
});

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    // Generate a salt with a desired number of rounds
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance with the salted and hashed password
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    console.log("User saved to the database");
    req.flash("success", "User registered successfully!");
    res.redirect("/login");
  } catch (error) {
    console.error("Error saving user:", error);
    req.flash("error", "Failed to register user.");
    res.redirect("/register");
  }
});

// Login route
app.get("/login", (req, res) => {
  res.render("login", {
    layout: "layouts/layout",
    message: req.flash("error"),
  });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/dashboard", (req, res) => {
  const user = req.user;
  const username = user.username;
  res.render("dashboard", { username });
});

app.get("/characters", async (req, res) => {
  try {
    const characters = await Character.find().exec();
    res.json(characters);
  } catch (error) {
    console.error("Error retrieving characters:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/build-character", (req, res) => {
  if (!req.user) {
    // If user is not logged in, redirect to login page
    return res.redirect("/login");
  }

  // If user is logged in, render the build-character page
  res.render("build-character", { layout: "layouts/layout" });
});

app.post("/build-character", async (req, res) => {
  // Input validation can be performed here

  // Find the base character
  const baseCharacter = await Character.findOne({ class: req.body.class });

  // Make a copy of the base character's attributes
  console.log(baseCharacter); // What does this output?
  const newAttributes = { ...baseCharacter.attributes };

  // Add the extra points from the form to the appropriate attributes
  for (let attribute in newAttributes) {
    newAttributes[attribute] += parseInt(req.body[attribute]);
  }

  // Create the new character
  const newCharacter = new Character({
    name: req.body.name,
    class: req.body.class,
    attributes: newAttributes,
    user: req.body.userId,
  });

  // Save the new character
  await newCharacter.save();

  // Find the user and add the character to their profile
  const user = await User.findById(req.body.userId);
  user.character = newCharacter._id;
  await user.save();

  // Send a success response
  res.status(200).json({ message: "Character created successfully" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
