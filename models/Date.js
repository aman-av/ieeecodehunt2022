const mongoose = require('mongoose');
const {Schema} =  mongoose;

const dateSchema = new Schema({
    eventStartTime:{type :Date}
});


mongoose.model('eventdates',dateSchema);