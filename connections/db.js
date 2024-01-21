const mongoose = require('mongoose');



const connectDB = async () => {
    try {
      const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`\n Connected to DB !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
      console.error("Mongo connection is FAILED: ", error);
      process.exit(1); // exit with failure
    }
}


module.exports = connectDB;
