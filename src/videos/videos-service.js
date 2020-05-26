const VideosService = {
  getAllVideos(db) {
    return db
      .raw('SELECT id, title, link, description, date_created FROM media').then(data => data.rows);
  },

  getComments(db, media_id) {
    return db
      .raw('SELECT openmic_interactions.comment, openmic_interactions.user_id, openmic_interactions.date_created FROM openmic_interactions where media_id = ?', [media_id]).then(data => data.rows);
  },

  getRating(db, id) {
    return db
      .raw(`SELECT AVG(rating) AS rate FROM openmic_interactions WHERE media_id=${id}`).then(data => data.rows[0].rate);
  },                  
};

module.exports = VideosService;