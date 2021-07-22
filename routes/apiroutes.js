const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('details');
module.exports = (app) =>{

    app.post('/api/2',async (req,res) =>{
        console.log("my data")
        console.log(req.body.points);
        const newpoints=req.body.points;
        const newDate=req.body.date;
        const profile=req.user.googleId;
        const sum=newDate[0]*3600+newDate[1]*60+newDate[2];
        await User.findOneAndUpdate({googleId:profile},{time:newDate,points:newpoints,order:sum});
    
    });
    
    app.get('/api/1',async(req,res)=>{

        var newArr;
        User.find({}).sort({order:1}).exec(function(err, users) { 
            if(err)
        console.warn(err);
         newArr = users.map(function(val, index){
         return {key:index, value:val.name};
        })
       
        
       
        res.send(JSON.stringify(newArr));
    
        });
         
     });

     app.post('/api/3',async (req,res) =>{
        console.log("api3")
       
        const newDate=req.body.date;
        const profile=req.user.googleId;
        await User.findOneAndUpdate({googleId:profile},{intime:newDate});
    
    });

     app.get('/api/4',async(req,res)=>{
         const val= await User.findById(req.user);
         console.log(val);
         res.send(JSON.stringify(val.intime));
     })

};