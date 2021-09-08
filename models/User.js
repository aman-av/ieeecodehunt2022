const mongoose = require('mongoose');
const {Schema} =  mongoose;

const userSchema = new Schema({
    usn:{type : String},
    name: {type : String},
    intime:[{type:Number,default:0}],
    quiztime:[{type:Number,default:0}],
    endtime:[{type:Number,default:0}],
    quizpoints:{type:Number,default:0},
    quizCountDownTime:{type :Number , default:0},
    quizQuestionIndex:{type:Number,default:0},
    crosswordpoints:{type:Number,default:0},
    entrydone:{type:Boolean, default:false},
    quizdone:{type:Boolean, default:false},
    crossworddone:{type:Boolean, default:false},
    totalpoints:{type:Number,default:0},
    totaltime:{type:Number,default:0}
});


mongoose.model('details',userSchema);