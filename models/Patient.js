var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema = new Schema({
	name: {type: String, required: true},
	medications: [Schema.Types.ObjectId] 
})

module.exports('patient', patientSchema);