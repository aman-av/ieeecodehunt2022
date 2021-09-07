import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";
import Crossword from "@jaredreisinger/react-crossword";
import styled from "styled-components";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { set } from "mongoose";
const answerKey = {"0_10":["H",["D1"]],
"1_4":["B",["D2"]],
"1_10":["A",["D1"]],
"2_1":["O",["A9"]],
"2_2":["S",["A9"]],
"2_3":["C",["A9"]],
"2_4":["I",["A9","D2"]],
"2_5":["L",["A9"]],
"2_6":["L",["A9"]],
"2_7":["A",["A9"]],
"2_8":["T",["A9"]],
"2_9":["O",["A9"]],
"2_10":["R",["A9","D1"]],
"2_11":["Y",["A9"]],
"3_0":["S",["A7"]],
"3_1":["A",["A7"]],
"3_2":["M",["A7"]],
"3_3":["P",["A7"]],
"3_4":["L",["A7","D2"]],
"3_5":["I",["A7"]],
"3_6":["N",["A7"]],
"3_7":["G",["A7"]],
"3_10":["M",["D1"]],
"3_14":["S",["D6"]],
"4_1":["A",["A10"]],
"4_2":["N",["A10"]],
"4_3":["T",["A10"]],
"4_4":["I",["A10","D2"]],
"4_5":["C",["A10"]],
"4_6":["I",["A10"]],
"4_7":["P",["A10"]],
"4_8":["A",["A10"]],
"4_9":["T",["A10"]],
"4_10":["O",["A10","D1"]],
"4_11":["R",["A10"]],
"4_12":["Y",["A10"]],
"4_14":["U",["D6"]],
"5_3":["A",["A8"]],
"5_4":["N",["A8","D2"]],
"5_5":["A",["A8"]],
"5_6":["L",["A8"]],
"5_7":["O",["A8"]],
"5_8":["G",["A8"]],
"5_9":["Z",["D10"]],
"5_10":["N",["D1"]],
"5_14":["P",["D6"]],
"5_15":["U",["D8"]],
"6_0":["A",["D3"]],
"6_1":["I",["A4","D4"]],
"6_2":["M",["A4"]],
"6_3":["P",["A4"]],
"6_4":["E",["A4","D2"]],
"6_5":["D",["A4"]],
"6_6":["A",["A4"]],
"6_7":["N",["A4"]],
"6_8":["C",["A4"]],
"6_9":["E",["A4","D10"]],
"6_10":["I",["D1"]],
"6_12":["L",["D5"]],
"6_13":["T",["D7"]],
"6_14":["E",["D6"]],
"6_15":["P",["D8"]],
"7_0":["L",["D3"]],
"7_1":["N",["D4"]],
"7_4":["A",["D2"]],
"7_9":["R",["D10"]],
"7_10":["C",["D1"]],
"7_12":["I",["D5"]],
"7_13":["R",["D7"]],
"7_14":["R",["D6"]],
"7_15":["S",["D8"]],
"8_0":["I",["D3"]],
"8_1":["D",["D4"]],
"8_4":["R",["D2"]],
"8_9":["O",["D10"]],
"8_12":["S",["D5"]],
"8_13":["A",["D7"]],
"8_14":["P",["D6"]],
"8_15":["A",["D8"]],
"9_0":["A",["D3"]],
"9_1":["E",["A2","D4"]],
"9_2":["L",["A2"]],
"9_3":["E",["A2"]],
"9_4":["M",["A2"]],
"9_5":["E",["A2"]],
"9_6":["N",["A2"]],
"9_7":["T",["A2"]],
"9_8":["A",["A2"]],
"9_9":["R",["A2"]],
"9_10":["Y",["A2"]],
"9_12":["S",["D5"]],
"9_13":["N",["D7"]],
"9_14":["O",["D6"]],
"9_15":["M",["D8"]],
"10_0":["S",["D3"]],
"10_1":["P",["A1","D4"]],
"10_2":["R",["A1"]],
"10_3":["E",["A1"]],
"10_4":["W",["A1"]],
"10_5":["A",["A1"]],
"10_6":["R",["A1"]],
"10_7":["P",["A1"]],
"10_8":["I",["A1"]],
"10_9":["N",["A1"]],
"10_10":["G",["A1"]],
"10_12":["A",["D5"]],
"10_13":["S",["D7"]],
"10_14":["S",["D6"]],
"10_15":["P",["D8"]],
"11_0":["I",["D3"]],
"11_1":["E",["D4"]],
"11_12":["J",["D5"]],
"11_13":["F",["D7"]],
"11_14":["I",["D6"]],
"11_15":["L",["D8"]],
"12_0":["N",["D3"]],
"12_1":["N",["A3","D4"]],
"12_2":["Y",["A3"]],
"12_3":["Q",["A3"]],
"12_4":["U",["A3"]],
"12_5":["I",["A3"]],
"12_6":["S",["A3"]],
"12_7":["T",["A3"]],
"12_12":["O",["D5"]],
"12_13":["E",["D7"]],
"12_14":["T",["D6"]],
"12_15":["I",["D8"]],
"13_0":["G",["D3"]],
"13_1":["D",["D4"]],
"13_7":["M",["A6"]],
"13_8":["A",["A6"]],
"13_9":["C",["A6","D9"]],
"13_10":["L",["A6"]],
"13_11":["A",["A6"]],
"13_12":["U",["A6","D5"]],
"13_13":["R",["A6","D7"]],
"13_14":["I",["A6","D6"]],
"13_15":["N",["A6","D8"]],
"14_1":["E",["D4"]],
"14_4":["K",["A5"]],
"14_5":["A",["A5"]],
"14_6":["I",["A5"]],
"14_7":["S",["A5"]],
"14_8":["E",["A5"]],
"14_9":["R",["A5","D9"]],
"14_12":["S",["D5"]],
"14_14":["O",["D6"]],
"14_15":["G",["D8"]],
"15_1":["N",["D4"]],
"15_9":["T",["D9"]],
"15_14":["N",["D6"]],
"16_1":["T",["D4"]]}

