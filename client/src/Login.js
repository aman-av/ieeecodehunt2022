import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import ReactLoading from "react-loading";
import './login_page_style.css';

function Login() {
  const [usn, setusn] = useState(null);
  const [page, setPage] = useState("login");
  const [isLoading, setIsLoading] = useState("false");
  const eventStartDate = new Date(2021, 7, 30, 20, 0, 0, 0);
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

    // setIsLoading("true");
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
            setPage("wait");
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
        // console.log(result.participant[0].intime);
        // var participant = result.participant[0];
        // if (timeBetweenDates(eventStartDate) >= 0) {
        //   setPage("wait");
        // } else {
        //   if (participant.entrydone == true) {
        //     if (
        //       participant.quizdone == false &&
        //       participant.crossworddone == false
        //     ) {
        //       setPage("quiz");
        //     } else if (
        //       participant.quizdone == true &&
        //       participant.crossworddone == false
        //     ) {
        //       setPage("crossword");
        //     } else {
        //       setPage("final");
        //     }
        //   } else {
        //     fetch("/api/1", options);
        //     setPage("quiz");
        //   }
        // }
      });
    // fetch('/api/5/')
    // .then(res => res.json())
    // .then(
    //   result =>{
    //     console.log(JSON.stringify(result));
    //   }
    // )
  };
  useEffect(() => {
    console.log(usn);
  }, [usn]);

  if (page === "login") {
    return !isLoading ? (
      <ReactLoading type={"bars"} color={"#03fc4e"} height={100} width={100} />
    ) : (
      <section className = "loginpage" id= "loginpage" >
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div style = {{backgroundColor : "transparent"}}>
        <form style = {{backgroundColor : "transparent"}}>
          <label>
            USN:
            <input
              type="text"
              name="usn"
              value={usn}
              onChange={(e) => setusn(e.target.value)}
            />
          </label>
        </form>

        {/* <Button variant="dark" href="/Quiz" onClick={handler}>
          Submit
        </Button> */}
        <Button variant="dark" onClick={handler}>
          Submit
        </Button>
      </div>
      </section>
    //   <div style = {{backgroundColor : "transparent"}}>
    //   <form style = {{backgroundColor : "transparent"}}>
    //     <label>
    //       USN:
    //       <input
    //         type="text"
    //         name="usn"
    //         value={usn}
    //         onChange={(e) => setusn(e.target.value)}
    //       />
    //     </label>
    //   </form>

    //   {/* <Button variant="dark" href="/Quiz" onClick={handler}>
    //     Submit
    //   </Button> */}
    //   <Button variant="dark" onClick={handler}>
    //     Submit
    //   </Button>
    // </div>
      
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
