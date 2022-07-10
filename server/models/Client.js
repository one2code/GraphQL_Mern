// Mongoose model for client

const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
});

module.exports = mongoose.model("Client", ClientSchema);
