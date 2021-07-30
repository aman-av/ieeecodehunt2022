import React, { useCallback, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button, Container, Row ,Table} from "react-bootstrap";
import "./css/quiz.css";

export default function Quiz() {
  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, this.window.location.href);
    });
  });

  const questions = [
    {
      questionText: "What is the capital of France?",

      answerOptions: [
        { answerText: "London", isCorrect: false },
        { answerText: "Dublin", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Jamaica", isCorrect: false },
      ],
      displayImage: true,
    },
    {
      questionText: "Who is CEO of Tesla?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
      displayImage: false,
    },
    {
      questionText: "The iPhone was created by which company?",
      answerOptions: [
        { answerText: "Apple", isCorrect: true },
        { answerText: "Intel", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
        { answerText: "Microsoft", isCorrect: false },
      ],
      displayImage: false,
    },
    {
      questionText: "How many Harry Potter books are there?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
      displayImage: false,
    },
  ];

  const initialCounter = () =>
    Number(window.localStorage.getItem("counter")) || 20;
  const [istrue, setistrue] = useState("false");
  const [counter, setCounter] = useState(initialCounter);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

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
    setCounter(20);
  };
  useEffect(() => {
    localStorage.setItem("counter", counter);
  }, [counter]);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const nextQuetions = currentQuestion + 1;
      if (nextQuetions < questions.length) {
        setCurrentQuestion(nextQuetions);
      } else {
        setShowScore(true);
      }
      setCounter(20);
    }
  }, [counter]);

  const handler = () => {
    setistrue("true");
  };

  if (istrue === "false") {
    return (
      <>
        {/*<h1 className="header">Quiz</h1>
        <div className="counter">
          <div>{counter}</div>
    </div>*/}

        {showScore ? (
          <div className="quiz" style={{marginTop: "140px"}}>
            <div className="score-section">
              <p>
                You scored {score} out of {questions.length}
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
            <div className="counter">
              <div className="count">{counter}</div>
            </div>
            <div className="quiz">
              <div className="question-section">
                <div className="question-count">
                  <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className="question-text">
                  {questions[currentQuestion].questionText}
                </div>

                
                  <div className="answer-section">
                    {questions[currentQuestion].answerOptions.map(
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
                    )}
                  </div>
                
              </div>
            </div>
          </>
        )}
      </>
    );
  } else {
    window.localStorage.removeItem("counter");
    const currentdate = new Date();
    var date = [
      currentdate.getHours(),
      currentdate.getMinutes(),
      currentdate.getSeconds(),
    ];
    const usn = localStorage.getItem("usn");
    const data = { date, usn };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const endvalue =
      currentdate.getHours() * 3600 +
      currentdate.getMinutes() * 60 +
      currentdate.getSeconds();

    fetch("/api/2", options);

    localStorage.setItem("Quiztimeout", endvalue);

    return <Redirect to="/Dashboard" />;
  }
}
