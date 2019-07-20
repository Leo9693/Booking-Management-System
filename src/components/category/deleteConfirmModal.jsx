import React, {Component} from 'react';
import {Modal, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import { actionCreators } from './store';

class DeleteConfirmModal extends Component {  
    render() {
        const {isShowDeleteConfirm, selectedCategoryID, currentPage, pageSize} = this.props;
        const {closeDeleteConfirm, submitDeleteConfirm} = this.props;
        return (
            <Modal show={isShowDeleteConfirm} onHide={closeDeleteConfirm}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure to delete this data?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteConfirm}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => submitDeleteConfirm(selectedCategoryID, currentPage, pageSize)}>
                        Confrim
                    </Button>    
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapState = (state) => ({
    isShowDeleteConfirm: state.category.isShowDeleteConfirm,
    selectedCategoryID: state.category.selectedCategoryID,
    currentPage: state.category.currentPage,
    pageSize: state.category.pageSize,
});

const mapDispatch = (dispatch) => ({
    closeDeleteConfirm: () => {
        dispatch(actionCreators.setDeleteConfirm(false));
        dispatch(actionCreators.setSelectedCategoryID(''));
    },

    submitDeleteConfirm: (selectedCategoryID, currentPage, pageSize) => {
        dispatch(actionCreators.deleteSelectedCategory(selectedCategoryID, currentPage, pageSize));
    }
});

export default connect(mapState, mapDispatch)(DeleteConfirmModal);