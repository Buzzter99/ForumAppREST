const express = require('express');
const cors = require('cors');
const {corsOptions} = require('./corsConfig');
function expressConfig(app) {
    app.use(express.json());
    app.use(cors(corsOptions));
}
module.exports = {expressConfig};
