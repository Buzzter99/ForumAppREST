const allowedOrigins = [];
const env = require("dotenv").config();
if(process.env.PROD_ENV_ADDR){
    allowedOrigins.push(`http://${process.env.PROD_ENV_ADDR}`);
}
allowedOrigins.push("http://localhost:4200","http://localhost");
module.exports = allowedOrigins;
