const express = require('express');
const path = require('path');
const VideosService = require('./videos-service');
const { requireAuth } = require('../middleware/jwt-auth');

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
        console.log('line 52', video)
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${video.id}`))
          .json(VideosService.serializeVideo(video))
      })
      .catch(next);
  })
  
  videosRouter
    .route('/:video_id')
    .all(requireAuth)
    .all(checkVideoExists)
    .get((req, res, next) => {
      res.json(VideosService.serializeVideo(res.video))
    })
    .delete((req, res, next) => {
      if (req.user.id !== res.video.user_id) {
        return res.status(401).json({
          error: 'User is not owner!'
        })
      }

      VideosService.deleteVideo(
        req.app.get('db'),
        req.params.video_id
      )
        .then(() => {
          res.status(204).json({success: true})
        })
        .catch(next);
    })
    .patch(jsonBodyParser, (req, res, next) => {
      const { title, description } = req.body
      const videoToUpdate = { title, description }

      const numberOfValues = Object.values(videoToUpdate).filter(Boolean).length
      if (numberOfValues === 0) {
        return res.status(400).json({
          error: {
            message: `Request body must contain either 'title', or 'description'`
          }
        })
      }
      
      if (req.user.id !== res.video.user_id) {
        return res.status(401).json({
          error: 'User is not owner!'
        })
      }

      VideosService.updateVideo(
        req.app.get('db'),
        req.params.video_id,
        videoToUpdate
      )
        .then(() => {
          res.status(201).json({success: true})
        })
        .catch(next);
    })

/* async/await syntax for promises */
async function checkVideoExists(req, res, next) {
  try {
    const video = await VideosService.getById(
      req.app.get('db'),
      req.params.video_id
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
