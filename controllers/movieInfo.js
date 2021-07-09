const client = require("../configs/db");

exports.movieInfo = (req, res) => {
  const { email } = req.body;

  client
    .query(`select * from book where email = '${email}'`)
    .then((data) => {
      // console.log(data);
      const noteData = data.rows;

      // console.log(filteredData);
      res.status(200).json(noteData);
    })

    .catch((err) => {
      res.status(500).json({
        message: "Databse error",
      });
    });
};
