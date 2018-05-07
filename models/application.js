const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({ 
  apptName:{
    type: String, 
    require: true
  },
  basicAuth: {
    type:String, 
    requred: true
  },
  url: {
    type: String,
    require:true
  }
});
const applicationModel = mongoose.model('application', applicationSchema);


module.exports= applicationModel;