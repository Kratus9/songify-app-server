const express = require("express");
const router = express.Router();
const playlistController = require("../Controllers/playlistController");
const favouritesController = require("../Controllers/favouritesController");

router.post("/addLikedItem", favouritesController.addLikedItem);

router.delete("/deleteLikedItem", favouritesController.deleteLikedItem);

router.get("/getAllLikedItems", favouritesController.getAllLikedItems);

router.post("/addPlaylist", playlistController.addPlaylist);

router.delete("/deletePlaylist", playlistController.deletePlaylist);

router.get("/getAllPlaylists", playlistController.getAllPlaylists);

router.post("/addSongToPlaylist", playlistController.addSongToPlaylist);

router.delete(
  "/deleteSongFromPlaylist",
  playlistController.deleteSongFromPlaylist
);

module.exports = router;
