const bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");
const client = require("../configs/db");

exports.signUp = (req, res) => {
  //EXTRACTING DATA SENT BY USER
  const { name, email, password } = req.body;

  client
    .query(`SELECT * FROM users WHERE email = '${email}';`)
    .then((data) => {
      isValid = data.rows;

      if (isValid.length !== 0) {
        res.status(400).json({
          error: "User already exists.",
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          //WHILE HASHING IF AN ERROR OCCURS WE SEND BACK SERVER ERROR AS RESPONSE
          if (err) {
            res.status(500).json({
              error: "Internal server error.",
            });
          }

          const user = {
            name,
            email,
            password: hash,
          };

          client
            .query(
              `INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}' , '${user.password}');`
            )
            .then((data) => {
              //IF THE USER IS SUCCESSFULLY SAVED IN OUR DB WE GENERATE TOKEN FOR THE USER TO SEND BACK TO THE BROWSER
              const token = jwt.sign(
                {
                  email: email,
                },
                process.env.SECRET_KEY
              );

              //FINALLY WE SEND THE TOKEN BACK TO USER WITH A SUCCESS MESSAGE
              res.status(200).json({
                message: "User added successfully to database",
                token: token,
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: "Database error occurred!",
              });
            });
        });
      }
    })
    .catch((err) => {
      //IF ANY ERROR OCCURS WHILE CHECKING FOR USER IN THE DATABASE WE SEND A DATABASE ERROR RESPONSE
      res.status(500).json({
        error: "Database error occurred!",
      });
    });
};

exports.signIn = (req, res) => {
  //EXTRACTING DATA SENT BY USER
  const { email, password } = req.body;

  client
    .query(`SELECT * FROM users WHERE email = '${email}';`)
    .then((data) => {
      userData = data.rows;
      // []

      //IF IN RESPONSE DATA FROM DB WE GET BACK AN EMPTY ARRAY THIS MEANS NO USER EXISTS WITH THE EMAIL GIVEN BY USER, THAT IS THE USER IS NOT SIGNED UP
      if (userData.length === 0) {
        //SO WE CHECK FOR EMPTY ARRAY AND IF THE CONDITION IS TRUE WE SEND BACK RESPONSE TO SIGNUP FIRST
        res.status(400).json({
          error: "User does not exist, signup instead!",
        });
      } else {
        bcrypt.compare(password, userData[0].password, (err, result) => {
          if (err) {
            res.status(500).json({
              error: "Server error!",
            });
          } else if (result === true) {
            const token = jwt.sign(
              {
                email: email,
              },
              process.env.SECRET_KEY
            );
            res.status(200).json({
              message: "User signed in successfully",
              token: token,
            });
          } else {
            res.status(400).json({
              error: "Enter correct password!",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occurred!",
      });
    });
};
