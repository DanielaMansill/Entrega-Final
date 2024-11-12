const express = require('express');
const router = express.Router();



const albumsRouter = require('./Album');
const songsRouter = require('./song');
const usersRouter = require('./users');


router.use('/albums', albumsRouter);
router.use('/song', songsRouter);
router.use('/users', usersRouter);
router.use('/api/songs', songsRouter);




router.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

module.exports = router;