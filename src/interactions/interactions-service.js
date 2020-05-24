const xss = require('xss')

const InteractionsService = {
  getById(db, id) {
    return db
      .from('openmic_interactions AS interaction')
      .select(
        'interaction.id',
        'interaction.comment',
        'interaction.rating',
        'interaction.date_created',
        'interaction.media_id',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.user_name,
                  usr.full_name,
                  usr.date_created,
                  usr.date_modified
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .leftJoin(
        'openmic_users AS usr',
        'interaction.user_id',
        'usr.id',
      )
      .where('interaction.id',id)
      .first()
  },

  insertComment(db, newComment) {
    return db
      .raw(`INSERT INTO openmic_interactions (comment, media_id, user_id)
            VALUES ('${newComment.comment}', '${newComment.media_id}', '${newComment.user_id}')`)
      // .insert(newComment)
      // .into('openmic_interactions')
      // .returning('*')
      // .then(([comment]) => comment)
      // .then(comment => {
      //   console.log('LINE 44', comment)
      //   InteractionsService.getById(db, comment.id)  
      // })
  },

  serializeComment(comment) {
    const { user } = comment
    return {
      id: comment.id,
      text: xss(comment.text),
      video_id: comment.video_id,
      date_created: new Date(comment.date_created),
      user: {
        user_name: user.user_name,
        full_name: user.full_name,
        date_created: new Date(user.date_created),
        date_modified: new Date(user.date_modified) || null
      },
    }
  }
}

module.exports = InteractionsService