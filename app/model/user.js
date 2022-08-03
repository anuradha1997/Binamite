const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    }
});
const User=mongoose.model('User',userSchema);
exports.userDetails=User;
// exports.schema=userSchema;