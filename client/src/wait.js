import React, { useEffect, useState } from "react";
import "./style.css";
import "./wait-page-style.css";
import "./login_page_style.css";
import { Redirect } from "react-router-dom";
import { Container,Row,Col } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import img from "./images/3.png";
import img1 from './images/1.png'

export default function WaitPage(props) {
  const [day, setDay] = useState();
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [second, setSeconds] = useState();
  const [page, setPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(function () {
      timeBetweenDates(props.eventStartDate);
    }, 1000);
    return () => clearInterval(timer);
  });

  const timeBetweenDates = (toDate) => {
    var dateEntered = toDate;
    var now = new Date();
    var difference = dateEntered.getTime() - now.getTime();
    if (difference <= 0) {
      // clearInterval(timer);
    } else {
      var seconds = Math.floor(difference / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);
      var days = Math.floor(hours / 24) - 30;

      hours %= 24;
      minutes %= 60;
      seconds %= 60;
      setDay(days);
      setHour(hours);
      setMinute(minutes);
      setSeconds(seconds);
    }
  };
  useEffect(() => {
    if (day < 0) {
      setIsLoading(true);
      localStorage.removeItem("guesses")
      const usn = localStorage.getItem("usn");
      const currentdate = new Date();
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
      fetch("/api/1", options).then((res) => {
        console.log("wait");
        setIsLoading(false);
        setPage(false);
      });
    } else {
      console.log("not wait");
    }
  }, [day]);

  if (isLoading) {
    return <Container />;
  } else {
    if (page == true) {
      return (
        <div>
          <Navbar style={{ backgroundColor: "#7798ab", color: "black" }}>
            <Container>
              <Navbar.Brand style={{ fontSize: 30, fontWeight: "bold" ,fontFamily :"StarJediOutline"}}>
                <img
                  alt=""
                  src={img}
                  width=""
                  height="50"
                  className="d-inline-block align-top"
                />{" "}
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;MINDFEST
              </Navbar.Brand>
              <Nav className="me-auto"></Nav>
              <Nav
                style={{
                  color: "black",
                  fontSize: 15,
                  textTransform: "uppercase",
                }}
              >
                <Nav.Link
                  href="/Example"
                  style={{ fontSize: 15, color: "black" }}
                >
                 <img src={img1} height="40"/>&emsp;&emsp;&emsp;&emsp;
                </Nav.Link>
                {localStorage.getItem("name")} <br />
                {localStorage.getItem("usn")}
              </Nav>
            </Container>
          </Navbar>
          <div style ={{padding :"4%"}}>
            <Row>
              <Col className="rules" style = {{color : "white" }}
              // style={{border:"solid",borderColor:"white",marginTop:"2%",marginBottom:"2%",color:"white",scrollBehavior:"unset"}}
              >
               
                <div id="stars"></div>
                <div id="stars2"></div>
                <h3 style={{textAlign:"left",}}>Things to keep in mind :</h3>
                <p>*</p>
                <p>*</p>
                <p>*</p>
                <p>*</p>
                <p>*</p>
            
            
            
              </Col>
              <Col >
              <section className="timer-container">
            <div id="stars"></div>
            <div id="stars2"></div>
            <h2 style={{textAlign:"center",marginTop:"80px"}}>Event will start in:</h2>

            <section className="timer">
              
              <div>
                <section>
                  
                  {day == null ? (
                    <p>00</p>
                  ) : day < 10 ? (
                    <p>0{day}</p>
                  ) : (
                    <p>{day}</p>
                  )}

                  <p>
                    <small>Days</small>
                  </p>
                </section>
                <span>:</span>
                <section>
                  {hour == null ? (
                    <p>00</p>
                  ) : hour < 10 ? (
                    <p>0{hour}</p>
                  ) : (
                    <p>{hour}</p>
                  )}

                  <p>
                    <small>Hours</small>
                  </p>
                </section>
                <span>:</span>
                <section>
                  {minute == null ? (
                    <p>00</p>
                  ) : minute < 10 ? (
                    <p>0{minute}</p>
                  ) : (
                    <p>{minute}</p>
                  )}

                  <p>
                    <small>Minutes</small>
                  </p>
                </section>
                <span>:</span>
                <section>
                  {second == null ? (
                    <p>00</p>
                  ) : second < 10 ? (
                    <p>0{second}</p>
                  ) : (
                    <p>{second}</p>
                  )}

                  <p>
                    <small>Seconds</small>
                  </p>
                </section>
              </div>
            </section>
          </section>
              </Col>
            </Row>
          </div>
          
        </div>
      );
    } else {
      return <Redirect to="/Quiz" />;
    }
  }
}
