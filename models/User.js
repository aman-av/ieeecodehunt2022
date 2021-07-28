const mongoose = require('mongoose');
const {Schema} =  mongoose;

const userSchema = new Schema({
    usn:String,
    name:String,
    intime:{type:Array,default:null},
    quiztime:{type:Array,default:null},
    endtime:{type:Array,default:null},
    points:{type:Number,default:0},
    entrydone:{type:Boolean, default:false},
    quizdone:{type:Boolean, default:false},
    crossworddone:{type:Boolean, default:false}
});


mongoose.model('details',userSchema);