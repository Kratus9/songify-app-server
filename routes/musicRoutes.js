const express = require("express");
const router = express.Router();
const playlistController = require("../Controllers/playlistController");
const favouritesController = require("../Controllers/favouritesController");

router.post("/addSongToFavourites", favouritesController.addSongToFavourites);

router.delete(
  "/deleteSongFromFavourites",
  favouritesController.deleteSongFromFavourites
);

router.get("/getAllFavouriteSongs", favouritesController.getAllFavouriteSongs);

router.post("/addPlaylist", playlistController.addPlaylist);

router.delete("/deletePlaylist", playlistController.deletePlaylist);

router.get("/getAllPlaylists", playlistController.getAllPlaylists);

router.post("/addSongToPlaylist", playlistController.addSongToPlaylist);

router.delete(
  "/deleteSongFromPlaylist",
  playlistController.deleteSongFromPlaylist
);

module.exports = router;
