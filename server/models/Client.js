const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  },
  email: { type: String, required: true },
  phone: { type: String },
  address: {
    number: { type: Number },
    street: { type: String },
    unit: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: Number }
  },
  pets: { type: Number },
  note: { type: String },
  rentRate: { type: Number },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' }
})

clientSchema.methods.updateAddress = function () {
  this.address = this.property.address
  return this.save()
}

clientSchema.methods.calculateRent = function () {
  this.rentRate = (this.property.baseRent + (this.pets * 100)) || 0
  return this.save()
}

const Client = mongoose.model('Client', clientSchema)

module.exports = Client

// GENERATOR

// [
//   '{{repeat(5, 7)}}',
//   {
//     name: {
//       firstName: '{{firstName()}}',
//       lastName: '{{surname()}}'
//           },
//     email: '{{email()}}',
//     phone: '+1 {{phone()}}',
//     address: {
//       number: '{{integer(100, 999)}}',
//       street: '{{street()}}',
//       unit: '{{integer(1, 600)}}',
//       city: '{{city()}}',
//       state: '{{state()}}',
//       zip: '{{integer(10000, 99999)}}'
//              },
//     pets: '{{integer(0, 5)}}',
//     note: '{{lorem(1, "paragraphs")}}'
//   }
// ]
