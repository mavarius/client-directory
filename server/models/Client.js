const mongoose = require('mongoose')
const moment = require('moment')

const clientSchema = new mongoose.Schema({
  name: {
    firstName: { type: String, minlength: [1, 'must enter first name'] },
    lastName: { type: String, minlength: [1, 'must enter last name'] }
  },
  age: { type: Number, min: [0, 'Too young'], max: [120, 'Too old'] },
  allergies: [ { type: String } ],
  gender: { type: String, enum: ['male', 'female'] },
  lastVisit: { type: Date,
               validate: {
                 validator: function (value) {
                   return ((moment(value).unix()) <= (moment().unix()))
                 },
                 message: '{VALUE} is after today; time travelling not allowed!'
               }
             }
})

clientSchema.statics.findCustom = function (query) {
  let { gender, minage, maxage, visitafter, visitbefore, allergy } = query

  let fields = Object.keys(query)

  let queryBuild = {}

  fields.forEach(field => {
    if (field === 'gender') queryBuild['gender'] = gender
    if ((field === 'minage' || field === 'maxage') && !queryBuild.age) queryBuild['age'] = {}
    if (field === 'minage') queryBuild['age']['$gt'] = minage
    if (field === 'maxage') queryBuild['age']['$lt'] = maxage
    // if (field === 'visitafter') queryBuild['visitafter'] = 
  })

  console.log('queryBuild: ', queryBuild)

  return this.find(queryBuild)
}

const Client = mongoose.model('Client', clientSchema)

module.exports = Client
