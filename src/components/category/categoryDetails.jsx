import React, { Component } from 'react';
import {LoadingButton} from '../Ui/Button';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Link } from 'react-router-dom';
import BlockUi from 'react-block-ui';
import { Descriptions } from 'antd';
import SubTopNav from '../Ui/subTopNav';
import AddInfoBar from '../Ui/addInfoBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { deleteBusinessFromCategoryById } from '../../api/categoryData';


class CategoryDetails extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getCategoryByID(id);
        // isLoading = true;
        // getDocumentById()
    }
    componentWillUnmount() {
        console.log('CategoryDetails componentWillUnmount');
        this.props.clearComponent();
    }

    render() {
        const {isLoading, detailedCategory, addedBusinessSelector, addedBusinessInfo, searchKeyword, searchFilter, currentPage, pageSize, errorInfo, sortKey, sortValue} = this.props;
        const {handleInputChange, handleSearch, addBusinessToCategory, deleteBusinessFromCategoryById} = this.props;

        const search = (event) => {
            handleSearch(event, searchKeyword, searchFilter, currentPage, pageSize, sortKey, sortValue)
        }
        const handleAddClick = (event) => {
            addBusinessToCategory(event, addedBusinessSelector, addedBusinessInfo, detailedCategory._id)
        }
        const handleDelete = (event, businessId) => {
            deleteBusinessFromCategoryById(event, businessId, detailedCategory._id);
        }
        console.log('re-render' + isLoading);
        return (
            <BlockUi blocking={isLoading}>

                <SubTopNav handleInputChange={handleInputChange} search={search} isLoading={isLoading}
                        title={"Category Data Management"} titleLink={"/categories"}
                        searchList={["name", "description"]} sortList={["name", "description"]}
                />

                
                {(detailedCategory._id) && 
                    <DisplayCategory detailedCategory={detailedCategory}
                        handleDelete={handleDelete} 
                    />}

                {<AddInfoBar  addInfoTitle={"Add Business"}
                            addInfoSelectorName={"addedBusinessSelector"}
                            addInfoSelectorList={["businessName", "ABN", "email", "phone", "id"]}
                            addInfoValue={"addedBusinessInfo"}
                            isLoading={isLoading}
                            linkPath={"categories"}
                            handleInputChange={handleInputChange}
                            handleAddClick={handleAddClick}
                    />
                }

                {errorInfo && <div style={{color: "red"}}>{errorInfo.response.data}</div>}

            </BlockUi>
        )
    }
}

function DisplayCategory(props) {
    const {detailedCategory, handleDelete} = props;
    return (

        <Descriptions bordered column={1} className="my-3">
                    {/* // title="Category Details" */}
            <Descriptions.Item label="Name">
                {detailedCategory.name}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
                {detailedCategory.description}
            </Descriptions.Item>
            <Descriptions.Item label="Businesses">
  
                {(detailedCategory.businesses.length !== 0) && 
                    <BusinessesTable businesses={detailedCategory.businesses} 
                        handleDelete={handleDelete}
                    />}
            </Descriptions.Item>
        </Descriptions>
    )
}

function BusinessesTable(props) {
    const { businesses } = props;
    const { handleDelete } = props;
    return (
        <table className="table table-hover table-borderless">
            <thead>
                <tr className="row">
                    <th className="col-2" style={{padding: "20px 20px"}}>Name</th>
                    <th className="col-3" style={{padding: "20px 40px"}}>Email</th>
                    <th className="col-4" style={{padding: "20px 60px"}}>ID</th>
                    <th className="col-3" style={{padding: "20px 10px"}}>Operation</th>
                </tr>
            </thead>
            <tbody>
                {                    console.log(businesses)}
                {businesses.map((item) => (

                    <tr key={item._id}  className="row">
                        <td className="col-2">{item.businessName}</td>
                        <td className="col-3">{item.email}</td>
                        <td className="col-4">{item._id}</td>
                        <td className="col-3">
                            <Link to={`/businesses/list/${item._id}`}>
                                <button type="button" className="btn btn-info btn-sm mr-4 px-1"
                                        style={{width: "30px"}} 
                                        data-toggle="tooltip" data-placement="top" title="Check business details"
                                >
                                    <FontAwesomeIcon icon={faInfo} 
                                        // onClick={() => handleDetail(item._id)} 
                                    />
                                        {/* <i className="fas fa-info text-light px-1" */}
                                        {/* onClick={() => handleDetail(item._id)} */}
                                    {/* /> */}
                                </button>
                            </Link>

                            <button type="button" className="btn btn-danger btn-sm mr-4"
                                style={{width: "30px"}} 
                                onClick={(event) => handleDelete(event, item._id)}
                                data-toggle="tooltip" data-placement="top" title="Remove from category"
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const mapState = (state) => ({
    searchKeyword: state.category.searchKeyword,
    searchFilter: state.category.searchFilter,
    currentPage: state.category.currentPage,
    pageSize: state.category.pageSize,
    errorInfo: state.category.errorInfo,
    sortKey: state.category.sortKey,
    sortValue: state.category.sortValue,
    isLoading: state.category.isLoading,
    detailedCategory: state.category.detailedCategory,
    addedBusinessSelector: state.category.addedBusinessSelector, 
    addedBusinessInfo: state.category.addedBusinessInfo,
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
        dispatch(actionCreators.handleSearchByFilter(searchFilter, searchKeyword, currentPage, pageSize, sortKey, sortValue));
    },

    getCategoryByID: (id) => {
        dispatch(actionCreators.setIsLoading(true));
        dispatch(actionCreators.setError(''));
        dispatch(actionCreators.getDetailedCategory(id));
    },

    clearComponent: () => {
        dispatch(actionCreators.setError(''));
        dispatch(actionCreators.handleInputChange('detailedCategory', {}))
    },

    addBusinessToCategory: (event, addedBusinessSelector, addedBusinessInfo, categoryID) => {
        event.preventDefault();
        dispatch(actionCreators.setIsLoading(true));
        dispatch(actionCreators.setError(''));
        dispatch(actionCreators.addBusinessToCategory(addedBusinessSelector, addedBusinessInfo, categoryID));
        console.log('getDetailedCategory: ' + categoryID);
        // dispatch(actionCreators.getDetailedCategory(categoryID));
    },

    deleteBusinessFromCategoryById: (event, businessID, categoryID) => {
        dispatch(actionCreators.setIsLoading(true));
        dispatch(actionCreators.setError(''));
        dispatch(actionCreators.deleteBusinessFromCategory(businessID, categoryID));
    }
});

export default connect(mapState, mapDispatch)(CategoryDetails)