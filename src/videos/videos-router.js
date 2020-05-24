const express = require('express');
const VideosService = require('./videos-service');
// const { requireAuth } = require('../middleware/basic-auth');

const videosRouter = express.Router();

videosRouter
  .route('/')
  .get((req, res, next) => {
    VideosService.getAllVideos(req.app.get('db'))
    .then(videos => {
      let videosWithComments = videos.map(video => {        
        let comments;
        return VideosService.getComments(req.app.get('db'), video.id)
        .then(_comments => {
          comments = _comments
          return VideosService.getRating(req.app.get('db'), video.id)
        })
        .then(rating => {
          return {...video, comments, rating}
        })
      })
      return Promise.all(videosWithComments);
    })
    .then(videosWithComments => res.json(videosWithComments))
    .catch(next);
  })



  // .post(jsonBodyParser, (req, res, next) => {
  //   const{}
  // })


// Not currently using this method in any capacity. It does get you a specific video 
videosRouter
  .route('/:media_id')
  .all(checkVideoExists)
  .get((req, res) => {
    res.json(VideosService.serializeVideo(res.video));
  });

  //Not currently using this method. It does get you video specific interactions
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
