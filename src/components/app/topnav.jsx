import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Navbar, Nav, Form, FormControl, NavDropdown} from 'react-bootstrap';
import { loggedIn, logout } from '../../api/auth';

// import logo from '../../assets/';

function TopNav (props) {

    console.log('topnav.jsx')
    console.log(props.history);

    const signOut = (e) => {
            e.preventDefault();
            logout().then(() => props.history.replace('/signin'));
        }
    
    return (
        <div>

        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <Link to='/'>Booking Management</Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            
            <Navbar.Collapse id="basic-navbar-nav">
                 <Nav className="mr-auto">
                    <Nav.Link as={Link} to='/admins'>
                        {/* <Link to='/admins'>Admins</Link> */}
                        Admins
                    </Nav.Link>
                    <Nav.Link as={Link} to='/clients'>Clients
                        {/* <Link to='/clients'>Clients</Link> */}
                    </Nav.Link>
                </Nav>
                <NavDropdown title="Login/Signup" id="basic-nav-dropdown">
                    {
                        loggedIn() ? 
                        (
                            // <NavDropdown.Item as={Link}  to='/signout'>Sign out</NavDropdown.Item>
                            <NavDropdown.Item onClick={signOut}>Sign out</NavDropdown.Item>
                        ):
                        (
                            <NavDropdown.Item as={Link} to='/signin'>Sign in</NavDropdown.Item>
                        )
                    }
                            

                    <NavDropdown.Divider />
                    <NavDropdown.Item>Signup</NavDropdown.Item>
                </NavDropdown>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>

        </div>
    )
}

export default withRouter(TopNav);