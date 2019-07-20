import React, {Component} from 'react';
import {Modal, Form, Button, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import { actionCreators } from './store';

class CreateModal extends Component {
    componentDidMount() {
        console.log('componentDidMount');
    }

    componentDidUpdate() {
        console.log('11componentDidUpdate');  
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');   
    }

    render() {
        console.log('render');   
        const {isShowCreate, newCategoryName, newCategoryDescription, errorInfo, currentPage, pageSize} = this.props;
        const {closeCreate, handleInputChange, submitCreate} = this.props;
        return (
            <Modal show={isShowCreate} onHide={closeCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a category data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated className="mx-2">
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Name</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    required type="text" placeholder="input new category name"
                                    name="newCategoryName" onChange={handleInputChange} />
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Description</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    required type="text" placeholder="input new category description"
                                    name="newCategoryDescription" onChange={handleInputChange} />
                            </Col>
                        </Form.Group>
                    </Form>
                    {errorInfo && <div style={{color: "red"}}>{errorInfo.response.data}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCreate}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(event)=>submitCreate(event, errorInfo, newCategoryName, newCategoryDescription, currentPage, pageSize)}>
                        Create
                    </Button>    
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapState = (state) => ({
    isShowCreate: state.category.isShowCreate,
    newCategoryName: state.category.newCategoryName,
    newCategoryDescription: state.category.newCategoryDescription,
    errorInfo: state.category.errorInfo,
    currentPage: state.category.currentPage,
    pageSize: state.category.pageSize,
});

const mapDispatch = (dispatch) => ({
    closeCreate: () => {
        dispatch(actionCreators.closeCreate());
        dispatch(actionCreators.setError(''));
    },

    handleInputChange: (event) => {
        const {name, value} = event.target;
        dispatch(actionCreators.handleInputChange(name, value));
    },

    submitCreate: (event, errorInfo, newCategoryName, newCategoryDescription, currentPage, pageSize) => {
        if (errorInfo) {
            dispatch(actionCreators.setError(''));
        }
        dispatch(actionCreators.createCategory(newCategoryName, newCategoryDescription, currentPage, pageSize));
    }
});

export default connect(mapState, mapDispatch)(CreateModal);

            