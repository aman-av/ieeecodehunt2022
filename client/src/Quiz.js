import React, { useCallback, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";

function Quiz() {
  useEffect(() => {
    
    
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event){
      
        window.history.pushState(null, document.title,  this.window.location.href);
       
    });

  });
  
  const questions = [
    {
      questionText: "Who is Prime Minister of India?",
      answerOptions: [
        { answerText: "Vijay Rupani", isCorrect: false },
        { answerText: "Manmohan singh", isCorrect: false },
        { answerText: "Narendra Modi", isCorrect: true },
        { answerText: "Deep Patel", isCorrect: false },
      ],
    },
    {
      questionText: "Who is CEO of Tata?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Ratan Tata", isCorrect: true },
        { answerText: "Mukesh Ambani", isCorrect: false },
        { answerText: "Gautam Adani", isCorrect: false },
      ],
    },
    {
      questionText: "who is richest person in the world?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Mukesh Ambani", isCorrect: false },
        { answerText: "Warren Buffett", isCorrect: false },
      ],
    },
    {
      questionText: "how many countries in the world?",
      answerOptions: [
        { answerText: "120", isCorrect: false },
        { answerText: "183", isCorrect: false },
        { answerText: "170", isCorrect: false },
        { answerText: "195", isCorrect: true },
      ],
    },
  ];

  const initialCounter = () =>
    Number(window.localStorage.getItem("counter")) || 20;
  const [istrue, setistrue] = useState("false");
  const [counter, setCounter] = useState(initialCounter);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect === true) {
      setScore(score + 1);
    }

    const nextQuetions = currentQuestion + 1;
    if (nextQuetions < questions.length) {
      setCurrentQuestion(nextQuetions);
      
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
        <h1 className="header">Quiz</h1>
        <div>
         
          <div>{counter}</div>
        </div>
        <div className="app">
          {showScore ? (
            <div className="score-section">
              <p>You scored {score} out of {questions.length}<br/>
               <Button onClick={handler}>Go to next round</Button></p>
             
            </div>
          ) : (
            <>
              <div className="question-section">
                <div className="question-count">
                  <span>Question {currentQuestion + 1}</span>
                  {questions.length}
                </div>
                <div className="question-text">
                  {questions[currentQuestion].questionText}
                </div>
              </div>

              <div className="answer-section">
                {questions[currentQuestion].answerOptions.map(
                  (answerOptions) => (
                    <button
                      onClick={() =>{
                        handleAnswerButtonClick(answerOptions.isCorrect)
                      }}
                    >
                      {answerOptions.answerText}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </div>
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
    const usn=localStorage.getItem("usn");
    const data = { date, usn };
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    
      const endvalue=currentdate.getHours()*3600+currentdate.getMinutes()*60+currentdate.getSeconds();
      
    
    fetch("/api/2", options);

    localStorage.setItem('Quiztimeout',endvalue);

    return <Redirect to="/Dashboard" />;
  }
}

export default Quiz;