const data = {
  across: {
    1: {
      clue: "The method used to convert digital frequencies to analog frequencies",
      answer: "PREWARPING",
      row: 10,
      col: 1,
    },
    2: {
      clue: "The class of signals used to perform time domain analysis",
      answer: "ELEMENTARY",
      row: 9,
      col: 1,
    },
    3: {
      clue: "These plots are used to study the stability of the system",
      answer: "NYQUIST",
      row: 12,
      col: 1,
    },
    6: {
      clue: "The power series expansion of a function about 0",
      answer: "MACLAURIN",
      row: 13,
      col: 7,
    },
    5: {
      clue: "The window function which uses the zeroth Bessel function of first type",
      answer: "KAISER",
      row: 14,
      col: 4,
    },
    4: {
      clue: "___________ matching method greatly reduces the reflection coefficient of a transmission line",
      answer: "IMPEDANCE",
      row: 6,
      col: 1,
    },
    7: {
      clue: "This technique is used to obtain the DFT of a signal from its DTFT",
      answer: "SAMPLING",
      row: 3,
      col: 0,
    },
    8: {
      clue: "The class of signals highly sensitive to noise",
      answer: "ANALOG",
      row: 5,
      col: 3,
    },
    9: {
      clue: "Most of the second order systems fall under this class of systems",
      answer: "OSCILLATORY",
      row: 2,
      col: 1,
    },
    10: {
      clue: "Anticausal systems are also known by this name",
      answer: "ANTICIPATORY",
      row: 4,
      col: 1,
    },
  },
  down: {
    1: {
      clue: "A distortion of this type is caused due to multiple frequencies",
      answer: "HARMONIC",
      row: 0,
      col: 10,
    },
    2: {
      clue: "The transformation which is linear in two variables",
      answer: "BILINEAR",
      row: 1,
      col: 4,
    },
    3: {
      clue: "Consequence of choosing the sampling frequency lower than that predicted by Nyquist theorem.",
      answer: "ALIASING",
      row: 6,
      col: 0,
    },
    4: {
      clue: "The type of variables on which time scaling operation can be performed",
      answer: "INDEPENDENT",
      row: 6,
      col: 1,
    },
    5: {
      clue: "The diagrammatic method of finding the variable frequency wrt the fixed frequency",
      answer: "LISSAJOUS",
      row: 6,
      col: 12,
    },
    6: {
      clue: "A system can be classified as linear depending on the whether or not it satisfies this theorem",
      answer: "SUPERPOSITION",
      row: 3,
      col: 14,
    },
    7: {
      clue: "The ratio of output to the input of a system measured in the same domain , with all initial conditions considered as 0 is ________ function",
      answer: "TRANSFER",
      row: 6,
      col: 13,
    },
    8: {
      clue: "The process of increasing the number of samples of a signal , by inserting zeros  in between the existing samples",
      answer: "UPSAMPLING",
      row: 5,
      col: 15,
    },
    9: {
      clue: "This component is also known as the heart of the CRO",
      answer: "CRT",
      row: 13,
      col: 9,
    },
    10: {
      clue: "FIR filter can be classified as all --------- systems",
      answer: "ZERO",
      row: 5,
      col: 9,
    },
  },

  // across: {
  //   1: { clue: "CLUE ACROSS 1", answer: "XXXXXXXXXX", row: 10, col: 1 },
  //   2: { clue: "CLUE ACROSS 2", answer: "XXXXXXXXXX", row: 9, col: 1 },
  //   3: { clue: "CLUE ACROSS 3", answer: "XXXXXXX", row: 12, col: 1 },
  //   4: { clue: "CLUE ACROSS 4", answer: "XXXXXXXXX", row: 13, col: 7 },
  //   5: { clue: "CLUE ACROSS 5", answer: "XXXXXX", row: 14, col: 4 },
  //   6: { clue: "CLUE ACROSS 6", answer: "XXXXXXXXX", row: 6, col: 1 },
  //   7: { clue: "CLUE ACROSS 7", answer: "XXXXXXXX", row: 3, col: 0 },
  //   8: { clue: "CLUE ACROSS 8", answer: "XXXXXXX", row: 5, col: 3 },
  //   9: { clue: "CLUE ACROSS 9", answer: "XXXXXXXXXXX", row: 2, col: 1 },
  //   10: { clue: "CLUE ACROSS 10", answer: "XXXXXXXXXXXX", row: 4, col: 1 },
  // },
  // down: {
  //   1: { clue: "CLUE DOWN 1", answer: "XXXXXXXX", row: 0, col: 10 },
  //   2: { clue: "CLUE DOWN 2", answer: "XXXXXXXX", row: 1, col: 4 },
  //   3: { clue: "CLUE DOWN 3", answer: "XXXXXXXX", row: 6, col: 0 },
  //   4: { clue: "CLUE DOWN 4", answer: "XXXXXXXXXXX", row: 6, col: 1 },
  //   5: { clue: "CLUE DOWN 5", answer: "XXXXXXXXX", row: 6, col: 12 },
  //   6: { clue: "CLUE DOWN 6", answer: "XXXXXXXXXXXXX", row: 3, col: 14 },
  //   7: { clue: "CLUE DOWN 7", answer: "XXXXXXXX", row: 6, col: 13 },
  //   8: { clue: "CLUE DOWN 8", answer: "XXXXXXXXXX", row: 5, col: 15 },
  //   9: { clue: "CLUE DOWN 9", answer: "XXX", row: 13, col: 9 },
  //   10: { clue: "CLUE DOWN 10", answer: "XXXX", row: 5, col: 9 },
  // },
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

function Dashboard(props) {
  const intiCrosswordCounter = () =>
    Number(window.localStorage.getItem("crosswordCounter")) || 0;

  const currentdate = new Date();

  var date = [
    currentdate.getHours(),
    currentdate.getMinutes(),
    currentdate.getSeconds(),
  ];
  

  const [usn, setusn] = useState(localStorage.getItem("usn"));
  const [page, setPage] = useState("crossword");
  const [isLoading, setLoading] = useState(true);
  const [crosswordCounter, setCrosswordCounter] =
    useState(intiCrosswordCounter);

  const [messages, setMessages] = useState([]);
  const [score, setScore] = useState(0);

  const [day, setDay] = useState();
  useEffect(() => {
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
              setPage("crossword");
            } else if (participant.entrydone === true) {
              setPage("quiz");
            } else {
              setPage("login");
            }
            setLoading(false);
          }
        });
    
    // fetch(`api/4/${usn}`)
    //   .then((res) => res.json())
    //   .then((result) => {
    //     if (result.participant[0] === undefined) {
    //       window.alert("Only Registered Users can participate");
    //     } else {
    //       console.log(result);
    //       console.log(result.participant[0].intime);
    //       var participant = result.participant[0];
    //       if (participant.crossworddone === true) {
    //         setPage("final");
    //       } else if (participant.quizdone === true) {
    //         setPage("crossword");
    //       } else if (participant.entrydone === true) {
    //         setPage("quiz");
    //       } else {
    //         setPage("login");
    //       }
    //       setLoading(false);
    //     }
    //   });
  }, []);
  // var timer;
  // timer = setInterval(function () {
  //   timeBetweenDates(props.eventEndDate);
  //   return ()=>clearInterval(timer);
  // }, 1000);
  useEffect(()=>{
    const timer = setInterval(function () {
      timeBetweenDates(props.eventEndDate);
    }, 1000);
    return ()=> clearInterval(timer);

  })

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
      console.log(days);
      setDay(days);
    }
  };

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  });
  useEffect(() => {
    localStorage.setItem("crosswordCounter", crosswordCounter);
  }, [crosswordCounter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCrosswordCounter(crosswordCounter + 1);
    }, 1000);
    return () => clearTimeout(timer);
  });
  useEffect(() => {
    if (day < 0) {
      const points = getPoints();
      setScore(points);
      setPage("final");
    }
  }, [day]);

  const crossword = useRef();

  const reset = useCallback((event) => {
    crossword.current.reset();
  }, []);

  const addMessage = useCallback((message) => {
    setMessages(message);
  }, []);

  const mystyle = {
    height: "100vh",
    width: "100vw",
  };
  const onCrosswordCorrect = useCallback(
    (isCorrect) => {
      if (isCorrect == true) {
        addMessage(`${JSON.stringify(isCorrect)}`);
      }
    },
    [addMessage]
  );
  const handleDone = () => {
    const points = getPoints();
    setScore(points);
    setPage("final");
    // setMessages("true");
  };
  const getPoints = ()=>{
    var points =0;
    var actualAnswer = { 
      "A1":10,
      "A2":10,
      "A3":7,
      "A4":9,
      "A5":6,
      "A6":9,
      "A7":8,
      "A8":6,
      "A9":11,
      "A10":12,
      "D1":8,
      "D2":8,
      "D3":8,
      "D4":11,
      "D5":9,
      "D6":13,
      "D7":8,
      "D8":10,
      "D9":3,
      "D10":4,
  }
    const data = localStorage.getItem("guesses")
    console.log(data)
    const guesses = JSON.parse(data).guesses
    console.log(guesses)
    Object.keys(guesses).forEach(guess_key =>{
      console.log(guess_key)
        if(guesses[guess_key] == answerKey[guess_key][0]){
            answerKey[guess_key][1].forEach(ref =>{
              actualAnswer[ref] = actualAnswer[ref]-1
            })
        }
        
    })
    Object.values(actualAnswer).forEach(point =>{
      if(point==0){
          points=points+1
      }
    })
    console.log(points*10);
    return points*10;
  }


  if (isLoading) {
    return <Container></Container>;
  } else {
    if (page === "crossword") {
        return (
          <div style={mystyle}>
            <Container>
              <Row>
                <Col></Col>
                <Col></Col>
                <Col>
                  <p
                    style={{
                      position: "absolute",
                      alignContent: "center",
                      textAlign: "center",
                      alignItems: "center",
                      marginTop: "5px",
                      //  marginBottom:"10px",
                      //  marginLeft:"35%",
                      //  marginRight:"35%",
                      border: "3px solid #7798AB",
                      color: "#7798AB",
                      padding: "10px",
                      fontSize: "30px",
                    }}
                  >
                    {(Math.floor(crosswordCounter / 3600) % 24)}:
                    {Math.floor(crosswordCounter / 60) % 60}:
                    {crosswordCounter % 60}
                  </p>
                </Col>
                <Col></Col>
                <Col></Col>
              </Row>
              <Button
                onClick={reset}
                style={{
                  position: "absolute",
                  right: 8,
                  top: 10,
                  backgroundColor: "#011624",
                }}
              >
                Reset
              </Button>
              {/* <Button onClick={() => getPoints()}>GetScore</Button>
              <Button onClick={() => handleDone()}>Done</Button> */}

              <h4>{messages}</h4>

              <Row>
                <CrosswordWrapper
                  style={{ marginTop: "70px", color: "#7798AB" }}
                >
                  <Crossword
                    style={{ height: "250px" }}
                    data={data}
                    ref={crossword}
                    theme={{
                      gridBackground: "#7798AB",
                      cellBackground: "grey",
                      numberColor: "rgba(0,0,0,1)",
                      focusBackground: "#ffd717",
                    }}
                    onCrosswordCorrect={onCrosswordCorrect}
                  />
                </CrosswordWrapper>
              </Row>
            </Container>
          </div>
        );
                  
    } else if (page === "final") {
      window.localStorage.removeItem("crosswordCounter");
        const currentdate = new Date();
        var date = [
          currentdate.getHours(),
          currentdate.getMinutes(),
          currentdate.getSeconds(),
        ];
        console.log(getPoints);
        const crosswordpoints = score;
        console.log(score)
        console.log(`points ${crosswordpoints}`)
        const usn = localStorage.getItem("usn");
        const data = { crosswordpoints, date, usn };
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        fetch("/api/3", options);
      return <Redirect to="/Final" />;
    } else if (page === "quiz") {
      return <Redirect to="/Quiz" />;
    } else if (page === "login") {
      return <Redirect to="/Login" />;
    } else {
      return <Redirect to="/Test" />;
    }
  }
}

export default Dashboard;
