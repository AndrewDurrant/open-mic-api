const xss = require('xss');	
const Treeize = require('treeize');

const VideosService = {
  getAllVideos(db) {
    return db
      .raw('SELECT id, title, link, description, date_created, user_id FROM media').then(data => data.rows);
  },

  getComments(db, media_id) {
    return db
      .raw('SELECT openmic_interactions.comment, openmic_interactions.user_id, openmic_interactions.date_created FROM openmic_interactions where media_id = ?', [media_id]).then(data => data.rows);
  },

  getRating(db, id) {
    return db
      .raw(`SELECT AVG(rating) AS rate FROM openmic_interactions WHERE media_id=${id}`).then(data => data.rows[0].rate);
  }, 
  
  insertVideo(db, data) {
    return db
      .insert(data)
      .into('media')
      .returning('*')
      .then(([video]) => video)
      .then(video => {
        return VideosService.getById(db, video.id);
      });
  },

  getById(db, id) {    
    return db
      .from('media')
      .select('*')
      .where('media.id', id)
      .first();
  },

  deleteVideo(db, id) {
    return db('media')
      .where({ id })
      .delete();
  },

  updateVideo(db, id, newVideoFields) {
    return db('media')
      .where({ id })
      .update(newVideoFields);
  },

  getUserVideos(db, user_id) {
    return db
      .raw(`SELECT * FROM media WHERE media.user_id = ${user_id}`).then(data => data.rows);
  },
  
  serializeVideo(video) {
    const videoTree = new Treeize();

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const videoData = videoTree.grow([ video ]).getData()[0];

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
    };
  },

};

module.exports = VideosService;