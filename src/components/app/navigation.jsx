import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Accordion, Card, Button, NavDropdown} from 'react-bootstrap';
import { loggedIn, logout } from '../../api/auth';
import { withRouter } from 'react-router-dom'

class Navigation extends Component {
   
    handleLogout = (event) => {
        event.preventDefault();
        console.log(this.props.history);
        logout().then(() => this.props.history.replace('/'));
    }

    render() {
        return (
         
            <Navbar bg="light" className="flex-column">
                <Navbar.Brand as={Link} to="/">Booking Management</Navbar.Brand>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0" >
                                Data View
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Nav.Link as={Link} to="/orders"  className="text-dark">Orders</Nav.Link>
                                <NavDropdown.Divider />
                                <Nav.Link as={Link} to="/orders"  className="text-dark">Customers</Nav.Link>
                                <NavDropdown.Divider />
                                <Nav.Link as={Link} to="/orders"  className="text-dark">Businesses</Nav.Link>
                                <NavDropdown.Divider />
                                <Nav.Link as={Link} to="/categories"  className="text-dark">Categories</Nav.Link>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

                <Nav.Link className="mb-5"  as={Link} to="/orders">Admin User</Nav.Link>

                <NavDropdown 
                    title="Log in / Sign up" id="basic-nav-dropdown" 
                    className="text-light"
                >
                    {
                        loggedIn() ? 
                            <NavDropdown.Item onClick={this.handleLogout}>
                                Log out
                            </NavDropdown.Item>
                            :
                            <NavDropdown.Item as={Link} to='/login'>
                                Log in
                            </NavDropdown.Item>
                    } 
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to='/signup'>Sign up</NavDropdown.Item>
                </NavDropdown>
            </Navbar>
      
        )
    }
}

export default withRouter(Navigation);