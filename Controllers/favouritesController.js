const User = require("../models/User");

const favouritesController = {
  addSongToFavourites: async (req, res) => {
    try {
      const { userId, songId } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (
        !user.favouriteSongs ||
        !user.favouriteSongs.some((song) => song && song === songId)
      ) {
        if (!user.favouriteSongs) {
          user.favouriteSongs = [];
        }

        user.favouriteSongs.push(songId);

        await user.save();

        res
          .status(200)
          .json({ message: "Song added to Favourites successfully" });
      } else {
        res.status(200).json({ message: "This song is already Favourited" });
      }
    } catch (error) {
      console.error("Error adding Song to Favourites", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteSongFromFavourites: async (req, res) => {
    try {
      const { userId, songId } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.favouriteSongs && user.favouriteSongs.length > 0) {
        const updatedFavourites = user.favouriteSongs.filter(
          (song) => song && song !== songId
        );
        if (
          JSON.stringify(user.favouriteSongs) !==
          JSON.stringify(updatedFavourites)
        ) {
          user.favouriteSongs = updatedFavourites;
          await user.save();
          res
            .status(200)
            .json({ message: "Song deleted from Favourites successfully" });
        }
      }
    } catch (error) {
      console.error("Error deleting Song from Favourites", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getAllFavouriteSongs: async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ favouriteSongs: user.favouriteSongs });
    } catch (error) {
      console.error("Error getting Songs from User's Favourites", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = favouritesController;
