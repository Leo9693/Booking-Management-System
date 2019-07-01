import React from 'react';
import {Button, Navbar, Form, FormControl, Table, Container, Modal, Row, Col} from 'react-bootstrap';
import { getAllData, getDataByFilter, getDocumentById} from '../../api/getData';
import { handleCreateNewClient } from '../../api/create';
import {deleteDocumentById} from '../../api/delete';
import {handleUpdateClient} from '../../api/update';
import ClientDetailView from './clientDetailView';
import {Link} from 'react-router-dom';

class ClientView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchFilter: 'Search All',
            searchKeyword: '',
            clientData: null,
            clientNum: 0,
            showCreate: false,
            newClientName: '',
            newClientEmail: '',
            newClientPhone: '',
            showUpdate: false,
            updateClientName: '',
            updateClientEmail: '',
            updateClientPhone: '',
            updateClientId: '',
        }
    }

    componentDidMount() {
        this.handleSearch();   
    }

    handleShowCreate = (event) => {
        this.setState({
            showCreate: true,
            newClientName: '',
            newClientEmail: '',
            newClientPhone: '',
        })
    };
    handleCloseCreate = () => {
        this.setState({
            showCreate: false,
        })
    };
    handleSubmitCreate = () => {
        console.log(this.state.newClientName);
        const {newClientName, newClientEmail, newClientPhone} = this.state;
        handleCreateNewClient(newClientName, newClientEmail, newClientPhone).then(res => {
            console.log(res);
        }).then(() => this.handleCloseCreate())
            .then(() => this.handleSearch());       
    };

    handleInputChange = (event) => {
        const target = event.target;
        this.setState({
            [target.name]: target.value,
        });
    }

    handleSearch = (event) => {
        //event.preventDefault();
        this.setState({
            clientData: null,
            clientNum: 0,
        });
        if (this.state.searchFilter === 'Search All') {
            getAllData('customers').then(res => {
                this.setState({
                    clientData: res.documentsAfterPagination,
                    clientNum: res.documentCountBeforePagination,
                })
            });
        } else {
            if (!this.state.searchKeyword) {
                console.log('input keyword first');
            } else {
                getDataByFilter('customers',this.state.searchFilter ,this.state.searchKeyword)
                    .then(res => {
                        // console.log(res);
                        this.setState({
                            clientData: res.documentsAfterPagination,
                            clientNum: res.documentCountBeforePagination,
                        })
                    });

            }
            
        }

        // const {email, password} = this.state;
        // this.setState({
        //     // isFetching: true,
        //     error: null,
        // });

        // login(email, password).
        //     then(auth => {
        //     // this.setState({
        //     //     isFetching: false,
        //     // });
        //     this.props.history.replace('/');
        //     }).catch(err => {
        //         console.log(err.response.data);
        //         this.setState({
        //             error: err,
        //         })
        //     });
    }

    handleDelete = (event) => {
        const target = event.target;
        console.log(target.id);
        deleteDocumentById('customers', target.id)
            .then(res => {
                this.handleSearch();

                // const clientDataAfterDelete = this.state.clientData.forEach((element, index, arr) => {
                //     if (element._id === target.id) {
                //         arr.splice(index, 1);   
                //         console.log(arr); 
                //     };
                // });
                // console.log(clientDataAfterDelete);
                // this.setState({
                //     clientData: this.state.clientData.forEach((element, index, arr) => {
                //         if (element._id === target.id) {
                //             arr.splice(index, 1);   
                //             console.log(arr); 
                //         };
                //     }),
                // })
            });
        console.log('checkpoint handleDelete');
    }

    handleGetDetail = (event) => {
        const target = event.target;
        console.log(target.id);
        getDocumentById('customers', target.id)
            .then((res) => {
                // <ClientDetailView clientData={res}/>
                console.log(res);
            });
        console.log('checkpoint handleGetDetail');
    }

    handleShowUpdate = (event) => {
        const id = event.target.id;
        this.setState({
            showUpdate: true,
            updateClientId: this.state.clientData[id]._id,
            updateClientName: this.state.clientData[id].customerName,
            updateClientEmail: this.state.clientData[id].email,
            updateClientPhone: this.state.clientData[id].phone,
        })
    };
    handleCloseUpdate = () => {
        this.setState({
            showUpdate: false,
        })
    };
    handleSubmitUpdate = () => {
        console.log(this.state.updateClientPhone);
        const {updateClientName, updateClientEmail, updateClientPhone, updateClientId} = this.state;
        handleUpdateClient(updateClientName, updateClientEmail, updateClientPhone, updateClientId)
            .then(res => {
                console.log(res);
            }).then(() => this.handleCloseUpdate())
                .then(() => this.handleSearch());       
    };

    render() {
        return (
            // <Container bg="light" expand="lg">
            //     <Row >
            //         <Col bg="light" >Clients</Col>
            //         <Col bg="light">
            //             <Button bg="light" variant="success">Create</Button>
            //         </Col>
            //         <Col>
            //             <Button variant="primary">Check</Button>
            //         </Col>
            //         <Col>
            //             <Button variant="info">Search</Button>
            //         </Col>
            //     </Row>
            // </Container>
            <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand className="mr-auto">Clients</Navbar.Brand>
                
                <Form inline className="mr-3" >
                    <FormControl type="text" placeholder="Search keyword ..." className="mr-1"
                        name="searchKeyword" onChange={this.handleInputChange} />
                    {/* <Button variant="outline-success" className="mr-1"> Filter </Button> */}
                    
                    <Form.Control as="select" className="mr-1" 
                        name="searchFilter" onChange={this.handleInputChange}>
                        <option>Search All</option>
                        <option value="customerName">by Name</option>
                        <option value="phone">by Phone</option>
                        <option value="email">by Email</option>
                        <option value="_id">by Id</option>
                    </Form.Control>
                    <Button variant="outline-primary" onClick={this.handleSearch}>Go</Button>
                </Form>
                <Button variant="outline-success" className="mr-2" onClick={this.handleShowCreate}>Create</Button>
                {/* <Button variant="outline-warning" className="mr-2">Update</Button>
                <Button variant="outline-danger">Delete</Button> */}
            </Navbar>

            <Modal show={this.state.showUpdate} onHide={this.handleCloseUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Update customer data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated className="mx-2">
                        <Form.Group as={Row}>
                            <Form.Label  column sm={3}>Name</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    required type="text" 
                                    value={this.state.updateClientName}
                                    name="updateClientName" onChange={this.handleInputChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label  column sm={3}>Email</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    required readOnly type="email"
                                    value={this.state.updateClientEmail} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label  column sm={3}>Phone</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    required type="text"
                                    value={this.state.updateClientPhone}
                                    name="updateClientPhone" onChange={this.handleInputChange} />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseUpdate}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmitUpdate}>
                        Create
                    </Button>    
                </Modal.Footer>
            </Modal>

            <Modal show={this.state.showCreate} onHide={this.handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a customer data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated className="mx-2">
                        <Form.Group as={Row}>
                            <Form.Label  column sm={3}>Name</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    required type="text" placeholder="input new client name"
                                    name="newClientName" onChange={this.handleInputChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label  column sm={3}>Email</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    required type="email" placeholder="input new client email"
                                    name="newClientEmail" onChange={this.handleInputChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label  column sm={3}>Phone</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    required type="text" placeholder="input new client phone"
                                    name="newClientPhone" onChange={this.handleInputChange} />
                            </Col>
                        </Form.Group>
                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseCreate}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmitCreate}>
                        Create
                    </Button>    
                </Modal.Footer>
            </Modal>

            {this.state.clientData &&
            <Container className="mx-auto my-5">
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th>phone</th>
                        <th>operation</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.clientData.map((item, index) => {
                        console.log(item._id);
                        return (
                            <tr key ={`${item.email}`}>
                                <td>{item.customerName}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>
                                    <Button variant="danger" size="sm" className="mx-3"
                                        id={item._id} onClick={this.handleDelete}>
                                        D
                                    </Button>
                                    <Button variant="warning" size="sm" className="mr-3"
                                        id={index} onClick={this.handleShowUpdate}>
                                        U
                                    </Button>
                                    <Button variant="info" size="sm" className="mr-3"
                                        id={item._id} onClick={this.handleGetDetail}>
                                        M
                                    </Button>
                                </td>
                                <td>

                                </td>
                            </tr>
                        )})
                    }
                </tbody>
            </Table>
            </Container>
            }
            
            </div>
        )
    }
}

export default ClientView