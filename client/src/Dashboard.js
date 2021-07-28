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
    1: {
      clue: 'one plus one',
      answer: 'TWO',
      row: 0,
      col: 0,
    },
  },
  down: {
    2: {
      clue: 'three minus two',
      answer: 'ONE',
      row: 0,
      col: 2,
    },
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
       
    });
  });

  const currentdate = new Date();
  var date = [
    currentdate.getHours(),
    currentdate.getMinutes(),
    currentdate.getSeconds(),
  ];
  var diff=0;
  const endvalue=currentdate.getHours()*3600+currentdate.getMinutes()*60+currentdate.getSeconds();
  useEffect(() => {
    diff=localStorage.getItem('Quiztimeout');
   // console.log()
  //  console.log(data);
    diff=endvalue-diff;
   // console.log(ggg);

  }, [])
  
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

  const [seconds, setSeconds] = useState(diff);
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
    const timer = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
    // clearing interval
    return () => clearInterval(timer);
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
              {Math.floor(seconds / 3600) % 24}:{Math.floor(seconds / 60) % 60}:
              {seconds % 60}
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
    const currentdate = new Date();
    var date = [
      currentdate.getHours(),
      currentdate.getMinutes(),
      currentdate.getSeconds(),
    ];
    const points = 100;
    const data = { points, date };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("/api/2", options);

    crossword.current.reset();
    return <Redirect to="/Final" />;
  }
}

export default Dashboard;



// import React, { useCallback, useRef, useState,useEffect } from 'react';
// import Crossword from '@jaredreisinger/react-crossword';
// import styled from 'styled-components';
// import { Button,Container,Row } from 'react-bootstrap';
// import { Redirect } from 'react-router-dom';
// import axios from 'axios';

// const data = {across: {

//   1: { clue: "The method used to convert digital frequencies to analog frequencies", answer: "PREWARPING", row: 10, col: 1 },
//   2: { clue: "The class of signals used to perform time domain analysis", answer: "ELEMENTARY", row: 9, col: 1 },
//   3: { clue: "These plots are used to study the stability of the system", answer: "NYQUIST", row:12, col: 1 },
//   4: { clue: "The power series expansion of a function about 0", answer: "MACLAURIN", row: 13, col: 7 },
//   5: { clue: "The window function which uses the zeroth Bessel function of first type", answer: "KAISER", row: 14, col:4},
//   6: { clue: "___________ matching method greatly reduces the reflection coefficient of a transmission line", answer: "IMPEDANCE", row: 6, col: 1},
//   7: { clue: "This technique is used to obtain the DFT of a signal from its DTFT", answer: "SAMPLING", row: 3, col: 0},
//   8: { clue: "The class of signals highly sensitive to noise", answer: "ANALOG", row: 5, col: 3},
//   9: { clue: "Most of the second order systems fall under this class of systems", answer: "OSCILLATORY", row: 2, col: 1},
//   10: { clue: "Anticausal systems are also known by this name", answer: "ANTICIPATORY", row:4 , col: 1},

// },
// down: {
//   1: { clue: "A distortion of this type is caused due to multiple frequencies", answer: "HARMONIC", row: 0, col: 10 },
//   2: { clue: "The transformation which is linear in two variables", answer: "BILINEAR", row: 1, col: 4 },
//   3: { clue: "Consequence of choosing the sampling frequency lower than that predicted by Nyquist theorem.", answer: "ALIASING", row: 6, col: 0 },
//   4: { clue: "The type of variables on which time scaling operation can be performed", answer: "INDEPENDENT", row: 6, col: 1 },
//   5: { clue: "The diagrammatic method of finding the variable frequency wrt the fixed frequency", answer: "LISSAJOUS", row: 6, col:12 },
//   6: { clue: "A system can be classified as linear depending on the whether or not it satisfies this theorem", answer: "SUPERPOSITION", row: 3, col: 14},
//   7: { clue: "The ratio of output to the input of a system measured in the same domain , with all initial conditions considered as 0 is ________ function", answer: "TRANSFER", row: 6, col: 13},
//   8: { clue: "The process of increasing the number of samples of a signal , by inserting zeros  in between the existing samples", answer: "UPSAMPLING", row: 5, col: 15},
//   9: { clue: "This component is also known as the heart of the CRO", answer: "CRT", row: 13, col: 9},
//   10: { clue: "FIR filter can be classified as all --------- systems", answer: "ZERO", row: 5, col: 9 }
// },

