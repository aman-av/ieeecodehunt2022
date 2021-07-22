const mongoose = require('mongoose');
const {Schema} =  mongoose;

const userSchema = new Schema({
    googleId:String,
    name:String,
    order:{type:Number,default:10000000},
    time:{type:Array,default:null},
    points:{type:Number,default:0},
    intime:{type:Array,default:null}
});


mongoose.model('details',userSchema);