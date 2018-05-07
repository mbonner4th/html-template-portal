const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = mongoose.Schema({
  email: {
      type:String, 
      requred: true,
      unique: true
    },
  password: {
      type: String, 
      required: true
  },
  application:[{type: Schema.ObjectId,ref: 'application'}]
  
});
const userModel = mongoose.model('user', userSchema);


module.exports= userModel;