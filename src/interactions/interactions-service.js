const xss = require('xss')

const InteractionsService = {
  getById(db, id) {
    console.log('GETBYID', id)
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
      .where('interaction.id', id)
      .first()
  },


    // rename save interaction
  // insertComment(db, newComment) {
  //   // return db
  //   //   .raw(`INSERT INTO openmic_interactions (comment, media_id, user_id)
  //   //         VALUES ('${newComment.comment}', '${newComment.media_id}', '${newComment.user_id}')`)
  //   let recordExists = false;// do a get interaction should return true or false 
  //   if (recordExists === true) {
  //     return updateInteraction(db, newComment);
  //   } else {
  //     return insertInteraction(db, newComment);
  //   }
  // },

  insertInteraction(db, data) {
    return db
      .insert(data)
      .into('openmic_interactions')
      .returning('*')
      .then(([comment]) => comment)
      .then(comment => {
        console.log('LINE 48', comment)
        return InteractionsService.getById(db, comment.id) 
        // return comment 
      })
  },


  // updateInteraction() {

  // }



  serializeComment(comment) {
    const { user } = comment
    console.log('SERIALIZE', user)
    return {
      id: comment.id,
      comment: xss(comment.comment),
      media_id: comment.media_id,
      date_created: new Date(comment.date_created),
      user: {
        user_id: user.id,
        user_name: user.user_name,
        full_name: user.full_name,
        date_created: new Date(user.date_created),
        date_modified: new Date(user.date_modified) || null
      },
    }
  }
}

module.exports = InteractionsService