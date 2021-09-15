import React, { useCallback, useRef, useState } from 'react';
import Crossword from '@jaredreisinger/react-crossword';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Navbar, Nav } from "react-bootstrap";
import img from "./images/3.png";
import { Container } from "react-bootstrap";

const data = {
  across: {
    1: {
      clue: 'one plus one (3).',
      answer: 'TWO',
      row: 0,
      col: 0,
    },
  },
  down: {
    2: {
      clue: 'three minus two (3).',
      answer: 'ONE',
      row: 0,
      col: 2,
    },
  },
};


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
"3_2":["M",,["A7"]],
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
"5_9":["Z",[,"D10"]],
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
"8_13":["A"["D7"]],
"8_14":["P"["D6"]],
"8_15":["A"["D8"]],
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

const Page = styled.div`
  padding: 2em;
`;

const Header = styled.h1`
  margin-bottom: 1em;
`;

const Commands = styled.div``;

const Command = styled.button`
  margin-right: 1em;
`;

const CrosswordWrapper = styled.div`
  margin-top: 2em;
  max-width: 30em;
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
`;

const Messages = styled.pre`
  background-color: rgb(230, 230, 230);
  margin: 1em 0;
  padding: 1em;
`;

// in order to make this a more-comprehensive example, and to vet Crossword's
// features, we actually implement a fair amount...

function Example() {
  const crossword = useRef();
  const [score,setScore] = useState(0);

  const focus = useCallback((event) => {
    crossword.current.focus();
  }, []);

  const fillAllAnswers = useCallback((event) => {
    crossword.current.fillAllAnswers();
  }, []);

  const reset = useCallback((event) => {
    crossword.current.reset();
  }, []);

  // We don't really *do* anything with callbacks from the Crossword component,
  // but we can at least show that they are happening.  You would want to do
  // something more interesting than simply collecting them as messages.
  const [messages, setMessages] = useState([]);

  const addMessage = useCallback((message) => {
    setMessages((m) => m.concat(`${message}\n`));
  }, []);

  // onCorrect is called with the direction, number, and the correct answer.
  const onCorrect = useCallback(
    (direction, number, answer) => {
      addMessage(`onCorrect: "${direction}", "${number}", "${answer}"`);
    },
    [addMessage]
  );
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
      const guesses = JSON.parse(data).guesses
      Object.keys(guesses).forEach(guess_key =>{
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
    }

  // onLoadedCorrect is called with an array of the already-correct answers,
  // each element itself is an array with the same values as in onCorrect: the
  // direction, number, and the correct answer.
  const onLoadedCorrect = useCallback(
    (answers) => {
      addMessage(
        `onLoadedCorrect:\n${answers
          .map(
            ([direction, number, answer]) =>
              `    - "${direction}", "${number}", "${answer}"`
          )
          .join('\n')}`
      );
    },
    [addMessage]
  );

  // onCrosswordCorrect is called with a truthy/falsy value.
  const onCrosswordCorrect = useCallback(
    (isCorrect) => {
      addMessage(`onCrosswordCorrect: ${JSON.stringify(isCorrect)}`);
    },
    [addMessage]
  );

  // onCellChange is called with the row, column, and character.
  const onCellChange = useCallback(
    (row, col, char) => {
      addMessage(`onCellChange: "${row}", "${col}", "${char}"`);
      if(row== "0" && col== "0" && char == "T"){

      }
    },
    [addMessage]
  );

  return (
    <div>
 
      <Navbar style={{ backgroundColor: "#7798ab", color: "black" }}>
            <Container>
              <Navbar.Brand style={{ fontSize: 30, fontWeight: "bold" }}>
                <img
                  alt=""
                  src={img}
                  width=""
                  height="50"
                  className="d-inline-block align-top"
                />{" "}
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;MINDFEST
              </Navbar.Brand>
              <Nav className="me-auto"></Nav>
              <Nav
                style={{
                  color: "black",
                  fontSize: 15,
                  textTransform: "uppercase",
                }}
              >
                <Nav.Link
                  href="/Wait"
                  style={{ fontSize: 15, color: "black",fontWeight: "bold"}}
                >
                  Back&emsp;&emsp;&emsp;&emsp; 
                </Nav.Link>
                {localStorage.getItem("name")} <br />
                {localStorage.getItem("usn")}
              </Nav>
            </Container>
          </Navbar>
      <Container>
      <p style={{color: "white"}}>Note:  Navigate using your arrow keys.</p>
      
      <CrosswordWrapper
      style={{ color: "#7798AB" }}>
        <Crossword
          data={data}
          ref={crossword}
          onCorrect={onCorrect}
          onLoadedCorrect={onLoadedCorrect}
          theme={{
            gridBackground: "#7798AB",
            cellBackground: "grey",
            numberColor: "rgba(0,0,0,1)",
            focusBackground: "#ffd717",
          }}
          onCrosswordCorrect={onCrosswordCorrect}
          onCellChange={onCellChange}
        />
      </CrosswordWrapper>

      </Container>



      {/* <Messages>{messages}</Messages> */}
      </div>
  );
}

export default Example;