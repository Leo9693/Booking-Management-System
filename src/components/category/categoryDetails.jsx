import React, { Component } from 'react';
import {LoadingButton} from '../Ui/Button';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Link } from 'react-router-dom';
import BlockUi from 'react-block-ui';
import { Descriptions } from 'antd';
import SubTopNav from '../Ui/subTopNav';
import AddInfoBar from '../Ui/addInfoBar';

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
        const {handleInputChange, handleSearch, addBusinessToCategory} = this.props;

        const search = (event) => {
            handleSearch(event, searchKeyword, searchFilter, currentPage, pageSize, sortKey, sortValue)
        }
        const handleAddClick = (event) => {
            addBusinessToCategory(event, addedBusinessSelector, addedBusinessInfo, detailedCategory.id)
        }
        
        return (
            <BlockUi blocking={isLoading}>

                <SubTopNav handleInputChange={handleInputChange} search={search}
                        title={"Category Data Management"} titleLink={"/categories"}
                        searchList={["name", "description"]} sortList={["name", "description"]}
                />
                {/* <form className="form-inline bg-light py-3 px-3">
                    <Link to="/categories" className="mr-auto">
                        <label >Category Data Management</label>
                    </Link>
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
                </form> */}
                
                {(detailedCategory._id) && <DisplayCategory detailedCategory={detailedCategory} />}

                {<AddInfoBar  addInfoTitle={"Add Business"}
                            addInfoSelectorName={"addedBusinessSelector"}
                            addInfoSelectorList={["email", "id"]}
                            addInfoValue={"addedBusinessInfo"}
                            isLoading={isLoading}
                            linkPath={"categories"}
                            handleInputChange={handleInputChange}
                            handleAddClick={handleAddClick}
                    />
                }

                {/* <form className="form-inline py-3 px-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Add Business</span>
                    </div>
                    <select className="form-control mr-1"
                    name="addedBusinessSelector" onChange={handleInputChange}
                    >
                        <option value="id">By ID</option>
                        <option value="email">By Email</option>
                    </select>
                    <input style={{width:"300px"}} className="form-control mr-1" type="text"
                        placeholder="Input Business Info..."
                        name="addedBusinessInfo" onChange={handleInputChange}
                    />
                    <LoadingButton className="btn mr-2" buttonStyle="btn-outline-primary" type="submit" disabled={isLoading}
                        onClick={(event) => addBusinessToCategory(event, addedBusinessSelector, addedBusinessInfo, detailedCategory.id)}
                    >
                        ADD
                    </LoadingButton>
                    <Link  to="/categories" className="ml-auto">
                        <button className="btn btn-secondary">
                            Back to Categories Overview
                        </button>
                    </Link>
                </form> */}
            </BlockUi>
        )
    }
}

function DisplayCategory(props) {
    const {detailedCategory} = props;
    return (

        <Descriptions bordered column={1}
                    title="Category Details">
            <Descriptions.Item label="Name">
                {detailedCategory.name}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
                {detailedCategory.description}
            </Descriptions.Item>
            <Descriptions.Item label="Businesses">
                {detailedCategory.businesses && detailedCategory.businesses.map((item) => {
                    return (
                        <div key={item}>
                            <span>{item}</span>
                        </div>
                        // <div key={item._id}>
                        //     <span>{item.businessName}</span>
                        //     <span>{item.email}</span>
                        // </div>
                )})}
            </Descriptions.Item>
        </Descriptions>

        // <div>
        //     <div>{detailedCategory.name}</div>
        //     <div>{detailedCategory.description}</div>
        //     {detailedCategory.orders && detailedCategory.orders.map((item) => {
        //         return (
        //             <div key={item._id}>
        //                 orders: {item._id}
        //             </div>
        //     )})}
        //     <div>
        //         Businesses: 
        //     </div>
        //     {detailedCategory.businesses && detailedCategory.businesses.map((item) => {
        //         return (
        //             <div key={item._id}>
        //                 <span>{item.businessName}</span>
        //                 <span>{item.email}</span>
        //             </div>
        //     )})}

        // </div>
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
    }
});

export default connect(mapState, mapDispatch)(CategoryDetails)