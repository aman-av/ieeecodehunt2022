import React from 'react';
import { useState,useEffect } from 'react';
import {Container,Navbar,NavbarBrand,Nav} from 'react-bootstrap';

export default function Header() {
   
    // const [auth, setauth] = useState(null)
    // useEffect(() => {
    //   fetch('/api/auth').
    //   then(ree=>ree.json())
    //   .then(re=>{console.log(re)
    //     setauth(re)})
      
    // },[])
    // if(auth=='')
    return (
      <div>
        <Navbar style={{ backgroundColor: "#7798ab", color: "black" }}>
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto" style={{ color: "black" }}>
              <Nav.Link href="/Final">Home</Nav.Link>

              <Nav.Link href="/Login">Login</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
//     else
//     {
        
//         return (
//             <div>
//                  <Navbar bg="dark" variant="dark">
//                     <Container>
//                     <Navbar.Brand href="#home">Navbar</Navbar.Brand>
//                     <Nav className="me-auto">
//                     <Nav.Link href="/Final">Home</Nav.Link>
//                     <Nav.Link href="/Quiz">Quiz</Nav.Link>
//                     <Nav.Link href="/Login" >Login</Nav.Link>
                    
//                     </Nav>
//                     </Container>
//                 </Navbar>           
                
//             </div>
//         )
//     }
 }
