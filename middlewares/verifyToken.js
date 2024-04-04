const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization Header Missing" });
    }
    const token = authorizationHeader.split(" ")[1];
    console.log("Recived Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
    console.log("Decoded Token:", decoded);
    console.log("verifyToken: Token Verified Successfully");

    req.user = {
      userId: decoded._id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.error("Error Verifying Token", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid Token" });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = verifyToken;
