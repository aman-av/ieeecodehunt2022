import React from "react";

import { Container, Navbar, Nav } from "react-bootstrap";

export default function Header() {
  return (
    <div>
      <Navbar style={{ backgroundColor: "#7798ab", color: "black" }}>
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto" style={{ color: "black" }}>
            <Nav.Link href="/Final">Leaderboard</Nav.Link>
            <Nav.Link href="/">Login</Nav.Link>
            <Nav.Link href="/Quiz">Quiz</Nav.Link>
            <Nav.Link href="/Wait">Wait</Nav.Link>
            <Nav.Link href="/Dashboard">Crossword</Nav.Link>
            {/* <Nav.Link href="/Example">Example</Nav.Link>
            <Nav.Link href="/Test">Test</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
