const User = require("../models/User");
const Playlist = require("../models/Playlist");
const { v4: uuidv4 } = require("uuid");

const playlistController = {
  addPlaylist: async (req, res) => {
    try {
      const { userId, playlistName, playlistDescription } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const newPlaylist = new Playlist({
        name: playlistName,
        id: uuidv4(),
        description: playlistDescription,
      });
      user.playlists.push(newPlaylist);
      await user.save();

      res.status(200).json({ message: "Playlist added successfully" });
    } catch (error) {
      console.error("Error adding Playlist", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deletePlaylist: async (req, res) => {
    try {
      const { userId, playlistId } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.playlists && user.playlists.length > 0) {
        const updatedPlaylists = user.playlists.filter(
          (playlist) => playlist.id !== playlistId
        );
        if (user.playlists !== updatedPlaylists) {
          user.playlists = updatedPlaylists;
          await user.save();
          res
            .status(200)
            .json({ message: "Playlist was deleted successfully" });
        }
      }
    } catch (error) {
      console.error("Error deleting Playlist", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getAllPlaylists: async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ playlists: user.playlists });
    } catch (error) {
      console.error("Error getting Playlists", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  addSongToPlaylist: async (req, res) => {
    try {
      const { userId, playlistId, songId } = req.body;
      const user = await User.findById(userId);
      const playlist = await Playlist.findById(playlistId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!playlist.songs.some((song) => song && song === songId)) {
        playlist.songs.push(songId);

        await user.save();

        res
          .status(200)
          .json({ message: "Song added to Playlist successfully" });
      } else {
        res
          .status(200)
          .json({ message: "This Song is already in the Playlist" });
      }
    } catch (error) {
      console.error("Error adding Song to the Playlist", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteSongFromPlaylist: async (req, res) => {
    try {
      const { userId, playlistId, songId } = req.body;
      const user = User.findById(userId);
      const playlist = Playlist.findById(playlistId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (playlist.songs && playlist.songs.length > 0) {
        const updatedPlaylist = playlist.songs.filter(
          (song) => song && song !== songId
        );
        if (
          JSON.stringify(updatedPlaylist) !== JSON.stringify(playlist.songs)
        ) {
          playlist.songs = updatedPlaylist;
          await user.save();
          res.status(200).json({
            message: "Song has been deleted from Playlist successfully",
          });
        }
      }
    } catch (error) {
      console.error("Error deleting song from Playlist", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = playlistController;
