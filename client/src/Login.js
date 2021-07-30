import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import './css/login.css';

function Login() {
  const [usn, setusn] = useState(null);
  const [istrue, setistrue] = useState("false");
  const handler = () => {
    localStorage.setItem("usn", usn);

    console.log(usn);
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
    setistrue("true");
  };
  useEffect(() => {
    console.log(usn);
  }, [usn]);

  if ( istrue === "false"){
    return (
      <div className="back">
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
            href="/Quiz"
            onClick={handler}
          >
            Start Quiz
          </Button>

          
        </div>
      </div>
    );
  }
  else {
    return <Redirect to="/Quiz"/>;
  }
  
}

export default Login;
