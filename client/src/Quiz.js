import React,{useCallback,useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import { Button,Container,Row } from 'react-bootstrap';

function Quiz() {

    const [istrue, setistrue] = useState("false");
   
    const handler = () =>
    {
      
            setistrue("true");
      
    }
   
  

      if(istrue==="false")
    {return (
        <div>
            <h1>Quiz</h1>
            <Button onClick={handler}>Condition</Button>
        </div>
    )}
    else{
       

        const currentdate = new Date();
    var date = 
                 [currentdate.getHours()  
                , currentdate.getMinutes()
                , currentdate.getSeconds()]
        const data={ date};
     const options={
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };

       fetch('/api/3',options)
       return <Redirect to="/Dashboard"/>;
    }
}

export default Quiz
