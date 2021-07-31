import React ,{useState,useEffect} from "react";
import { Redirect } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";

export default function WaitPage() {
    const [day ,setDay] = useState();
    const [hour,setHour]= useState();
    const [minute, setMinute]=  useState();
    const [second , setSeconds] = useState();

  var timer;
  var compareDate = new Date(2021, 7, 30, 20, 0, 0, 0); //just for this demo today + 7 days

  timer = setInterval(function () {
    timeBetweenDates(compareDate);
  }, 1000);

  const timeBetweenDates = (toDate) => {
    var dateEntered = toDate;
    var now = new Date();
    var difference = dateEntered.getTime() - now.getTime();
    if (difference <= 0) {
      // Timer done
      clearInterval(timer);
    } else {
      var seconds = Math.floor(difference / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);
      var days = Math.floor(hours / 24) - 31;

      hours %= 24;
      minutes %= 60;
      seconds %= 60;
      setDay(days);
      setHour(hours);
      setMinute(minutes);
      setSeconds(seconds);
      

    }
  };
  return (
    <div>
      <Container>
        <Row>
          <p> {day} : {hour} : {minute} : {second}</p>
        </Row>
      </Container>
    </div>
  );
}
