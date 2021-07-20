const express= require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
//const cors = require('cors');

mongoose.connect(keys.mongoURI,
    {
        useUnifiedTopology:true,
        useNewUrlParser:true
    });


const User = mongoose.model('details');
const app = express();

app.use(express.json({ limit:'1mb'}));


//app.use(cors);
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());
require('./routes/authroutes')(app);

/*app.post('/insert',(req,res)=>{
    const rr=req.json();
    const newpoints=rr.body.points;
    const newDate=rr.body.date;

    const Score=new User({googleId:1212,name:'aman',time:newDate,points:newpoints});
    try{
        Score.save();
        res.send("Insert data");
    }
    catch(err)
    {
        console.log(err);
    }
});
*/
if(process.env.NODE_ENV === 'production')
{
    //express will serve up production assets
    //like our main.js file, or main.css file!
    app.use(express.static('client/build'));

    //Express will serve up the index.html file
    //if it doesn't reconginize the route
    const path= require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);

app.post('/api',async (req,res) =>{
    console.log("my data")
    console.log(req.body.points);
    const newpoints=req.body.points;
    const newDate=req.body.date;
    const profile=req.user.googleId;
    await User.findOneAndUpdate({googleId:profile},{time:newDate,points:newpoints});
   User.find({},(err,users)=>{
       if(err)
       console.warn(err);
       console.warn(users)
   })
      
   // const Score=new User({time:newDate,points:newpoints});
    //Score.save();
});

