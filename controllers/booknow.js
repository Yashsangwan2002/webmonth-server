const client = require("../configs/db");

exports.bookNow = (req, res) => {
  const { movieName, date, email } = req.body;

  console.log(movieName, " ", date);

  client
    .query(
      `INSERT INTO book (movieName ,email ,date ) values('${movieName}' , '${email}'  , '${date}') ;`
    )
    .then(
      res.status(200).json({
        message: "Movie booked succesfully",
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error Submitting Feedback",
      });
    });
};
