const User = require("../models/User");

const favouritesController = {
  addLikedItem: async (req, res) => {
    try {
      const { userId, itemId } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!user.likes || !user.likes.some((item) => item && item === itemId)) {
        if (!user.likes) {
          user.likes = [];
        }

        user.likes.push(itemId);

        await user.save();

        res.status(200).json({ message: "Item liked successfully" });
      } else {
        res.status(200).json({ message: "This item is already Liked" });
      }
    } catch (error) {
      console.error("Error adding Liked Item", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteLikedItem: async (req, res) => {
    try {
      const { userId, itemId } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.likes && user.likes.length > 0) {
        const updatedFavourites = user.likes.filter(
          (item) => item && item !== itemId
        );
        if (JSON.stringify(user.likes) !== JSON.stringify(updatedFavourites)) {
          user.likes = updatedFavourites;
          await user.save();
          res.status(200).json({ message: "Item Unliked successfully" });
        }
      }
    } catch (error) {
      console.error("Error unliking Item", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getAllLikedItems: async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ likes: user.likes });
    } catch (error) {
      console.error("Error getting User's Liked Items", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = favouritesController;
