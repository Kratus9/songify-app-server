const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("Welcome to Songify");
});

module.exports = router;
