import React from "react";
import { Button, Table, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import check from "./images/check.svg";
import cross from "./images/cross.svg";
import { Redirect } from "react-router";

export default function Final(props) {

  const [arr, setarr] = useState([]);
  useEffect(() => {

    fetch('/api/7')
    .then(response=>response.json()).then(out=>{
      setarr(out);
      console.log(out);})
    
    
   
      // if (result.participant[0] === undefined) {
      //   console.log("user doesnt exits");
      //   window.alert("Only Registered Users can participate");
      // } else {
      //   console.log(result);
      //   console.log(result.participant[0].intime);
      //   var participant = result.participant[0];
        // console.log(result);
      // }
        
     
    
  
  }, [])

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  });

  const [end, setend] = useState(false);
  // const [data, setdata] = useState([]);

  const handler = () => {
    // window.localStorage.clear();
    setend(true);
  };
  const getDate = () => {
    fetch('/api/6')
    .then((res) => res.json()
    ).then(
      result => {
        console.log(props.eventStartDate.getTime())
        console.log(result.dates[0].eventstarttime);
      }
    ).catch((e) =>{
      console.log(e);
    })


  }
  return (
    <Container>
      <div>
      <div>
        <h3
          style={{
            margin: "10px",
            padding: "10px",
            color: "white",
            textAlign: "center",
          }}
        >
          Leaderboard
        </h3>
      </div>
      <Table
        bordered
        style={{
          marginTop: "2rem",
          backgroundColor: "rgba(119,152,171,0.8)",
          color: "black",
          fontSize: "22px",
          fontWeight: "10",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Round1</th>
            <th>Round2</th> 
          </tr>
        </thead>
        <tbody
          style={{
            textAlign: "center",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: "rgba(119, 152, 171, 0.6)",
          }}
        >
           {arr.map(arr=>(
             <tr>
           <td>{arr.key+1}</td>
           <td>{arr.value.name}</td>
           <td>{arr.value.quizpoints}</td>
           <td>{arr.value.crosswordpoints}</td>
           </tr>
        ))}         
          
        </tbody>
      </Table>
      <Button onClick={handler} style={{ backgroundColor: "#850505" }}>
        End
      </Button>
      <Button onClick={getDate} style={{ backgroundColor: "#850505" }}>
        Get Date
      </Button>
    </div>

    </Container>
    
  );
}
