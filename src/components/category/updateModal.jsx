import React, {Component} from 'react';
import {Modal, Form, Button, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import { actionCreators } from './store';

class UpdateModal extends Component {  
    componentDidMount() {
        console.log('componentDidMount');
        this.props.getUpdateCategory(this.props.selectedCategoryID);
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');  
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');   
    }

    
    render() {
        console.log('render');
        const {isShowUpdateModal, updateCategoryName, updateCategoryDescription, errorInfo, selectedCategoryID, currentPage, pageSize} = this.props;
        const {closeUpdateModal, handleInputChange, submitUpdate} = this.props;
        return (
            <Modal show={isShowUpdateModal} onHide={closeUpdateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update a category data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated className="mx-2">
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Name</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    required type="text" placeholder="input update category name"
                                    name="updateCategoryName" value={updateCategoryName} 
                                    onChange={handleInputChange} />
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Description</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    required type="text" placeholder="input update category description"
                                    name="updateCategoryDescription" value={updateCategoryDescription} 
                                    onChange={handleInputChange} />
                            </Col>
                        </Form.Group>
                    </Form>
                    {errorInfo && <div style={{color: "red"}}>{errorInfo.response.data}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeUpdateModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(event)=>submitUpdate(event, errorInfo, updateCategoryName, updateCategoryDescription, selectedCategoryID, currentPage, pageSize)}>
                        Update
                    </Button>    
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapState = (state) => ({
    isShowUpdateModal: state.category.isShowUpdateModal,
    updateCategoryName: state.category.updateCategoryName,
    updateCategoryDescription: state.category.updateCategoryDescription,
    errorInfo: state.category.errorInfo,
    selectedCategoryID: state.category.selectedCategoryID,
    currentPage: state.category.currentPage,
    pageSize: state.category.pageSize,
});

const mapDispatch = (dispatch) => ({
    closeUpdateModal: (errorInfo) => {
        dispatch(actionCreators.showUpdateModal(false));
        dispatch(actionCreators.setError(''));
        dispatch(actionCreators.handleInputChange('updateCategoryName', ''));
        dispatch(actionCreators.handleInputChange('updateCategoryDescription', ''))
    },

    handleInputChange: (event) => {
        const {name, value} = event.target;
        dispatch(actionCreators.handleInputChange(name, value));
    },

    submitUpdate: (event, errorInfo, updateCategoryName, updateCategoryDescription, selectedCategoryID, currentPage, pageSize) => {
        if (errorInfo) {
            dispatch(actionCreators.setError(''));
        }
        dispatch(actionCreators.updateCategory(updateCategoryName, updateCategoryDescription, selectedCategoryID, currentPage, pageSize));
    },

    getUpdateCategory: (selectedCategoryID) => {
        dispatch(actionCreators.getUpdateCategory(selectedCategoryID));
    }
});

export default connect(mapState, mapDispatch)(UpdateModal);

            