// };
// const CrosswordWrapper = styled.div`
//   margin-top: 2em;
//   /* and some fun making use of the defined class names */
//   .crossword.correct {
//     rect {
//       stroke: rgb(100, 200, 100) !important;
//     }
//     svg > rect {
//       fill: rgb(100, 200, 100) !important;
//     }
//     text {
//       fill: rgb(100, 200, 100) !important;
//     }
//   }
//   .clue.correct {
//     ::before {
//       content: "\u2713"; /* a.k.a. checkmark: ✓ */
//       display: inline-block;
//       text-decoration: none;
//       color: rgb(100, 200, 100);
//       // margin-right: 0.25em;
//     }
//     text-decoration: line-through;
//     color: rgb(130, 130, 130);
//   }
// `;

// // in order to make this a more-comprehensive example, and to vet Crossword's
// // features, we actually implement a fair amount...

// function Dashboard() {
//   const currentdate = new Date();
//   var date =
//   [currentdate.getHours()
//  , currentdate.getMinutes()
//  , currentdate.getSeconds()]

//   const [intime,setintime]=useState([0,0,0]);
//    useEffect(() => {
//     fetch('/api/4')
//     .then(result => (result).json()).
//     then(rr=>{console.log(rr);
//     setintime(rr)});
//    }, [])

//    const [seconds, setSeconds] = useState(1);
//     useEffect(()=>{
//     console.log("once")
//     setSeconds(1+Math.abs(date[0]-intime[0])*3600+Math.abs(date[1]-intime[1])*60+Math.abs(date[2]-intime[2]))}
//     ,intime);

//    useEffect(() => {
//      const timer = setInterval(() => {
//        setSeconds(seconds + 1);
//      }, 1000);
//                 // clearing interval
//      return () => clearInterval(timer);
//    });

//   const crossword = useRef();

//   const reset = useCallback((event) => {
//     crossword.current.reset();
//   }, []);

//   // We don't really *do* anything with callbacks from the Crossword component,
//   // but we can at least show that they are happening.  You would want to do
//   // something more interesting than simply collecting them as messages.
//   const [messages, setMessages] = useState([]);

//   const addMessage = useCallback((message) => {
//     setMessages(message);
//   }, []);

//   const mystyle={
//     height:"",
//     width:"85vw"
//   };

//   // onCrosswordCorrect is called with a truthy/falsy value.
//   const onCrosswordCorrect = useCallback(
//     (isCorrect) => {if(isCorrect==true)
//      { addMessage(`${JSON.stringify(isCorrect)}`);
//       }
//     },
//     [addMessage]
//   );
//   if(messages==false)
//   {
//   return (
//     <div style={mystyle}>
//      <Container>

//      {(Math.floor(seconds/3600))%24}:{(Math.floor(seconds/60))%60}:{seconds%60}

//      <Button variant="secondary" onClick={reset}>Reset</Button>
//       <CrosswordWrapper>
//       <Crossword
//           data={data}
//           ref={crossword}
//           theme={{
//             gridBackground: "#0d63a5",
//             cellBackground: "#ffffff",
//             numberColor: "rgba(0,0,0,0.75)",
//             focusBackground: "#ffd717",
//             // highlightBackground : '#rgba(0,40,232,0.25)'

//           }}

//           // onLoadedCorrect={onLoadedCorrect}
//           onCrosswordCorrect={onCrosswordCorrect}
//           // onCellChange={onCellChange}
//         />
//       </CrosswordWrapper>

//      <h4>{messages}</h4>

//      </Container>

//     </div>
//   );}
//   else
//     {
//       const currentdate = new Date();
//       var date = [currentdate.getHours(),
//        currentdate.getMinutes(),
//        currentdate.getSeconds()]
//       const points=100;
//     const data={points , date};
//     const options={
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(data)
//         };

//          fetch('/api/2',options)

//         crossword.current.reset();
//         return <Redirect to="/Final"/>;
//     }
// }

// export default Dashboard;
