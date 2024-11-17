const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema
const userSchema = new Schema({
  username: {type: String,required: [true,'Username field is required']
  },
    email: {type: String,required: [true,'Email field is required'],
      unique: true
    },
    password: {type: String,required: [true,'Password field is required'],
    }
  });
  userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
const User = mongoose.model('User', userSchema)
module.exports = User