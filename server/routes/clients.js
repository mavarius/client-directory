const express = require('express')
const router = express.Router()

const Client = require('../models/Client')

// router.route('/moveIn/:id')
//   .put((req, res) => {
//     Client.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
//       .then(client => {
//         client.updateAddress()
//         client.calculateRent()
//         return client.save()
//       })
//       .then(
//         Property.findById(req.body.property)
//           .then(property => {
//             if (property.tenants.indexOf(req.params.id) === -1) property.tenants.push(req.params.id)
//             return property.save()
//           })
//           .catch(err => res.status(400).send(err))
//       )
//       .then(savedClient => res.send(savedClient))
//       .catch(err => res.status(400).send(err))
//   })
//
// router.route('/moveOut/:id')
//   .put((req, res) => {
//     Client.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
//       .populate('property')
//       .then(
//         Property.findById(req.body.property)
//           .then(property => {
//             property.tenants = property.tenants.filter(id => req.params.id.toString() !== id.toString())
//             return property.save()
//           })
//           .catch(err => res.status(400).send(err))
//       )
//       .then(client => {
//         client.property = {
//           _id: ''
//         }
//         client.calculateRent()
//         return client.save()
//       })
//       .then(savedClient => res.send(savedClient))
//       .catch(err => res.status(400).send(err))
//   })

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
      .then(
        Client.find()
          .then(clients => res.send(clients))
      )
      .catch(err => res.status(400).send(err))
  })

router.route('/')
  .get((req, res) => {
    Client.find()
      .then(clients => res.send(clients))
      .catch(err => res.status(400).send(err))
  })
  .post((req, res) => {
    console.log('req.body: ', req.body)
    Client.create(req.body)
      .then(client => {
        // console.log('client: ', client)
        return res.send(client)
      })
      .catch(err => res.status(400).send(err))
  })

module.exports = router
