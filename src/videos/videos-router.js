const express = require('express');
const VideosService = require('./videos-service');
// const { requireAuth } = require('../middleware/basic-auth');

const videosRouter = express.Router();

videosRouter
  .route('/')
  .get((req, res, next) => {
    VideosService.getAllVideos(req.app.get('db'))
      .then(videos => {
        res.json(VideosService.serializeVideos(videos));
      })
      .catch(next);
  });

videosRouter
  .route('/:media_id')
  .all(checkVideoExists)
  .get((req, res) => {
    res.json(VideosService.serializeVideo(res.video));
  });

videosRouter
  .route('/:media_id/interactions/')
  .all(checkVideoExists)
  .get((req, res, next) => {
    VideosService.getInteractionsForVideo(
      req.app.get('db'),
      req.params.media_id
    )
      .then(interactions => {
        res.json(interactions)
        // res.json(VideosService.serializeVideoInteraction(interactions));
      })
      .catch(next);
  });


/* async/await syntax for promises */
async function checkVideoExists(req, res, next) {
  try {
    const video = await VideosService.getById(
      req.app.get('db'),
      req.params.media_id
    )

    if (!video)
      return res.status(404).json({
        error: `Video doesn't exist`
      })

    res.video = video
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = videosRouter
