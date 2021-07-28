import React from 'react';
import { useStopwatch } from 'react-timer-hook';
import {Container,Button,Table} from 'react-bootstrap';
import {Timer} from 'react-compound-timer';
import { useState,useEffect } from 'react';
import { useTimer } from 'use-timer';
import { Redirect } from 'react-router-dom';



//import Axios from 'axios';
function Final() {

    
    useEffect(() => {
      
     
      window.history.pushState(null, document.title, window.location.href);
      window.addEventListener('popstate', function (event){
          window.history.pushState(null, document.title,  window.location.href);
         
      });
    });

    const [end, setend] = useState(false);
    const [data,setdata]=useState([]);
    useEffect(() => {
        fetch('/api/1')
        .then(result => (result).json()).
        then(rr=>{console.log(rr);
        setdata(rr)});
    }, [])
    
    const handler = () =>{
        setend(true);
    }
   
    //const { time, start, pause, reset, status } = useTimer( {initialTime: nv,autostart:true});
    
    return (
        
        
        <div>

            <Container>
           
            <h1 style={{textAlign:'center'}}>LeaderBoard</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Rank</th>
                    <th>Name</th>
                   
                    </tr>
                </thead>
                <tbody>
                   
                    {data.map(valu=>(
                         <tr>
                       <td>{valu.key+1}</td>
                       <td>{valu.value}</td>
                       </tr>
                    ))}
                   
                    
                   
                   
                </tbody>
                </Table>
                
               

            <Button onClick={handler}>End</Button>             
            {
                end?<Redirect to="/api/logout"/>:console.log('loggedin')
            }
            </Container>
           
            
        </div>
    )
}

export default Final
