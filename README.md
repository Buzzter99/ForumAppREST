Nodejs REST Application supporting angular project which can be located at https://github.com/Buzzter99/ForumAppAngular.
This backend is developed on node 22.11.0 but can be run on lower versions as well. Project uses mongo as database and odm mongoose.
Environment variables:
MONGODB_CONNECTIONSTRING - custom connection string. If not specified it will try to connect to mongodb://localhost:27017/BusarovForumDb(see dbconfig.js).
JWT_SECRET - jwt secret for the jwt token which handles the authentication and authorization process. Default value is JWT_SECRET if not specified(see authenticationMiddleware.js). After providing a database to connect to api can be started with npm start or npm run start. By default application starts on port 3000 or what is set in environment variable PORT.