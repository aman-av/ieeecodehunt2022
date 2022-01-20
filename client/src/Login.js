import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./login_page_style.css";
import "./css/login.css";
import { Navbar, Nav } from "react-bootstrap";
import img3 from "./images/3.png";
import img4 from "./images/4.png";
import img5 from "./images/5.png";
import img6 from "./images/6.png";

import 'react-star-wars-crawl/lib/index.css'
function Login(props) {
  const [usn, setusn] = useState(null);
  const [page, setPage] = useState("login");
  // const [isLoading, setIsLoading] = useState("false");
  // const eventEndDate =  new Date( 2021,8,10,20,0,0,0);
  // const eventStartDate = new Date(2021, 8, 1, 20, 0, 0, 0);
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
    var date = [
      currentdate.getHours(),
      currentdate.getMinutes(),
      currentdate.getSeconds(),
    ];
    const now = new Date();
    const quizCountDownTime = now.getTime();
    const data = { usn, date, quizCountDownTime };
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
          window.alert("Only Registered Users can participate");
          setPage("login");
        } else {
          console.log(result);
          console.log(result.participant[0].intime);
          var participant = result.participant[0];
          console.log(participant.name);
          // setname(participant.name);
          localStorage.setItem("name", participant.name);
          if (timeBetweenDates(props.eventStartDate) >= 0) {
            if (timeBetweenDates(props.eventEndDate) < 0) {
              setPage("final");
            } else {
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
              fetch("/api/1", options).then(() => {
                setPage("quiz");
              });
            }
          }
        }
      });
  };
  // useEffect(() => {
  //   console.log(usn);
  // }, [usn]);

  if (page === "login") {
    return (
      <div>
        {/* <Navbar style={{ backgroundColor: "#7798ab", color: "black" }}>
          <Container>
            <Navbar.Brand style={{ fontSize: 40, fontWeight: "bold" }}>
              <img
                alt=""
                src={img}
                width=""
                height="50"
                className="d-inline-block align-top"
              />{" "}
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;MINDFEST
            </Navbar.Brand>
            <Nav className="me-auto" style={{ color: "black" }}>
            </Nav>
          </Container>
        </Navbar> */}

        <div className="back">
          <div id="stars"></div>
          <div id="stars2"></div>
          <Navbar bg="">
          <Container>
            <Navbar.Brand href="#home">
              <img
                src={img4}
                width=""
                height="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Navbar.Brand href="#home">
              <img
                src={img3}
                width=""
                height="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Navbar.Brand href="#home">
              <img
                src={img5}
                width=""
                height="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Navbar.Brand href="#home">
              <img
                src={img6}
                width=""
                height="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
          </Container>
          </Navbar>
          {/* <Crawl text="hii there"/> */}
          <p style={{textAlign:"center",color:"white",fontSize:"25px",marginTop:"2%",fontFamily :"StarJediOutline"}}>IEEE SPS CHAPTER PRESENTS,<br/></p>
          <p style={{textAlign:"center",color:"yellow",fontSize:"120px", fontFamily :"StarJediOutline"}}>MINDFEST<br/></p>
          <p style={{textAlign:"center",color:"white",fontSize:"20px",fontFamily :"StarJediOutline"}}>QuizWars : The Signal Beckons<br/></p>
          <div className="login-card" >
            <form className="quiz-form">
              <label style={{ margin: "0.25rem" }}>
                <h6>USN:</h6>
              </label>
              <input
                type="text"
                name="usn"
                value={usn}
                onChange={(e) => setusn(e.target.value.toUpperCase())}
                style={{ margin: "0.75rem", justifyContent: "center" }}
              />
            </form>

            <Button
              className="login-btn"
              variant="dark"
              backgroundColor="#011624"
              onClick={handler}
            >
              Enter Event
            </Button>
          </div>
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
