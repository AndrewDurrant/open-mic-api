const xss = require('xss');
const Treeize = require('treeize');

const VideosService = {
  getAllVideos: (db) => {
    
    db.raw('SELECT title, link, description, date_created FROM media').then(data => data.rows);



    // return db
    //   .from('media AS media')
    //   .select(
    //     'media.id',
    //     'media.title',
    //     'media.date_created',
    //     'media.link',
    //     'media.description',
    //     ...userFields,
    //     // ...interactionsFields,
    //     // rework these so they are useful(avg rating). Maybe just the second one? Currently the second one does not seem to work
    //     db.raw(
    //       `count(DISTINCT interact) AS number_of_interactions`
    //     ),
    //     db.raw(
    //       `AVG(interact.rating) AS average_rating`
    //     ),
    //   )
    //   .leftJoin(
    //     `openmic_interactions as interact`,
    //     `media.id`,
    //     `interact.media_id`,
    //   )
    //   .leftJoin(
    //     `openmic_users AS usr`,
    //     `media.user_id`,
    //     `usr.id`,
    //   )
    //   .groupBy(`media.id`, `usr.id`)
  },

  getComments: (db, id) => {
    db.raw(`SELECT openmic_interactions.comment FROM openmic_interactions where media_id=${id}`).then(data => data.rows);
  },

  getRating: (db, id) => {
    db.raw(`SELECT AVG(rating) AS rate FROM openmic_interactions WHERE media_id=${id}`).then(data => data.rows[0].rate);
  },

  getById(db, id) {
    return VideosService.getAllVideos(db)
      .where('media.id', id)
      .first()
  },

  getInteractionsForVideo(db, media_id) {
    return db
      .raw(`select interact.id, interact.comment, interact.rating, interact.media_id, openmic_users.id, openmic_users.user_name from openmic_interactions as interact
      left join openmic_users on interact.user_id = openmic_users.id 
      where media_id = ?`, [media_id])
      .then(data => data.rows)
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
      // interactions: videoData.interaction || {},
      number_of_interactions: Number(videoData.number_of_interactions) || 0,
      average_comment_rating: Math.round(videoData.average_comment_rating) || 0,
    }
  },

  // Not currently using the next two methods below. They were being used in getInteractionsForVideo to format the interactions. Currently the`data => data.rows` is accomplishing the format of the response. Along with line 33 in `videos-router.js on client-side. ALERT xss is not being used!!
  // serializeVideoInteractions(interactions) {
  //   return videos.map(this.serializeVideoInteraction)
  // },

  // serializeVideoInteraction(interaction) {
  //   const interactionTree = new Treeize()

  //   // Some light hackiness to allow for the fact that `treeize`
  //   // only accepts arrays of objects, and we want to use a single
  //   // object.
  //   const interactionData = interactionTree.grow([ interaction ]).getData()[0]

  //   return {
  //     id: interactionData.id,
  //     rating: interactionData.rating,
  //     media_id: interactionData.media_id,
  //     comment: xss(interactionData.comment),
  //     user: interactionData.user,
  //     date_created: interactionData.date_created,
  //   }
  // },
}

  const userFields = [
    'usr.id AS user:id',
    'usr.full_name AS user:full_name',
    'usr.user_name AS user:user_name',
    'usr.date_created AS user:date_created',
    'usr.date_modified AS user:date_modified',
  ]

  const interactionsFields = [
    'interact.id AS interaction:id', 
    'interact.comment AS interaction:comment',
    'interact.rating AS interaction:rating',
    'interact.user_id AS interaction:interaction_owner',
  ]

  module.exports = VideosService