const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('details');
module.exports = (app) =>{

   
    
    app.post('/api/1',async(req,res)=>{
       
        const newDate=req.body.date;
        const profile=req.body.usn;
        console.log('API1');
        console.log(profile);
        await User.findOneAndUpdate({usn:profile},{intime:newDate,entrydone:true});
       
         
     });

     app.post('/api/2',async (req,res) =>{
     
        
     
        const newDate=req.body.date;
        const profile=req.body.usn;
        console.log('API2');
        console.log(profile);
        await User.findOneAndUpdate({usn:profile},{quiztime:newDate,quizdone:true});
    
    });

    app.post('/api/3',async (req,res) =>{
       
        const newDate=req.body.date;
        const profile=req.body.usn;
        console.log('API3');
        console.log(profile);
        await User.findOneAndUpdate({usn:profile},{endtime:newDate,crossworddone:true});
    
    });

    

    
};