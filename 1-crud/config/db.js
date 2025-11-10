const mongoose = require('mongoose');

//mongodb uri
const MONGO_URI = 'mongodb+srv://alfonsodasilva:5RIOMdgiRIYgMP1E@clustermir.qtrppnw.mongodb.net/exemple_1_crud?appName=ClusterMir';

//connect to db
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {});  
    console.log('Mongoose connected to MONGODB Atlas');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;