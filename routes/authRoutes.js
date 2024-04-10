const authenticationController = require("../Controllers/authenticationController");
const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");

router.get("/verify", verifyToken, (req, res) => {
  res.json(req.user);
});

router.post("/register", authenticationController.register);

router.post("/login", authenticationController.login);

router.use(verifyToken);

router.get("/getProfile", authenticationController.getProfile);

router.get("/profileEdit", authenticationController.profileEdit);

router.get("/logout", authenticationController.logout);

module.exports = router;
