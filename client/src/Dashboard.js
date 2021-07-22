import React, { useCallback, useRef, useState,useEffect } from 'react';
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

function Dashboard() {
  const currentdate = new Date();
  var date = 
  [currentdate.getHours()  
 , currentdate.getMinutes()
 , currentdate.getSeconds()]
 

   
  const [intime,setintime]=useState([0,0,0]);
   useEffect(() => {
    fetch('/api/4')
    .then(result => (result).json()).
    then(rr=>{console.log(rr);
    setintime(rr)});
   }, [])
  
   const [seconds, setSeconds] = useState(1);
    useEffect(()=>{
    console.log("once")
    setSeconds(1+Math.abs(date[0]-intime[0])*3600+Math.abs(date[1]-intime[1])*60+Math.abs(date[2]-intime[2]))}
    ,intime);    

   


    
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

     {(Math.floor(seconds/3600))%24}:{(Math.floor(seconds/60))%60}:{seconds%60}

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
      var date = [currentdate.getHours(),  
       currentdate.getMinutes(),
       currentdate.getSeconds()]
      const points=100;
    const data={points , date};
    const options={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };

         fetch('/api/2',options)
       
    
        crossword.current.reset();
        return <Redirect to="/Final"/>;
    }
}

export default Dashboard;
