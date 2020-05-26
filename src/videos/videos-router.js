const express = require('express');
const path = require('path');
const VideosService = require('./videos-service');
const { requireAuth } = require('../middleware/basic-auth');

const videosRouter = express.Router();
const jsonBodyParser = express.json();

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
  .post(requireAuth,  jsonBodyParser, (req, res, next) => {
    const { title, link, description }  = req.body;

    const newVideo = {
      title, 
      link,
      description
    }

    for (const [key, value] of Object.entries(newVideo))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newVideo.user_id = req.user.id;

    VideosService.insertVideo(
      req.app.get('db'), 
      newVideo
    )
      .then((video) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${video.id}`))
          .json(VideosService.serializeVideo(video))
      })
      .catch(next);
  })


  // This is for posting a video
  // .post(jsonBodyParser, (req, res, next) => {
  //   const{}
  // })

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
