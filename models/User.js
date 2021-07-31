const mongoose = require('mongoose');
const {Schema} =  mongoose;

const userSchema = new Schema({
    usn:{type : String},
    name: {type : String},
    intime:[{type:Number,default:null}],
    quiztime:[{type:Number,default:null}],
    endtime:[{type:Number,default:null}],
    points:{type:Number,default:0},
    entrydone:{type:Boolean, default:false},
    quizdone:{type:Boolean, default:false},
    crossworddone:{type:Boolean, default:false}
});


mongoose.model('details',userSchema);