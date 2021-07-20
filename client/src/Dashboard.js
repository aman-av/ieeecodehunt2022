import React, { useCallback, useRef, useState } from 'react';
import Crossword from '@jaredreisinger/react-crossword';
import styled from 'styled-components';
import { Button,Container,Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


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





// in order to make this a more-comprehensive example, and to vet Crossword's
// features, we actually implement a fair amount...

function App() {
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

  const mystyle={
    height:"",
    width:"50vw"
  };

  // onCrosswordCorrect is called with a truthy/falsy value.
  const onCrosswordCorrect = useCallback(
    (isCorrect) => {if(isCorrect==true)
     { addMessage(`${JSON.stringify(isCorrect)}`);
      }
    },
    [addMessage]
  );
  if(messages==false)
  {
  return (
    <div style={mystyle}>
     <Container>
     <Button variant="secondary" onClick={reset}>Reset</Button>
     

     
       <Crossword
       
         data={data}
         ref={crossword}
         onCrosswordCorrect={onCrosswordCorrect}
         
       />
     
     <h4>{messages}</h4>
     
     </Container>
     
    </div>
  );}
  else
    {
      const currentdate = new Date();
      var date = "Last Sync: " + currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();
      const points=100;
    const data={points , date};
    const options={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };

         fetch('/api',options)
       
    
        crossword.current.reset();return <Redirect to="/Final"/>;
    }
}

export default App;
