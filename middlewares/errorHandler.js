const errorHandler = (error, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: "Invalid token" });
  }
  res.status(500).json({ error: "Internal Sever Error" });
};

module.exports = errorHandler;
