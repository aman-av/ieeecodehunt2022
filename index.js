const express= require('express');
const mongoose = require('mongoose');
//const cookieSession = require('cookie-session');
//const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
//const cors = require('cors');
global.user_id=null;
mongoose.connect(keys.mongoURI,
    {
        useUnifiedTopology:true,
        useNewUrlParser:true
    });

const app = express();

app.use(express.json({ limit:'1mb'}));


//app.use(cors);
// app.use(
//     cookieSession({
//         maxAge: 30*24*60*60*1000,
//         keys: [keys.cookieKey]
//     })
// );
//app.use('/api2');
//app.use('/api1');
// app.use(passport.initialize());
// app.use(passport.session());
//require('./routes/authroutes')(app);
require('./routes/apiroutes')(app);


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

