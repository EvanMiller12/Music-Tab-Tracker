const {
  History,
  Songs
} = require('../models')

const _ = require('lodash')

module.exports = {
  async getHistory (req, res) {
    try {
      const userId = req.user.id // from token
      // returns history w/ specific songId, if doesnt exist returns null
      const histories = await History.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Songs
          }
        ],
        order: [
          ['createdAt', 'DESC']
        ]
      })
        .map(history => history.toJSON())
        .map(history => _.extend(
          {},
          history.Song,
          history
        ))
      // send histories obj back w/ key SongId so dont get duplicates
      res.send(_.uniqBy(histories, history => history.SongId))
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the history'
      })
    }
  },
  async postHistory (req, res) {
    try {
      const userId = req.user.id
      const {songId} = req.body
      // create association b/t history, songs and user models
      const history = await History.create({
        SongId: songId,
        UserId: userId
      })
      res.send(history) // send back history association obj after created
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the history object'
      })
    }
  }
}
