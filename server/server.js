if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "../.env" });
}

// Importing Libraies that we installed using npm
const express = require("express");
const app = express();
const bcrypt = require("bcrypt"); // Importing bcrypt package
const passport = require("passport");
const initializePassport = require("./passport-config");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const { pool } = require("./dbConfig");
const path = require("path");
const MemoryStore = require("memorystore")(session);

// const cors = require('cors');
// app.use(cors());

app.set("views", __dirname + "/views");

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(flash());

// to prevent
app.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000, //prune expire entries every 24hr
    }),
    secret: process.env.SESSION_SECRET,
    resave: false, //  wont resave the session variable if nothing is changed
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// Configuring the register post functionality
app.post("/register", checkNotAuthenticated, async (req, res) => {
  let { name, email, password } = req.body;
  let errors = [];
  console.log({
    name,
    email,
    password,
  });

  if (errors.length > 0) {
    res.render("register", { errors, name, email, password });
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);

    pool.query(
      `SELECT * FROM users
            WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          req.flash("error_msg", "Email already registered");
          return res.redirect("/register");
        } else {
          pool.query(
            `INSERT INTO users (name, email, password)
                        VALUES ($1, $2, $3)
                        RETURNING id, password`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              req.flash("You are now registered. Please log in");

              res.redirect("/login");
            }
          );
        }
      }
    );
  }
});

// Routes
app.get("/terminal", checkAuthenticated, function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/", checkAuthenticated, (req, res) => {
  res.render("index.ejs", { name: req.user.name });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});
app.use(express.static(path.join(__dirname, "build")));

// End Routes

app.delete("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
