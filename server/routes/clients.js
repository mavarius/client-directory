const express = require('express')
const router = express.Router()

const Client = require('../models/Client')

router.route('/:id')
  .get((req, res) => {
    Client.findById(req.params.id)
      .then(client => res.send(client))
      .catch(err => res.status(400).send(err))
  })
  .put((req, res) => {
    Client.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then(client => res.send(client))
      .catch(err => res.status(400).send(err))
  })
  .delete((req, res) => {
    Client.findByIdAndRemove(req.params.id)
      .then(clients => clients.save())
      .then(res.send('deleted'))
      .catch(err => res.status(400).send(err))
  })

router.route('/')
  .get((req, res) => {
    Client.findCustom(req.query)
      .skip(((parseInt(req.query.page) * (parseInt(req.query.pagesize) || 20)) - (parseInt(req.query.pagesize) || 20)) || 0)
      .limit(parseInt(req.query.pagesize) || 20)
      .then(clients => res.send(clients))
      .catch(err => res.status(400).send(err))
  })
  .post((req, res) => {
    console.log('req.body: ', req.body)
    Client.create(req.body)
      .then(client => res.send(client))
      .catch(err => res.status(400).send(err))
  })

module.exports = router
