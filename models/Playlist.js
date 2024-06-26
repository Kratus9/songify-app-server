const mongoose = require("mongoose");
const { type } = require("os");

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: String,
    },
  ],
  id: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
