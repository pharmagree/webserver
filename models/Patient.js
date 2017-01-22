const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: { type: String, required: true },
  medications: [Schema.Types.ObjectId]
});

module.exports('patient', patientSchema);
