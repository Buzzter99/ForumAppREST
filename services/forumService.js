const ForumPost = require('../models/ForumPost');

async function addPost({Topic,Description,AdditionalInfo,When,Who}) {
    if(!Topic) {
        throw new Error('Forum topic is required');
    }
    if(!Description) {
        throw new Error('Forum description is required');
    }
    if(!AdditionalInfo) {
        throw new Error('Forum additional info is required');
    }
    if(!When) {
        throw new Error('Forum creation date is required');
    }
    if(!Who) {
        throw new Error('Forum creator is required');
    }
    await new ForumPost({Topic,Description,AdditionalInfo,When,Who}).save();
}

module.exports = {addPost};