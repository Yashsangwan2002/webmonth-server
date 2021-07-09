const express = require("express");

const router = express.Router();
const { bookNow } = require("../controllers/booknow");

router.post("/book", bookNow);

// router.post("/book", verifyToken,seatdata );
module.exports = router;
