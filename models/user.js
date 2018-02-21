const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
      type:String, 
      requred: true,
      unique: true,
    },
  password: {
      type: String, 
      required: true} 
});
const userModel = mongoose.model('user', userSchema);


module.exports= userModel;