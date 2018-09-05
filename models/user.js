const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {
      type:String, 
      requred: true,
      unique: true,
    },
  hashedPassword: {
      type: String, 
      required: true
    },
  apiKey:{
    type: String,
  },
  basicAuth: {
    type: String,
  }
});

userSchema.plugin(uniqueValidator)

userSchema.methods.validPassword = function(plainPassword) {
    return bcrypt.compareSync(plainPassword, this.hashedPassword);
};

userSchema.virtual("password").set(function(value) {
    this.hashedPassword = bcrypt.hashSync(value, 12);
});

const userModel = mongoose.model('user', userSchema);


module.exports= userModel;