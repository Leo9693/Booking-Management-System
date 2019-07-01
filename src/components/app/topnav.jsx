import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Navbar, Nav, Form, FormControl, NavDropdown} from 'react-bootstrap';
import { loggedIn, logout } from '../../api/auth';

// import logo from '../../assets/';

class TopNav extends React.Component {

    handleLogout = (e) => {
        e.preventDefault();
        logout().then(() => this.props.history.replace('/'));
    }

    render () {
        console.log('topnav.jsx')
        console.log(this.props.history);
        
        return (
            <div>
    
            <Navbar bg="secondary" expand="lg" className="text-light">
                <Navbar.Brand>
                    <Link to='/' className="text-light">Booking Management</Link>
                </Navbar.Brand>
    
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav" className="text-light">
                     <Nav className="mr-auto">
                        <Nav.Link as={Link} to='/orders' className="text-light">
                            {/* <Link to='/admins'>Admins</Link> */}
                            Orders
                        </Nav.Link>
                        <Nav.Link as={Link} to='/clients' className="text-light">Clients
                            {/* <Link to='/clients'>Clients</Link> */}
                        </Nav.Link>
                    </Nav>
                    <NavDropdown title="Admin" id="basic-nav-dropdown" className="text-light">
                        {
                            loggedIn() ? 
                            (
                                // <NavDropdown.Item as={Link}  to='/signout'>Sign out</NavDropdown.Item>
                                <NavDropdown.Item onClick={this.handleLogout}>Log out</NavDropdown.Item>
                            ):
                            (
                                <NavDropdown.Item as={Link} to='/login'>Log in</NavDropdown.Item>
                            )
                        } 
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to='/signup'>Sign up</NavDropdown.Item>
                    </NavDropdown>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
                </Navbar.Collapse>
            </Navbar>
    
            </div>
        )
    }
    
}

export default withRouter(TopNav);
