const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: String,
      unique: true,
    },
  ],
  id: {
    type: Number,
    unique: true,
    required: true,
  },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
