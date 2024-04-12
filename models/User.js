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
  likes: [
    {
      type: String,
    },
  ],
  playlists: [Playlist.schema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
