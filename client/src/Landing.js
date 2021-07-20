import React from 'react';
import { Button,Container,Row } from 'react-bootstrap';


export default function Landing() {
    return (
        <div>
            <Container>
            <Row>
               <Button variant="dark"><a href="/auth/google">Login With Google</a></Button>
            </Row>
           
            </Container>
           
        </div>
    )
}
