var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DateOnly = require('mongoose-dateonly')(mongoose);

var medSchema = new Schema({
	metadata: {
		name: { type: String, required: true},
		dailyAmount: {type: Number, required: true},
		dailyUnit: { type: String, required: true}
	}
	data: [
		{
			day: { type: DateOnly, default: new DateOnly()},
			video: { type: String, required: true},
			status: { type: String, enum: ['nottaken', 'uploaded', 'approved', 'denied'], default: 'nottaken' }
		}
	]
})

module.exports = mongoose.model('medication', medSchema);
