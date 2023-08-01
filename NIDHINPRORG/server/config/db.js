const mongoose = require('mongoose');
const connectDB = async () => {
  
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://localhost:27017/MainPr02');
    console.log('Database Connected');
  } catch (error) {
    console.log(error);
  }

}

module.exports = connectDB;
