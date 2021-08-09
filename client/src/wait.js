import React, { useEffect, useState } from "react";
import "./style.css";
import "./wait-page-style.css";
import "./login_page_style.css";
import { Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function WaitPage(props) {
  const [day, setDay] = useState();
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [second, setSeconds] = useState();
  const [page, setPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  var timer;

  timer = setInterval(function () {
    timeBetweenDates(props.eventStartDate);
  }, 1000);

  const timeBetweenDates = (toDate) => {
    var dateEntered = toDate;
    var now = new Date();
    var difference = dateEntered.getTime() - now.getTime();
    if (difference <= 0) {
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
  useEffect(() => {
    if (day < 0) {
      setIsLoading(true);
      setPage(false);
      const usn=  localStorage.getItem("usn");
      const currentdate = new Date();
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
      fetch("/api/1", options);
      setIsLoading(false);
    }
  }, [day]);
  if (isLoading) {
    return <Container />;
  } else {
    if (page == true) {
      return (
        <section className="timer-container">
          <div id="stars"></div>
          <div id="stars2"></div>
          <section className="timer">
            <div>
              <span className="mdi mdi-calender-clock timer-icon"></span>
              <h2>Countdown Timer</h2>
            </div>
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
      );
    } else {
      return <Redirect to="/Quiz" />;
    }
  }
}
