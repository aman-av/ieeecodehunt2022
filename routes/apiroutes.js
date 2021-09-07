const mongoose = require("mongoose");
require("../models/User");
require("../models/Date");
const User = mongoose.model("details");
const Dates = mongoose.model("eventdates");
module.exports = (app) => {
  app.post("/api/1", async (req, res) => {
    const newDate = req.body.date;
    const profile = req.body.usn;
    console.log("API1");
    console.log(profile);
    await User.findOneAndUpdate(
      { usn: profile },
      { intime: newDate, entrydone: true }
    );
  });

  app.post("/api/2", async (req, res) => {
    const newDate = req.body.date;
    const profile = req.body.usn;
    console.log("API2");
    console.log(profile);
    await User.findOneAndUpdate(
      { usn: profile },
      { quiztime: newDate, quizdone: true, }
    );
  });
  app.post("/api/8", async (req,res)=>{
      console.log("api 8");
      const quizpoints = req.body.quizpoints;
      const profile = req.body.usn;
      const quizQuestionIndex = req.body.nextQuestion;
      await User.findOneAndUpdate(
          {usn: profile},
          {quizpoints:quizpoints , quizQuestionIndex:quizQuestionIndex,totalpoints : quizpoints*10}
      );
  });

  app.post("/api/3", async (req, res) => {
    const newDate = req.body.date;
    const end = newDate[0] * 3600 + newDate[1] * 60 + newDate[2];
    const profile = req.body.usn;
    const crosswordpoints = req.body.crosswordpoints;

    console.log("API3");
    console.log(req.body.crosswordpoints);
    console.log(profile);

    const member = await User.findOne({ usn: profile });
    //console.log(member.quizpoints);
    const val = member.crosswordpoints + member.quizpoints*10;

    console.log("begin");
    await User.findOneAndUpdate(
      { usn: profile },
      {
        endtime: newDate,
        crossworddone: true,
        crosswordpoints: member.crosswordpoints,
        totalpoints: val,
        totaltime: end,
      }
    );
    console.log("end");
  });
  app.post("/api/9" , async (req,res) => {
    const newDate = req.body.date;
    const end = newDate[0] *3600 + newDate[1] *60 + newDate[2];
    const profile = req.body.usn;
    const member = await User.findOne({ usn: profile });
    //console.log(member.quizpoints);
    const val = member.crosswordpoints + (member.quizpoints*10);
  
    await User.findByIdAndUpdate(
      {usn : profile},
      {
        quiztime :newDate,
        endtime : newDate,
        crossworddone : true,
        crosswordpoints : member.crosswordpoints,
        totalpoints : val,
        totaltime :end,
        quizdone :true

      }
    )
  })

  app.get("/api/4/:usnId", async (req, res) => {
      console.log("api 4");
    await User.find({ usn: req.params.usnId })
      .then(function (participant) {
        res.json({ participant });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  app.get("/api/5", async (req, res) => {
    console.log("API5");
    await User.find()
      .populate("name", "usn", "quiztime")
      .then((participant) => {
        res.json({ participant });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.get("/api/6", async (req, res) => {
    console.log("API -6");
    await Dates.find()
      .then((dates) => {
        res.json({ dates });
      })
      .catch((err) => {
        console.log(err);
      });
  });


  // app.get('/api/1',async(req,res)=>{

  //     var newArr;
  //     User.find({}).sort({order:1}).exec(function(err, users) {
  //         if(err)
  //     console.warn(err);
  //      newArr = users.map(function(val, index){
  //      return {key:index, value:val.name};
  //     })

  //     res.send(JSON.stringify(newArr));

  //     });

  //  });
  app.get("/api/7", (req, res) => {
    // const user=await User.find().sort({"totalpoints":1});
    // const sorteddata=user.sort({"totalpoints":1});
    // console.log(sorteddata);
    // res.send(sortedjson);
    var newArr;
    User.find({})
      .sort({ totalpoints: -1, totaltime: 1 })
      .exec(function (err, users) {
        if (err) console.warn(err);
        newArr = users.map(function (val, index) {
          return { key: index, value: val };
        });

        res.send(JSON.stringify(newArr));
      });
  });
};
