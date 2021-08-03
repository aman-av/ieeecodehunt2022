import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./login_page_style.css";
import "./css/login.css";

function Login() {
  const [usn, setusn] = useState(null);
  const [page, setPage] = useState("login");
  // const [isLoading, setIsLoading] = useState("false");
  const eventEndDate =  new Date( 2021,8,10,20,0,0,0);
  const eventStartDate = new Date(2021, 8, 1, 20, 0, 0, 0);
  const currentdate = new Date();
  const timeBetweenDates = (toDate) => {
    var dateEntered = toDate;
    var now = new Date();
    var difference = dateEntered.getTime() - now.getTime();
    console.log(difference);
    if (difference <= 0) {
      // Timer done
      // clearInterval(timer);
    } else {
      var seconds = Math.floor(difference / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);
      var days = Math.floor(hours / 24) - 31;

      hours %= 24;
      minutes %= 60;
      seconds %= 60;

      return days;
    }
  };

  const handler = () => {
    localStorage.setItem("usn", usn);

    console.log(usn);

    var date = [
      currentdate.getHours(),
      currentdate.getMinutes(),
      currentdate.getSeconds(),
    ];

    const data = { usn, date };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(`api/4/${usn}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.participant[0] === undefined) {
          console.log("user doesnt exits");
        } else {
          console.log(result);
          console.log(result.participant[0].intime);
          var participant = result.participant[0];
          if (timeBetweenDates(eventStartDate) >= 0) {
            if(timeBetweenDates(eventEndDate) < 0){
              setPage("final")
            }
            else{
              setPage("wait");
            }
            
          } else {
            if (participant.entrydone == true) {
              if (
                participant.quizdone == false &&
                participant.crossworddone == false
              ) {
                setPage("quiz");
              } else if (
                participant.quizdone == true &&
                participant.crossworddone == false
              ) {
                setPage("crossword");
              } else {
                setPage("final");
              }
            } else {
              fetch("/api/1", options);
              setPage("quiz");
            }
          }
        }
      });
  };
  useEffect(() => {
    console.log(usn);
  }, [usn]);

  if (page === "login") {
    return (
      <div className="back">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div className="login-card">
          <h4>Login</h4>

          <form className="quiz-form">
            <label style={{ margin: "0.25rem" }}>
              <h6>USN:</h6>
            </label>
            <input
              type="text"
              name="usn"
              value={usn}
              onChange={(e) => setusn(e.target.value)}
              style={{ margin: "0.75rem", justifyContent: "center" }}
            />
          </form>

          <Button
            className="login-btn"
            variant="dark"
            backgroundColor="#011624"
            onClick={handler}
          >
            Start Quiz
          </Button>
        </div>
      </div>
    );
  } else if (page === "quiz") {
    return <Redirect to="/Quiz" />;
  } else if (page === "wait") {
    return <Redirect to="/Wait" />;
  } else if (page === "crossword") {
    return <Redirect to="/Dashboard" />;
  } else if (page === "final") {
    return <Redirect to="/Final" />;
  }
}

export default Login;
