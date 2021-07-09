const express = require("express");

const router = express.Router();

const { movieInfo } = require("../controllers/movieInfo");

router.post("/info", movieInfo);

// router.post("/book", verifyToken,seatdata );
module.exports = router;
