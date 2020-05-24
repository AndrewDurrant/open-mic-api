const express = require('express');
const path = require('path');
const InteractionService = require('./interactions-service');
const { requireAuth } = require('../middleware/basic-auth');


const interactionsRouter = express.Router();
const jsonBodyParser = express.json();

interactionsRouter
  .route('/comment')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { video_id, comment } = req.body;
    const newComment = { 
      media_id: video_id,
      comment 
    };

    for (const [key, value] of Object.entries(newComment))
      if (value === null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    
    newComment.user_id = req.user.id;

    InteractionService.insertComment(
      req.app.get('db'),
      newComment
    )
      .then(comment => {
        console.log('INTERACTIONS ROUTER', comment)
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${comment.id}`))
          .json(InteractionService.serializeComment(comment));
      })
      .catch(next);
  });

interactionsRouter
  .route('/rating')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { video_id, rating } = req.body;
    const newRating = { 
      media_id: video_id, 
      rating 
    };

    for (const [key, value] of Object.entries(newRating))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    
    newRating.user_id = req.user.id;

    InteractionService.insertRating(
      req.app.get('db'),
      newRating
    )
      .then(comment => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${rating.id}`))
          .json(InteractionService.serializeRating(rating));
      })
      .catch(next);
});

module.exports = interactionsRouter;



// "error": "insert into \"openmic_interactions\" (\"comment\", \"user_id\", \"video_id\") values ($1, $2, $3) returning * - column \"video_id\" of relation \"openmic_interactions\" does not exist"

