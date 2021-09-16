import React, { useCallback, useRef, useState } from 'react';
import Crossword from '@jaredreisinger/react-crossword';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Navbar, Nav } from "react-bootstrap";
import img from "./images/3.png";
import img1 from './images/1.png'
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
              <Navbar.Brand style={{ fontSize: 30, fontWeight: "bold",fontFamily :"StarJediOutline" }}>
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
                <img src={img1} height="40"/>&emsp;&emsp;&emsp;&emsp;
                  
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