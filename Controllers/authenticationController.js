const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authenticationController = {
  register: async (req, res) => {
    const { name, username, email, password, repeatPassword } = req.body;
    console.log("Request Body:", req.body);
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(400)
          .json({ errorMessage: "Username already exists" });
      }
      if (!name || !username || !email || !password || !repeatPassword) {
        return res
          .status(400)
          .json({ errorMessage: "All fields must be filled" });
      }
      if (password !== repeatPassword) {
        return res
          .status(400)
          .json({ errorMessage: "Password and Repeat Password do not match" });
      }
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!usernameRegex.test(username)) {
        return res.status(400).json({ message: "Invalid username format" });
      }
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          errorMessage:
            "The password must contain at least one uppercase letter, one lowercase letter, one special character, and be 8 characters or longer.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "24h",
        }
      );

      res.status(201).json({ token, message: "User has been created" });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        return res.status(400).json({ errorMessage: "Email already in use" });
      } else if (error.keyPattern && error.keyPattern.name) {
        return res.status(400).json({ errorMessage: "Name already in use" });
      } else {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log("Req Body:", req.body);
      const user = await User.findOne({ username });
      console.log("Found User:", user);
      if (!user) {
        console.log("User does not exist");
        return res.status(401).json({ errorMessage: "Invalid credentials" });
      }
      console.log("Comparing password from body to user.password");
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.log("Password does not match");
        return res.status(401).json({ errorMessage: "Invalid credentials" });
      }
      console.log("Password matched");

      const payload = {
        _id: user._id,
        emai: user.email,
      };
      console.log("Payload:", payload);
      console.log("Trying to sign in jwt");

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "24h",
      });
      console.log("Sign to jwt completed");
      console.log("Requesting cookie");
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      console.log("Found cookie:", token);

      res.status(202).json({ token, message: "Login Successful" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getProfile: async (req, res) => {
    const { userId } = req.user;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ errorMessage: "User not found" });
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  profileEdit: async (req, res) => {
    const { userId } = req.user;
    const { name, username, email, password, repeatPassword } = req.body;
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res
          .status(400)
          .json({ errorMessage: "Username already in use" });
      }
      if (!name || !username || !email) {
        return res
          .status(400)
          .json({ errorMessage: "All fields must be filled" });
      }

      let hashedPassword = null;

      if (password) {
        const passwordRegex =
          /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[a-zA-Z]).{8,}$/gm;
        if (!passwordRegex.test(password)) {
          return res.status(400).json({
            errorMessage:
              "The password must contain at least one uppercase letter, one lowercase letter, one special character, and be 8 characters or longer.",
          });
        }
        if (password !== repeatPassword) {
          return res.status(400).json({
            errorMessage: "Password and Repeat password do not match.",
          });
        }
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(userId, {
        name,
        username,
        email,
        password: hashedPassword,
      });

      if (!updatedUser) {
        return res.status(404).json({ errorMessage: "User not found" });
      }

      res.json({ user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  logout: (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout Successful" });
  },
};

module.exports = authenticationController;
