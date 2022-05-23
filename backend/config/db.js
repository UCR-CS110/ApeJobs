const mongoose = require("mongoose");

const connectDB = async () => {
	// console.log(process.env.MONGO_URI);
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

module.exports = connectDB; 
