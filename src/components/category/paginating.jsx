import React, {Component} from 'react';
import {Pagination, DropdownButton, Dropdown, Button, Col, Form, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import { actionCreators } from './store';

class Paginating extends Component {

    render() {
        const {documentsCount, currentPage, pageSize, searchFilter, searchKeyword, setPageAs, sortKey, sortValue} = this.props;
        const {selectPage, setPage, handleInputChange, changePageSize} = this.props;
        const pageCount = Math.ceil(documentsCount / pageSize);
        
        let pages = [];

        console.log(pages);
        console.log(currentPage);
        pages.push(<Pagination.Prev key={0} 
                    disabled={(currentPage === 1) ? true : false}
                    onClick={() => selectPage(currentPage - 1, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue)}
                    />);
        if (pageCount <= 7) {
            for (let i = 1; i <= pageCount; i++) {
                pages.push(<Pagination.Item key={i} 
                            onClick={() => selectPage(i, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue)}
                            active={(i === currentPage) ? true : false}
                            >
                            {i}
                            </Pagination.Item>)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i < 4; i++) {
                    pages.push(<Pagination.Item key={i} 
                                onClick={() => selectPage(i, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue)}
                                active={(i === currentPage) ? true : false}
                                >
                                {i}
                                </Pagination.Item>)
                }
                pages.push(<Pagination.Ellipsis key={4} disabled/> )
                for (let i = (pageCount - 2); i <= pageCount; i++) {
                    pages.push(<Pagination.Item key={i} 
                        onClick={() => selectPage(i, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue)}
                        active={(i === currentPage) ? true : false}
                        >
                        {i}
                        </Pagination.Item>)
                }
            }

            if (currentPage > 3 && currentPage < (pageCount - 2)) {
                pages.push(<Pagination.Item key={1} 
                            onClick={() => selectPage(1, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue)}
                            active={(1 === currentPage) ? true : false}
                            >
                            1
                            </Pagination.Item>)
                pages.push(<Pagination.Ellipsis key={2} disabled/> )
                
                for (let i = (currentPage - 1); i <= (currentPage + 1); i++) {
                    pages.push(<Pagination.Item key={i} 
                                onClick={() => selectPage(i, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue)}
                                active={(i === currentPage) ? true : false}
                                >
                                {i}
                                </Pagination.Item>)
                }

                pages.push(<Pagination.Ellipsis key={currentPage + 2} disabled/> )
                pages.push(<Pagination.Item key={pageCount} 
                    onClick={() => selectPage(pageCount, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue)}
                    active={(pageCount === currentPage) ? true : false}
                    >
                    {pageCount}
                    </Pagination.Item>)
                
            }

            if (currentPage >= (pageCount - 2)) {
                for (let i = 1; i < 4; i++) {
                    pages.push(<Pagination.Item key={i} 
                                onClick={() => selectPage(i, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue)}
                                active={(i === currentPage) ? true : false}
                                >
                                {i}
                                </Pagination.Item>)
                }
                pages.push(<Pagination.Ellipsis key={4} disabled/> )
                for (let i = (pageCount - 2); i <= pageCount; i++) {
                    pages.push(<Pagination.Item key={i} 
                        onClick={() => selectPage(i, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue)}
                        active={(i === currentPage) ? true : false}
                        >
                        {i}
                        </Pagination.Item>)
                }
            }
        }
        
        pages.push(<Pagination.Next key={pageCount+1}
                    disabled={(currentPage === pageCount) ? true : false}
                    onClick={() => selectPage(currentPage + 1, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue)}
                    />);

        return (   
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-3 offset-2">
                        <Pagination>
                            {pages}
                        </Pagination>                  
                    </div> 
                    <div className="col-3 offset-1">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Items/Page</span>
                            </div>
                            <select className="form-control mr-1" defaultValue={5}
                                name="pageSize" onChange={(event) => changePageSize(event, searchKeyword, searchFilter, currentPage, pageSize, sortKey, sortValue)}
                            >
                                <option value="1">1</option>
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                    </div>                  
                    <div className="col-3">
                        <form className="needs-validation">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Page: </span>
                                </div>
                                <input type="number" className="form-control"
                                        max={pageCount} min="1" step="1" 
                                        name="setPageAs" onChange={handleInputChange}/>
                                
                                <button className="btn btn-primary ml-1" type="submit"
                                        onClick={(event) => setPage(event, setPageAs, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue)}
                                >
                                    Go
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}

const mapState = (state) => ({
    documentsCount: state.category.documentsCount,
    currentPage: state.category.currentPage,
    pageSize: state.category.pageSize,
    searchFilter: state.category.searchFilter, 
    searchKeyword: state.category.searchKeyword,
    setPageAs: state.category.setPageAs,
    sortKey: state.category.sortKey,
    sortValue: state.category.sortValue,
})

const mapDispatch = (dispatch) => ({
    selectPage: (page, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue) => {
        if (page < 1 || page > pageCount) {
            return;
        }
        dispatch(actionCreators.selectPage(page));
        dispatch(actionCreators.handleSearchByFilter(searchFilter, searchKeyword, page, pageSize, sortKey, sortValue));
    },

    handleInputChange: (event) => {
        dispatch(actionCreators.setError(''));
        const {name, value} = event.target;
        dispatch(actionCreators.handleInputChange(name, value));
    },

    setPage: (event, setPageAs, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue) => {
        event.preventDefault();
        const page = parseInt(setPageAs);
        if (page > pageCount || page < 1) return;
        dispatch(actionCreators.selectPage(page));
        dispatch(actionCreators.handleSearchByFilter(searchFilter, searchKeyword, page, pageSize, sortKey, sortValue));
    },
    // setPage: (event, pageCount, searchFilter, searchKeyword, pageSize) => {
    //     const page = event.target.value;
    //     console.log(page);
    //     if (page < 1 || page > pageCount) {
    //         return;
    //     }
    //     dispatch(actionCreators.selectPage(page));
    //     // dispatch(actionCreators.handleSearchByFilter(searchFilter, searchKeyword, page, pageSize));
    // },

    changePageSize: (event, searchKeyword, searchFilter, currentPage, pageSize, sortKey, sortValue) => {
        const {name, value} = event.target
        dispatch(actionCreators.handleInputChange(name, value));
        pageSize = value;
        dispatch(actionCreators.handleSearchByFilter(searchFilter, searchKeyword, currentPage, pageSize, sortKey, sortValue));
    }
});
export default connect(mapState, mapDispatch)(Paginating);

