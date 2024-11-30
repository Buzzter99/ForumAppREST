const origins = require('./allowedOrigins');
const corsOptions = {
    origin: [origins],  
    credentials: true,             
  };
  module.exports = {corsOptions};