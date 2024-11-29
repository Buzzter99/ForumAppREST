const mongoose = require('mongoose');
const env = require('dotenv').config();
async function OpenDbConnection() {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING || 'mongodb://localhost:27017/BusarovForumDb')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Error connecting to MongoDB', err));
}
module.exports = {OpenDbConnection};
