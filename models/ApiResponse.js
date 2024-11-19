class ApiResponse{
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = {ApiResponse};