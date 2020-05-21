const xss = require('xss');
const Treeize = require('treeize');

const VideosService = {
  getAllVideos(db) {
    return db
      .from('media AS media')
      .select(
        'media.id',
        'media.title',
        'media.date_created',
        'media.link',
        'media.description',
        ...userFields,
        // rework these so they are useful(avg rating). Maybe just the second one? Currently does not seem to work
        db.raw(
          `count(DISTINCT interact) AS number_of_interactions`
        ),
        db.raw(
          `AVG(interact.rating) AS average_rating`
        ),
      )
      .leftJoin(
        'openmic_interactions as interact',
        'media.id',
        `interact.media_id`,
      )
      .leftJoin(
        `openmic_users AS usr`,
        `media.user_id`,
        `usr.id`,
      )
      .groupBy(`media.id`, `usr.id`)
  },

  getById(db, id) {
    return VideosService.getAllVideos(db)
      .where('media.id', id)
      .first()
  },

  getInteractionsForVideo(db, media_id) {
    return db
      .from('openmic_interactions AS interact')
      .select(
        'interact.id',
        'interact.comment',
        'interact.rating',
        'interact.date_created',
        ...userFields,
      )
      .where('interact.video_id', media_id)
      .leftJoin(
        'openmic_users AS usr',
        'interact.user_id',
        'usr.id',
      )
      .groupBy('interact.id','usr.id')
  },

  serializeVideos(videos) {
    return videos.map(this.serializeVideo)
  },

  serializeVideo(video) {
    const videoTree = new Treeize()

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const videoData = videoTree.grow([ video ]).getData()[0]

    return {
      id: videoData.id,
      title: xss(videoData.title),
      link: xss(videoData.link),
      description: xss(videoData.description),
      date_created: videoData.date_created,
      user: videoData.user || {},
      number_of_interactions: Number(videoData.number_of_interactions) || 0,
      average_comment_rating: Math.round(videoData.average_comment_rating) || 0,
    }
  },


  serializeVideoInteractions(interactions) {
    return videos.map(this.serializeVideoInteraction)
  },

  serializeVideoInteraction(interaction) {
    const interactionTree = new Treeize()

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const interactionData = interactionTree.grow([ interaction ]).getData()[0]

    return {
      id: interactionData.id,
      rating: interactionData.rating,
      media_id: interactionData.media_id,
      comment: xss(interactionData.comment),
      user: interactionData.user,
      date_created: interactionData.date_created,
    }
  },
}

  const userFields = [
    'usr.id AS user:id',
    'usr.full_name AS user:full_name',
    'usr.user_name AS user:user_name',
    'usr.date_created AS user:date_created',
    'usr.date_modified AS user:date_modified',
  ]

  module.exports = VideosService