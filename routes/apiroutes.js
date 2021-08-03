const mongoose = require('mongoose');
require('../models/User');
require('../models/Date');
const User = mongoose.model('details');
const Dates = mongoose.model('Event-Dates');
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
        const quizpoints=req.body.quizpoints;
        console.log('API2');
        console.log(profile);
        await User.findOneAndUpdate({usn:profile},{quiztime:newDate,quizdone:true,quizpoints:quizpoints});
    
    });

    app.post('/api/3',async (req,res) =>{
       
        const newDate=req.body.date;
        const profile=req.body.usn;
        const crosswordpoints=req.body.crosswordpoints;
        console.log('API3');
        console.log(profile);
        await User.findOneAndUpdate({usn:profile},{endtime:newDate,crossworddone:true,crosswordpoints:crosswordpoints});
    
    });

    app.get('/api/4/:usnId',async (req,res) => {
        await User.find({usn : req.params.usnId}).then(function (participant){
            res.json ({ participant})
        })
        .catch(err => {
            console.log(err)
        })
    })
    app.get('/api/5',async (req,res) => {
        console.log('API5');
        await User.find().populate(
            "name","usn","quiztime"
            ).then(participant => {
            res.json ({participant})
        })
        .catch(err => {
            console.log(err);
        })
    })

    app.get('/api/6',async(req,res) =>{
        console.log('API -6');
        await Dates.find().then(
            dates => {
                console.log(dates);
                res.json({dates})
            }
        ).catch(err =>{
            console.log(err);
        })
    })

    

    
};