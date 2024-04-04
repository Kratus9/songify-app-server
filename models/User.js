const mongoose = require("mongoose");
const Playlist = require("./Playlist");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  favouriteSongs: [
    {
      type: String,
      unique: true,
    },
  ],
  playlists: [Playlist],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
