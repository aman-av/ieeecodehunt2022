import React from "react";
import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import check from "./images/check.svg";
import cross from "./images/cross.svg";
import { Redirect } from "react-router";

export default function Final() {
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
    fetch('/api/6').then((res) =>{
      res.json()
    }).then(
      result => 
        console.log(result)
      
    )
  }
  return (
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
            <th>Name</th>
            <th>Round1</th>
            <th>Round2</th>
            <th>Rank</th>
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
          <tr>
            <td>John Doe</td>

            <td>
              <tr>
                <img src={check} />
              </tr>
              <tr>3</tr>
            </td>

            <td>
              <tr>
                <img src={cross} />
              </tr>
            </td>
            <td>6</td>
          </tr>
          <tr>
            <td>John Doe</td>
            <td>
              <tr>
                <img src={check} />
              </tr>
              <tr>3</tr>
            </td>
            <td>
              <tr>
                <img src={check} />
              </tr>
              <tr>9</tr>
            </td>
            <td>6</td>
          </tr>
          <tr>
            <td>John Doe</td>
            <td>
              <tr>
                <img src={check} />
              </tr>
              <tr>3</tr>
            </td>
            <td>
              <tr>
                <img src={cross} />
              </tr>
              <td>5</td>
            </td>
            <td>6</td>
          </tr>
        </tbody>
      </Table>
      <Button onClick={handler} style={{ backgroundColor: "#850505" }}>
        End
      </Button>
      <Button onClick={getDate} style={{ backgroundColor: "#850505" }}>
        Get Date
      </Button>
    </div>
  );
}
