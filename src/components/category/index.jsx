import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import CreateModal from './createModal';
import DeleteConfirmModal from './deleteConfirmModal'; 
import UpdateModal from './updateModal';
import Paginating from './paginating';
import {LoadingButton} from '../UI/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

class Category extends Component {

    render() {
          
        const {handleInputChange, handleSearch, handleDetail, handleDelete, handleUpdate, showCreate, changePageSize} = this.props;
        const {documentsList, searchKeyword, searchFilter, isShowUpdateModal, errorInfo, currentPage, pageSize, sortKey, sortValue, isShowCreate} = this.props;
        console.log('Category1');
        console.log(errorInfo);
        return (
            <div>

            <form className="form-inline bg-light py-3 px-3">
                <label className="mr-auto">Category Data Management</label>

                <input className="form-control mr-1" type="search"
                    placeholder="Search Keyword..."
                    name="searchKeyword" onChange={handleInputChange}
                />
                <select className="form-control mr-1"
                    name="searchFilter" onChange={handleInputChange}
                >
                    <option value="searchAll">Search All</option>
                    <option value="name">Search By Name</option>
                </select>
                <LoadingButton className="btn mr-2" buttonStyle="btn-outline-primary" type="submit"
                    onClick={(event) => handleSearch(event, searchKeyword, searchFilter, currentPage, pageSize, sortKey, sortValue)}
                >
                    Search
                </LoadingButton>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Sort By: </span>
                    </div>
                    <select className="form-control mr-1"
                        name="sortKey" onChange={handleInputChange}
                    >
                        <option value="name">Name</option>
                        <option value="description">Description</option>
                    </select>
                </div>
            </form>
            
            <div className="py-3 px-3">                
                <button className="btn btn-success mr-auto btn-lg"
                        onClick={showCreate}
                >
                    Create
                </button>    
            </div>

            {isShowCreate && <CreateModal/>}
            <DeleteConfirmModal />
            {isShowUpdateModal && <UpdateModal />}
            {errorInfo && <div style={{color: "red"}}>{errorInfo.response.data}</div>}

            { documentsList && 
            <div className="mx-5 mt-5">
                <table className="my-3 table">
                    <thead>
                        <tr className="row">
                            <th className="col-2">Service</th>
                            <th className="col-7">Description</th>
                            <th className="col-3">Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documentsList.map((item) => (
                                <tr key={item._id}  className="row">
                                    <td className="col-2">{item.name}</td>
                                    <td className="col-7">{item.description}</td>
                                    <td className="col-3">
                                        {console.log(item._id)}
                                        <Link to={`/categories/${item._id}`}>
                                            <button type="button" className="btn btn-info btn-sm mr-4">
                                                <FontAwesomeIcon icon={faInfo} 
                                                                onClick={() => handleDetail(item._id)} />
                                                     {/* <i className="fas fa-info text-light px-1" */}
                                                     {/* onClick={() => handleDetail(item._id)} */}
                                                 {/* /> */}
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-warning btn-sm mr-4"
                                            onClick={() => handleUpdate(item._id)}
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                            {/* <i className="far fa-edit text-light"/> */}
                                        </button>
                                        <button type="button" className="btn btn-danger btn-sm mr-4"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                            <i className="far fa-trash-alt text-light"/>
                                        </button>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-5">
                    <Paginating/>
                </div>
            </div>
            
            }
            
            </div>
        )
    }
}

const mapState = (state) => ({
    searchKeyword: state.category.searchKeyword,
    searchFilter: state.category.searchFilter,
    documentsCount: state.category.documentsCount, 
    documentsList: state.category.documentsList,
    currentPage: state.category.currentPage,
    pageSize: state.category.pageSize,
    isShowCreate: state.category.isShowCreate,
    isShowUpdateModal: state.category.isShowUpdateModal,
    errorInfo: state.category.errorInfo,
    sortKey: state.category.sortKey,
    sortValue: state.category.sortValue,
    isShowCreate: state.category.isShowCreate
});

const mapDispatch = (dispatch) => ({
    handleInputChange: (event) => {
        event.preventDefault();
        dispatch(actionCreators.setError(''));
        const {name, value} = event.target
        dispatch(actionCreators.handleInputChange(name, value));
    },

    handleSearch: (event, searchKeyword, searchFilter, currentPage, pageSize, sortKey, sortValue) => {
        event.preventDefault();
        dispatch(actionCreators.setError(''));
        // if (searchFilter === 'searchAll') {
        //     dispatch(actionCreators.handleSearch(currentPage, pageSize));
        // } else {
        //     dispatch(actionCreators.handleSearchByFilter(searchFilter, searchKeyword));
        // }
        dispatch(actionCreators.handleSearchByFilter(searchFilter, searchKeyword, currentPage, pageSize, sortKey, sortValue));
    },

    showCreate: (event) => {
        event.preventDefault();
        dispatch(actionCreators.showCreate());
    },

    handleDetail: (id) => {
        console.log(id);
    },

    handleUpdate: (id) => {
        dispatch(actionCreators.setSelectedCategoryID(id));
        dispatch(actionCreators.showUpdateModal(true));
    },

    handleDelete: (id) => {
        dispatch(actionCreators.setSelectedCategoryID(id));
        dispatch(actionCreators.setDeleteConfirm(true));
    },

});

export default connect(mapState, mapDispatch)(Category);