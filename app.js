const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("connect-flash");

dotenv.config();

const PORT = process.env.PORT || 3000;
// Import User model
const User = require("./src/models/user");
// Create Express app
const app = express();

// Connect to MongoDB
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
      usernameField: "username", // Assuming "username" is the unique identifier
    },
    (username, password, done) => {
      // Find the user by username
      User.findOne({ username: username })
        .exec()
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "Invalid username or password",
            });
          }
          // Compare the password using bcrypt
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              return done(err);
            }
            if (!result) {
              return done(null, false, {
                message: "Invalid username or password",
              });
            }
            return done(null, user);
          });
        })
        .catch((err) => done(err));
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
  // Render the index.ejs template
  res.render("index", { layout: "layouts/layout" });
});

app.get("/register", (req, res) => {
  res.render("register", { layout: "layouts/layout" });
});

app.post("/register", (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  // Generate a salt with a desired number of rounds
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      console.error("Error generating salt:", err);
      return res.redirect("/register");
    }

    // Hash the password using the generated salt
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.redirect("/register");
      }

      // Create a new user instance with the salted and hashed password
      const newUser = new User({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      newUser
        .save()
        .then(() => {
          console.log("User saved to the database");
          req.flash("success", "User registered successfully!");
          res.redirect("/login");
        })
        .catch((error) => {
          console.error("Error saving user:", error);
          req.flash("error", "Failed to register user.");
          res.redirect("/register");
        });
    });
  });
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
