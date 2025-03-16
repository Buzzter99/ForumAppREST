Nodejs REST Application supporting frontend SPA projects.
This backend is developed on node 22.11.0 but can be run on lower versions as well. Project uses mongo as database and ODM mongoose. Run npm install to install required dependencies.
Environment variables:
MONGODB_CONNECTIONSTRING - custom connection string. If not specified it will try to connect to mongodb://localhost:27017/BusarovForumDb(see dbconfig.js).
JWT_SECRET - jwt secret for the jwt token which handles the authentication and authorization process. Default value is JWT_SECRET if not specified(see authenticationMiddleware.js). 
API_KEY - Api key which the application will check if it exists in X-API-KEY Header. Api will not work if this is not provided
DROPBOX_CLIENT_ID - dropbox client id if using dropbox storage
DROPBOX_CLIENT_SECRET - dropbox client secret of the app
DROPBOX_REFRESH_TOKEN - refresh token for getting access tokens
After providing required environment variables the api it can be started with npm start or npm run start. By default application starts on port 3000 or what is set in environment variable PORT.