const authRoutes = require("./authRoutes");
const musicRoutes = require("./musicRoutes");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("Welcome to Songify");
});

router.use("/auth", authRoutes);
router.use("/music", musicRoutes);

module.exports = router;
