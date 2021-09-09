import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import "./css/quiz.css";
import ProgressBar from "./ProgressBar";
import { Navbar, Nav } from "react-bootstrap";


export default function Quiz(props) {
  const questions = [
    {
      questionType: "text",
      questionText:
        "Multiplication in time domain results in ____________ in the transformed domain",
      answerOptions: [
        { answerText: "A. Convolution", isCorrect: false },
        { answerText: "B. Multiplication", isCorrect: false },
        { answerText: "C. Magnitude scaled multiplication", isCorrect: false },
        { answerText: "D. Magnitude scaled convolution", isCorrect: true },
      ],
    },
    {
      questionType: "text",
      questionText:
        "The architecture used by modern day general purpose processors are:",
      answerOptions: [
        { answerText: "A. Harvard architecture", isCorrect: false },
        { answerText: "B. Von Nuemann architecture", isCorrect: true },
        { answerText: "C. Both a and b", isCorrect: false },
        { answerText: "D. None of the above", isCorrect: false },
      ],
    },
    {
      questionType: "text",
      questionText:
        "The effects of using a limited no of bits to implement filters such as round off noise and coefficient quantisation error are much less significant in which of these filters ?",
      answerOptions: [
        { answerText: "A. IIR filters", isCorrect: false },
        { answerText: "B. Digital filters", isCorrect: false },
        { answerText: "C. FIR filters", isCorrect: true },
        { answerText: "D. Analog filters", isCorrect: false },
      ],
    },
    {
      questionText: "Find the inverse Laplace transform of",
      questionEquation: "X(s) = \\frac {s}{s^2a^2 + b^2}",
      answerOptions: [
        {
          answerText:
            "A.\\enspace \\frac{1}{a^2} cos \\Big(\\frac{a}{b}\\Big) t",
          isCorrect: false,
        },
        {
          answerText:
            "B.\\enspace \\frac{1}{a^2} cos \\Big(\\frac{b}{a}\\Big) t",
          isCorrect: true,
        },
        {
          answerText:
            "C.\\enspace \\frac{1}{a^2} sin \\Big(\\frac{b}{a}\\Big) t",
          isCorrect: false,
        },
        {
          answerText:
            "D.\\enspace \\frac{1}{a^2} sin \\Big(\\frac{a}{b}\\Big) t",
          isCorrect: true,
        },
      ],
      questionType: "equation",
    },
    {
      questionText:
        "If all the poles of H(z) are outside the unit circle, then the system is said to be ?",

      answerOptions: [
        { answerText: "A. Only causal", isCorrect: false },
        { answerText: "B. Only BIBO stable", isCorrect: false },
        { answerText: "C. BIBO stable and causal ", isCorrect: false },
        { answerText: "D. None of the above", isCorrect: true },
      ],
      questionType: "text",
    },
    {
      questionType: "text",
      questionText:
        "The_______of the two cutoff frequencies as found  is the final cutoff frequency of the low pass Butterworth filter will be",

      answerOptions: [
        { answerText: "A. Arithmetic mean", isCorrect: true },
        { answerText: "B. Geometric mean", isCorrect: false },
        { answerText: "C. Harmonic mean", isCorrect: false },
        { answerText: "D. None of the above", isCorrect: false },
      ],
    },

    {
      questionText: "Find the ROC of",
      questionEquation: "x(t) = e^{-2t}u(t) + e^{-3t}u(t)",
      answerOptions: [
        { answerText: "A.\\enspace \\sigma > 2", isCorrect: false },
        { answerText: "B.\\enspace \\sigma > 3", isCorrect: false },
        { answerText: "C.\\enspace \\sigma > -3", isCorrect: false },
        { answerText: "D.\\enspace \\sigma > -2", isCorrect: true },
      ],
      questionType: "equation",
    },
    {
      questionType: "text",
      questionText:
        "The transformation which maps the poles and zeros of H(s) directly into the poles and zeros of H(z)",
      answerOptions: [
        { answerText: "A. Bilinear transformation", isCorrect: false },
        { answerText: "B. Impulse invariant transformation", isCorrect: false },
        { answerText: "C. Matched Z-transform", isCorrect: true },
        { answerText: "D. Approximation of derivatives", isCorrect: false },
      ],
    },
    {
      questionType: "equation",
      questionText: "Solve the Integral",
      questionEquation: "\\int_0^\\infty \\frac{1}{1+e^x} dx ",
      answerOptions: [
        { answerText: "A.\\enspace \\log\\enspace 2", isCorrect: true },
        { answerText: "B.\\enspace-\\log \\enspace 2", isCorrect: false },
        { answerText: "C.\\enspace\\log \\enspace 2 -1", isCorrect: false },
        { answerText: "D.\\enspace-\\log \\enspace 4 -1", isCorrect: false },
      ],
    },
    {
      questionType: "text",
      questionText:
        "Y1 : It is not mandatory for every signal to be even or odd \nY2 : Any signal which is neither even nor odd can be expressed as the difference of even and odd signals",
      answerOptions: [
        { answerText: "A. Y1 only", isCorrect: true },
        { answerText: "B. Y2 only", isCorrect: false },
        {
          answerText:
            "C. Both Y1 & Y2 are correct but Y2 is not a reason for Y1",
          isCorrect: false,
        },
        {
          answerText:
            "D. Both Y1 & Y2 are correct but Y2 is definitely a reason of Y1",
          isCorrect: false,
        },
      ],
    },
    {
      questionType: "text",
      questionText:
        "Which of the following specifications correctly represents an odd signal?",
      answerOptions: [
        { answerText: "A. x(-t) = -x(t) and x[-n] = -x[n]", isCorrect: true },
        { answerText: "B. x(-t) =  x(t) and x[-n] =  x[n]", isCorrect: false },
        { answerText: "C. x(-t) = -x(t) and x[-n] = -x[n]", isCorrect: false },
        { answerText: "D. None of the above", isCorrect: false },
      ],
    },
    {
      questionType: "text",
      questionText: "Damped sinusoids are :",
      answerOptions: [
        { answerText: "A. Absolutely stable", isCorrect: true },
        { answerText: "B. Absolutely unstable", isCorrect: false },
        { answerText: "C. Marginally stable", isCorrect: false },
        { answerText: "D. Conclusion cannot be drawn", isCorrect: false },
      ],
    },
    {
      questionText: "Find the Integral of",
      questionEquation: "\\int \\frac{1}{\\sqrt{x} + x \\sqrt{x}} dx =",
      answerOptions: [
        {
          answerText: "A.\\enspace 2 \\log (\\sqrt{x} +1 ) + C ",
          isCorrect: false,
        },
        {
          answerText:
            "B.\\enspace \\Big(\\frac{1}{2}\\Big) \\tan^{-1} \\sqrt{x} +C",
          isCorrect: false,
        },
        {
          answerText: "C.\\enspace  \\tan^{-1} \\sqrt{x} + C",
          isCorrect: false,
        },
        {
          answerText: "D.\\enspace 2 \\tan^{-1} \\sqrt{x} + C",
          isCorrect: true,
        },
      ],
      questionType: "equation",
    },
    {
      questionText:
        "Which of the following are correct regarding chebyshev  filters",

      answerOptions: [
        {
          answerText: "A. Their order is more  than butterworth filters.",
          isCorrect: false,
        },
        {
          answerText:
            "B. In low pass chebyshev type -I filter the sum of no. of maxima and minima in passband equals the order of the filter",
          isCorrect: true,
        },
        {
          answerText:
            "C. In low pass chebyshev type -I filter, filter is monotonic in the passband",
          isCorrect: false,
        },
        { answerText: "D. All of the above", isCorrect: false },
      ],
      questionType: "text",
    },

    // {
    //   questionText: "What is the capital of France?",

    //   answerOptions: [
    //     { answerText: "London", isCorrect: false },
    //     { answerText: "Dublin", isCorrect: false },
    //     { answerText: "Paris", isCorrect: true },
    //     { answerText: "Jamaica", isCorrect: false },
    //   ],
    //   displayImage: true,
    // },
    // {
    //   questionText: "What is the capital of France?",

    //   answerOptions: [
    //     { answerText: "London", isCorrect: false },
    //     { answerText: "Dublin", isCorrect: false },
    //     { answerText: "Paris", isCorrect: true },
    //     { answerText: "Jamaica", isCorrect: false },
    //   ],
    //   displayImage: true,
    // },
    // {
    //   questionText: "Who is CEO of Tesla?",
    //   answerOptions: [
    //     { answerText: "Jeff Bezos", isCorrect: false },
    //     { answerText: "Elon Musk", isCorrect: true },
    //     { answerText: "Bill Gates", isCorrect: false },
    //     { answerText: "Tony Stark", isCorrect: false },
    //   ],
    //   displayImage: false,
    // },
    // {
    //   questionText: "The iPhone was created by which company?",
    //   answerOptions: [
    //     { answerText: "Apple", isCorrect: true },
    //     { answerText: "Intel", isCorrect: false },
    //     { answerText: "Amazon", isCorrect: false },
    //     { answerText: "Microsoft", isCorrect: false },
    //   ],
    //   displayImage: false,
    // },
    // {
    //   questionText: "How many Harry Potter books are there?",
    //   answerOptions: [
    //     { answerText: "1", isCorrect: false },
    //     { answerText: "4", isCorrect: false },
    //     { answerText: "6", isCorrect: false },
    //     { answerText: "7", isCorrect: true },
    //   ],
    //   displayImage: false,
    // },
  ];
  const [usn, setusn] = useState(localStorage.getItem("usn"));
  const [page, setPage] = useState("quiz");
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const initialCounter = () =>
  //   Number(window.localStorage.getItem("counter")) || 60;
  const [countDownTime, setCountDownTime] = useState(0);
  const [counter, setCounter] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [day, setDay] = useState();

  const timeBetweenDates = (toDate) => {
    var dateEntered = toDate;
    var now = new Date();
    var difference = dateEntered.getTime() - now.getTime();
    if (difference <= 0) {
    } else {
      var seconds = Math.floor(difference / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);
      var days = Math.floor(hours / 24) - 30;

      hours %= 24;
      minutes %= 60;
      seconds %= 60;
      setDay(days);
    }
  };
  const getDifference = (toDate) => {
    var dateEntered = toDate;
    var now = new Date();
    var difference = dateEntered.getTime() - now.getTime();
    if (difference <= 0) {
    } else {
      var seconds = Math.floor(difference / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);
      var days = Math.floor(hours / 24) - 30;

      hours %= 24;
      minutes %= 60;
      seconds %= 60;
      return days;
    }
  };
  useEffect(() => {
    const countDown = setInterval(function () {
      var now =  new Date()
      var difference = now.getTime() - countDownTime;
      
      if(countDownTime <=0 ){
      }else{
        var seconds = Math.floor(difference/1000);
        seconds %= 60;
        setCounter(60 - seconds);
      }
    },1000);
    return () => clearInterval(countDown);
  })

  useEffect(() => {
    const timer = setInterval(function () {
      timeBetweenDates(props.eventEndDate);
    }, 1000);
    return () => clearInterval(timer);
  });
  useEffect(() => {
    if (getDifference(props.eventStartDate) >= 0) {
      setIsLoading(false);
      if (getDifference(props.eventEndDate) < 0) {
        setPage("final");
      } else {
        setPage("wait");
      }

    } else {
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
            console.log(participant.crossworddone);
            if (participant.crossworddone === true) {
              console.log("final");
              setPage("final");
            } else if (participant.quizdone === true) {
              console.log("cw");
              setPage("crossword");
            } else if (participant.entrydone === true) {
              console.log("quiz");
              console.log(isLoading);
              setCurrentQuestion(participant.quizQuestionIndex);
              setScore(participant.quizpoints);
              setCountDownTime(participant.quizCountDownTime);
              setPage("quiz");
            } else {
              console.log("login");
              setPage("login");
            }
            setIsLoading(false);
          }
        });
    }
  }, []);

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, this.window.location.href);
    });
  });

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
    // setCounter(60);
    const now =  new Date();
    const quizpoints = score + 1;
    const quizCountDownTime = now.getTime();
    console.log(quizCountDownTime);
    const data = { quizpoints, nextQuestion, usn,quizCountDownTime };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    setIsLoading(true);
    fetch("/api/8", options).then((res) => {
      setIsLoading(false);
      setCountDownTime(quizCountDownTime);

    });
  };
  // useEffect(() => {
  //   localStorage.setItem("counter", counter);
  // }, [counter]);

  useEffect(() => {
    if (counter === 0){
      console.log(counter);
    }
    else if (counter > 1) {
      // const timer = setTimeout(() => setCounter(counter - 1), 1000);
      // return () => clearTimeout(timer);
      console.log(counter);
    } else {
      console.log("next");
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
      const now =  new Date();
      const quizpoints = score;
      const quizCountDownTime = now.getTime();
      const data = { quizpoints, nextQuestion, usn ,quizCountDownTime};
      
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      setIsLoading(true);
      fetch("/api/8", options).then((res) => {
        setIsLoading(false);
        setCountDownTime(quizCountDownTime);
      });
      
      
    }
  }, [counter]);
  useEffect(() => {
    if (day < 0) {
      const currentdate = new Date();
      var date = [
        currentdate.getHours(),
        currentdate.getMinutes(),
        currentdate.getSeconds(),
      ];
      const usn = localStorage.getItem("usn");
      const data = { date,usn};
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      setIsLoading(true);
      fetch("/api/9", options).then((res) => {
        setIsLoading(false);
        setPage("final");
      });
 
 
    }
  }, [day]);

  const handler = () => {
    const currentdate = new Date();
    var date = [
      currentdate.getHours(),
      currentdate.getMinutes(),
      currentdate.getSeconds(),
    ];
    const data = { date, usn };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    setIsLoading(true);
    fetch("/api/2", options).then((res) => {
      window.localStorage.removeItem("counter");
      setIsLoading(false);
      setPage("crossword");
    });
  };
  if (isLoading) {
    return <Container></Container>;
  } else {
    if (page === "quiz") {
      return (
        <>
        <Navbar style={{ backgroundColor: "#7798ab", color: "black" }}>
        <Container>
          <Navbar.Brand href="#home">IEEE logo  </Navbar.Brand>
          <Nav className="me-auto" style={{ color: "black" }}>
          <Navbar.Text>
            Signed in as: {localStorage.getItem('name')} 
          </Navbar.Text>
            {/* <Nav.Link href="/Final">Leaderboard</Nav.Link>
            <Nav.Link href="/">Login</Nav.Link>
            <Nav.Link href="/Quiz">Quiz</Nav.Link>
            <Nav.Link href="/Wait">Wait</Nav.Link>
            <Nav.Link href="/Dashboard">Crossword</Nav.Link> */}
            {/* <Nav.Link href="/Example">Example</Nav.Link>
            <Nav.Link href="/Test">Test</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
          {showScore ? (
            <div className="quiz" style={{ marginTop: "140px" }}>
              <div className="score-section">
                <p>
                  You scored {score * 10} out of {questions.length * 10}
                  <br />
                  <Button
                    onClick={handler}
                    className="login-btn"
                    style={{ backgroundColor: "#041E42" }}
                  >
                    Go to next round
                  </Button>
                </p>
              </div>
            </div>
          ) : (
            <>
              <h1 className="header">Quiz</h1>
              <ProgressBar
                progress={counter}
                size={80}
                strokeWidth={3}
                circleOneStroke="#000000"
                circleTwoStroke="#7ea9e1"
              />
              <div className="quiz">
                <div className="question-section">
                  <div className="question-count">
                    <span>Question {currentQuestion + 1}</span>/
                    {questions.length}
                  </div>
                  {questions[currentQuestion].questionType === "text" ? (
                    <div className="question-text">
                      {questions[currentQuestion].questionText}
                    </div>
                  ) : (
                    <div className="question-text">
                      {questions[currentQuestion].questionText}
                      <br />
                      <div>
                        <BlockMath
                          math={questions[currentQuestion].questionEquation}
                        />
                      </div>
                    </div>
                  )}

                  <div className="answer-section">
                    {questions[currentQuestion].questionType === "text"
                      ? questions[currentQuestion].answerOptions.map(
                          (answerOption) => (
                            <button
                              className="quiz-btn"
                              onClick={() =>
                                handleAnswerOptionClick(answerOption.isCorrect)
                              }
                            >
                              {answerOption.answerText}
                            </button>
                          )
                        )
                      : questions[currentQuestion].answerOptions.map(
                          (answerOption) => (
                            <button
                              className="quiz-btn"
                              onClick={() =>
                                handleAnswerOptionClick(answerOption.isCorrect)
                              }
                            >
                              <BlockMath math={answerOption.answerText} />
                            </button>
                          )
                        )}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      );
    } else {
      if (page == "crossword") {
        // window.localStorage.removeItem("counter");
        // // window.localStorage.removeItem("currentQuestionPointer");
        // // window.localStorage.removeItem("quizPoints");
        // const currentdate = new Date();
        // var date = [
        //   currentdate.getHours(),
        //   currentdate.getMinutes(),
        //   currentdate.getSeconds(),
        // ];
        // const data = { date, usn};

        // const options = {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(data),
        // };

        // const endvalue =
        //   currentdate.getHours() * 3600 +
        //   currentdate.getMinutes() * 60 +
        //   currentdate.getSeconds();
        // setIsLoading(true);
        // fetch("/api/2", options).then((res)=>{
        //   setIsLoading(false);
        //   console.log(res.json());
        //   console.log("done");
        //   return <Redirect to="/Dashboard" />;
        // });

        return <Redirect to="/Dashboard" />;
      } else if (page === "final") {
        return <Redirect to="/Final" />;
      } else if (page === "login") {
        return <Redirect to="/" />;
      }else if(page === "wait"){
        return <Redirect to="/Wait"/>;
      }
    }
  }
}
