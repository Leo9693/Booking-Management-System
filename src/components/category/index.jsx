import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';

import CreateModal from './createModal';
import DeleteConfirmModal from './deleteConfirmModal'; 
import UpdateModal from './updateModal';
import {LoadingButton} from '../Ui/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import SubTopNav from '../Ui/subTopNavCategory';
import PaginationBar from '../Ui/paginationBar';
import BlockUi from 'react-block-ui'
import { setIsLoading } from './store/actionCreators';

class Category extends Component {
    componentDidMount() {
        const {searchFilter, searchKeyword, currentPage, pageSize, sortKey, sortValue} = this.props;
        this.props.initializeData(searchFilter, searchKeyword, currentPage, pageSize, sortKey, sortValue);
    }
    
    render() {
        const {handleInputChange, handleSearch, handleDetail, handleDelete, handleUpdate, showCreate, selectPage, changePageSize} = this.props;
        const {documentsList, searchKeyword, searchFilter, isShowUpdateModal, errorInfo, currentPage, pageSize, sortKey, sortValue, isShowCreate, setPageAs, documentsCount, isLoading} = this.props;

        const search = (event) => {
            handleSearch(event, searchKeyword, searchFilter, currentPage, pageSize, sortKey, sortValue)
        };
        const onClickSelectPage = (event, page, pageCount) => {
            event.preventDefault();
            selectPage(page, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue);
        };
        const onClickSetPage = (event, pageCount) => {
            event.preventDefault();
            const page = parseInt(setPageAs);
            selectPage(page, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue);
        };
        const onChangePageSize = (event) => {
            changePageSize(event, searchKeyword, searchFilter, currentPage, pageSize, sortKey, sortValue)
        }
        const pageSizeSelectorList=[1, 3, 5, 10, 15, 20];

        return (
        <div>
            <BlockUi blocking={isLoading}>
                <SubTopNav handleInputChange={handleInputChange} search={search} isLoading={isLoading}
                            title={"Create new category"} showCreate={showCreate}
                            searchList={["name", "description"]} sortList={["name", "description"]}
                />            
                {/* <div className="py-3 px-3">                
                    <button className="btn btn-success mr-auto btn-lg"
                            onClick={showCreate}
                    >
                        Create a new category
                    </button>    
                </div> */}
            </BlockUi>

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
                                            <button type="button" className="btn btn-info btn-sm mr-4 px-1"
                                                    style={{width: "30px"}} 
                                                    data-toggle="tooltip" data-placement="top" title="Details"
                                            >
                                                <FontAwesomeIcon icon={faInfo} 
                                                    onClick={() => handleDetail(item._id)} />
                                                     {/* <i className="fas fa-info text-light px-1" */}
                                                     {/* onClick={() => handleDetail(item._id)} */}
                                                 {/* /> */}
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-warning btn-sm mr-4"
                                            style={{width: "30px"}} onClick={() => handleUpdate(item._id)}
                                            data-toggle="tooltip" data-placement="top" title="Edit"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                            {/* <i className="far fa-edit text-light"/> */}
                                        </button>
                                        <button type="button" className="btn btn-danger btn-sm mr-4"
                                            style={{width: "30px"}} onClick={() => handleDelete(item._id)}
                                            data-toggle="tooltip" data-placement="top" title="Delete"
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
                    <PaginationBar documentsCount={documentsCount}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        pageSizeSelectorList={pageSizeSelectorList}
                        pageSizeSelectorName={"pageSize"}
                        setPageInputName={"setPageAs"}
                        onClickSelectPage={onClickSelectPage}
                        onClickSetPage={onClickSetPage}
                        handleInputChange={handleInputChange}
                        onChangePageSize={onChangePageSize}
                        isLoading={isLoading}
                    />
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
    isShowCreate: state.category.isShowCreate,
    setPageAs: state.category.setPageAs,
    isLoading: state.category.isLoading
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

    initializeData: (searchFilter, searchKeyword, currentPage, pageSize, sortKey, sortValue) => {
        dispatch(actionCreators.handleInputChange('pageSize', 5))
        dispatch(actionCreators.selectPage(1));
        dispatch(actionCreators.handleSearchByFilter());
    },

    showCreate: (event) => {
        console.log('showCreate, showCreate, showCreate, showCreate,showCreate ')
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

    selectPage: (page, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue) => {
        if (page < 1 || page > pageCount) {
            return;
        }
        dispatch(actionCreators.setIsLoading(true));
        dispatch(actionCreators.selectPage(page));
        dispatch(actionCreators.handleSearchByFilter(searchFilter, searchKeyword, page, pageSize, sortKey, sortValue));
    },

    changePageSize: (event, searchKeyword, searchFilter, currentPage, pageSize, sortKey, sortValue) => {
        const {name, value} = event.target
        dispatch(actionCreators.handleInputChange(name, value));
        pageSize = value;
        dispatch(actionCreators.handleSearchByFilter(searchFilter, searchKeyword, currentPage, pageSize, sortKey, sortValue));
    },

});

export default connect(mapState, mapDispatch)(Category);