import React from 'react';
import { useState,useEffect } from 'react';
import {Container,Navbar,NavbarBrand,Nav} from 'react-bootstrap';

export default function Header() {
   
  
    return (
        <div>
             <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="/auth/google" >Login</Nav.Link>
                
                </Nav>
                </Container>
            </Navbar>           
            
        </div>
    )
}
