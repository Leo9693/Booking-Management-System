import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Navbar, Nav, Form, FormControl} from 'react-bootstrap';

// import logo from '../../assets/';

export default (props) => {
    console.log(props);
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <Link to='/'>Booking Management</Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link>
                        <Link to='/admins'>Admins</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to='/clients'>Clients</Link>
                    </Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}