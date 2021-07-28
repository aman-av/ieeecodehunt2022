//original code is below commented out
// current uses asynchronous programming while fetching data to show loading
// working imperfectly

import React, { useCallback, useRef, useState, useEffect } from "react";
import Crossword from "@jaredreisinger/react-crossword";
import styled from "styled-components";
import { Button, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";




const data = {
  
across: {

  1: { clue: "CLUE ACROSS 1", answer: "XXXXXXXXXX", row: 10, col: 1 },
  2: { clue: "CLUE ACROSS 2", answer: "XXXXXXXXXX", row: 9, col: 1 },
  3: { clue: "CLUE ACROSS 3", answer: "XXXXXXX", row:12, col: 1 },
  4: { clue: "CLUE ACROSS 4", answer: "XXXXXXXXX", row: 13, col: 7 },
  5: { clue: "CLUE ACROSS 5", answer: "XXXXXX", row: 14, col:4},
  6: { clue: "CLUE ACROSS 6", answer: "XXXXXXXXX", row: 6, col: 1},
  7: { clue: "CLUE ACROSS 7", answer: "XXXXXXXX", row: 3, col: 0},
  8: { clue: "CLUE ACROSS 8", answer: "XXXXXXX", row: 5, col: 3},
  9: { clue: "CLUE ACROSS 9", answer: "XXXXXXXXXXX", row: 2, col: 1},
  10: { clue: "CLUE ACROSS 10", answer: "XXXXXXXXXXXX", row:4 , col: 1},

},
down: {
  1: { clue: "CLUE DOWN 1", answer: "XXXXXXXX", row: 0, col: 10 },
  2: { clue: "CLUE DOWN 2", answer: "XXXXXXXX", row: 1, col: 4 },
  3: { clue: "CLUE DOWN 3", answer: "XXXXXXXX", row: 6, col: 0 },
  4: { clue: "CLUE DOWN 4", answer: "XXXXXXXXXXX", row: 6, col: 1 },
  5: { clue: "CLUE DOWN 5", answer: "XXXXXXXXX", row: 6, col:12 },
  6: { clue: "CLUE DOWN 6", answer: "XXXXXXXXXXXXX", row: 3, col: 14},
  7: { clue: "CLUE DOWN 7", answer: "XXXXXXXX", row: 6, col: 13},
  8: { clue: "CLUE DOWN 8", answer: "XXXXXXXXXX", row: 5, col: 15},
  9: { clue: "CLUE DOWN 9", answer: "XXX", row: 13, col: 9},
  10:{ clue: "CLUE DOWN 10", answer: "XXXX", row: 5, col: 9 }
},
  



};
const CrosswordWrapper = styled.div`
  margin-top: 2em;
  /* and some fun making use of the defined class names */
  .crossword.correct {
    rect {
      stroke: rgb(100, 200, 100) !important;
    }
    svg > rect {
      fill: rgb(100, 200, 100) !important;
    }
    text {
      fill: rgb(100, 200, 100) !important;
    }
  }
  .clue.correct {
    ::before {
      content: "\u2713"; /* a.k.a. checkmark: ✓ */
      display: inline-block;
      text-decoration: none;
      color: rgb(100, 200, 100);
      // margin-right: 0.25em;
    }
    text-decoration: line-through;
    color: rgb(130, 130, 130);
  }
`;

// in order to make this a more-comprehensive example, and to vet Crossword's
// features, we actually implement a fair amount...

function Dashboard() {

  useEffect(() => {
    
   
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event){
        window.history.pushState(null, document.title,  window.location.href);
        //window.location.reload(false);
       
    });
  });

  const currentdate = new Date();
  var date = [
    currentdate.getHours(),
    currentdate.getMinutes(),
    currentdate.getSeconds(),
  ];
  const intiCrosswordCounter = () => Number(window.localStorage.getItem("crosswordCounter")) ||  0;
  const [crosswordCounter,setCrosswordCounter] = useState(intiCrosswordCounter);
  const endvalue=currentdate.getHours()*3600+currentdate.getMinutes()*60+currentdate.getSeconds();
  useEffect(() => {
    // diff=localStorage.getItem('Quiztimeout');
  
    // diff=endvalue-diff;

    localStorage.setItem("crosswordCounter", crosswordCounter);


  }, [crosswordCounter]);


  
  // const [intime, setintime] = useState([0, 0, 0]);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     await fetch("/api/4")
  //       .then((result) => result.json())
  //       .then((rr) => {
  //         setintime(rr);
  //       });
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // },intime);

  // const [seconds, setSeconds] = useState(diff);
  // useEffect(() => {
  //   console.log("once");
  //   setSeconds(
  //     1 +
  //       Math.abs(date[0] - intime[0]) * 3600 +
  //       Math.abs(date[1] - intime[1]) * 60 +
  //       Math.abs(date[2] - intime[2])
  //   );
  // }, intime);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCrosswordCounter(crosswordCounter + 1);
    }, 1000);
    // clearing interval
    return () => clearTimeout(timer);
  });

  const crossword = useRef();

  const reset = useCallback((event) => {
    crossword.current.reset();
  }, []);

  // We don't really *do* anything with callbacks from the Crossword component,
  // but we can at least show that they are happening.  You would want to do
  // something more interesting than simply collecting them as messages.
  const [messages, setMessages] = useState([]);

  const addMessage = useCallback((message) => {
    setMessages(message);
  }, []);

  const mystyle = {
    height: "",
    width: "85vw",
  };

  // onCrosswordCorrect is called with a truthy/falsy value.
  const onCrosswordCorrect = useCallback(
    (isCorrect) => {
      if (isCorrect == true) {
        addMessage(`${JSON.stringify(isCorrect)}`);
      }
    },
    [addMessage]
  );
  if (messages == false) {
    return (
      <div style={mystyle}>
        <Container>
          {/* {isLoading ? (
            <p>Loading</p>
          ) : ( */}
            <p>
              {Math.floor(crosswordCounter / 3600) % 24}:{Math.floor(crosswordCounter / 60) % 60}:
              {crosswordCounter % 60}
            </p>
          {/* )
          }  */}

          <Button variant="secondary" onClick={reset}>
            Reset
          </Button>
          <CrosswordWrapper>
            <Crossword
              data={data}
              ref={crossword}
              theme={{
                gridBackground: "#0d63a5",
                cellBackground: "#ffffff",
                numberColor: "rgba(0,0,0,0.75)",
                focusBackground: "#ffd717",
                // highlightBackground : '#rgba(0,40,232,0.25)'
              }}
              // onLoadedCorrect={onLoadedCorrect}
              onCrosswordCorrect={onCrosswordCorrect}
              // onCellChange={onCellChange}
            />
          </CrosswordWrapper>
          <h4>{messages}</h4>
        </Container>
      </div>
    );
  } else {
    window.localStorage.removeItem("crosswordCounter");
    const currentdate = new Date();
    var date = [
      currentdate.getHours(),
      currentdate.getMinutes(),
      currentdate.getSeconds(),
    ];
    const points = 100;
    const usn=localStorage.getItem("usn");
    const data = { points, date,usn };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("/api/3", options);

    crossword.current.reset();
    return <Redirect to="/Final" />;
  }
}

export default Dashboard;


