const origins = require('./allowedOrigins');
const corsOptions = {
    origin: [origins],  
    credentials: true,             
  };
  console.log(origins);
  module.exports = {corsOptions};