const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { pool } = require("./dbConfig");

function initialize(passport) {
  console.log("Initialized");

  const authenticateUser = (email, password, done) => {
    console.log(email, password);
    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          const user = results.rows[0];

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.log(err);
            }
            if (isMatch) {
              return done(null, user);
            } else {
              //password is incorrect
              return done(null, false, { message: "Password is incorrect" });
            }
          });
        } else {
          // No user
          return done(null, false, {
            message: "No user with that email address",
          });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );
  // Stores user details inside session. serializeUser determines which data of the user
  // object should be stored in the session. The result of the serializeUser method is attached
  // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
  //   the user id as the key) req.session.passport.user = {id: 'xyz'}
  passport.serializeUser((user, done) => done(null, user.id));

  // In deserializeUser that key is matched with the in memory array / database or any data resource.
  // The fetched object is attached to the request object as req.user

  passport.deserializeUser((id, done) => {
    pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
      if (err) {
        return done(err);
      }
      console.log(`ID is ${results.rows[0].id}`);
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;

// chats
// async function initialize(passport, getUserByEmail, getUserById) {
//   // Function to authenticate users
//   const authenticateUsers = async (email, password, done) => {
//     try {
//       // Use PostgreSQL query to find user by email
//       const result = await pool.query("SELECT * FROM users WHERE email = $1", [
//         email,
//       ]);
//       const user = result.rows[0];

//       if (!user) {
//         return done(null, false, { message: "No user found with that email" });
//       }

//       // Compare the entered password with the hashed password from the database
//       const passwordMatch = await bcrypt.compare(password, user.password);

//       if (passwordMatch) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: "Password incorrect" });
//       }
//     } catch (e) {
//       console.error(e);
//       return done(e);
//     }
//   };

//   passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUsers));

//   // Serialize and deserialize user functions
//   passport.serializeUser((user, done) => done(null, user.id));

//   passport.deserializeUser(async (id, done) => {
//     try {
//       // Use PostgreSQL query to find user by ID
//       const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//       const user = result.rows[0];
//       return done(null, user);
//     } catch (e) {
//       console.error(e);
//       return done(e);
//     }
//   });
// }

// module.exports = initialize;

// function initialize(passport, getUserByEmail, getUserById){
//     // Function to authenticate users
//     const authenticateUsers = async (email, password, done) => {
//         // Get users by email
//         const user = getUserByEmail(email)
//         if (user == null){
//             return done(null, false, {message: "No user found with that email"})
//         }
//         try {
//             if(await bcrypt.compare(password, user.password)){
//                 return done(null, user)
//             } else{
//                 return done (null, false, {message: "Password Incorrect"})
//             }
//         } catch (e) {
//             console.log(e);
//             return done(e)
//         }
//     }

//     passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUsers))
//     passport.serializeUser((user, done) => done(null, user.id))
//     passport.deserializeUser((id, done) => {
//         return done(null, getUserById(id))
//     })
// }

// module.exports = initialize
