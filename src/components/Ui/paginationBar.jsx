import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import { LoadingButton } from '../Ui/Button.jsx'

export default class PaginationBar extends Component {
    render() {
        const {
            documentsCount,
            currentPage = 1,
            pageSize = 5,
            pageSizeSelectorList = [1, 3, 5, 10, 20],
            pageSizeSelectorName = "pageSize",
            setPageInputName = "setPageAs",
            isLoading,
        } = this.props;
        const {onClickSelectPage, onClickSetPage, handleInputChange, onChangePageSize} = this.props;
        const pageCount = Math.ceil(documentsCount / pageSize);
        let pages = [];

        pages.push(
            <Pagination.Prev key={0} 
                disabled={(currentPage === 1) ? true : false}
                onClick={(event) => onClickSelectPage(event, currentPage - 1, pageCount)}
            />
        );
        if (pageCount <= 7) {
            for (let i = 1; i <= pageCount; i++) {
                pages.push(
                    <Pagination.Item key={i} 
                        onClick={(event) => onClickSelectPage(event, i, pageCount)}
                        active={(i === currentPage) ? true : false}
                    >
                        {i}
                    </Pagination.Item>
                );
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i < 4; i++) {
                    pages.push(
                        <Pagination.Item key={i} 
                            onClick={(event) => onClickSelectPage(event, i, pageCount)}
                            active={(i === currentPage) ? true : false}
                        >
                            {i}
                        </Pagination.Item>
                    );
                }
                pages.push(<Pagination.Ellipsis key={4} disabled/> )
                for (let i = (pageCount - 2); i <= pageCount; i++) {
                    pages.push(
                        <Pagination.Item key={i} 
                            onClick={(event) => onClickSelectPage(event, i, pageCount)}
                            active={(i === currentPage) ? true : false}
                        >
                            {i}
                        </Pagination.Item>
                    );
                }
            }

            if (currentPage > 3 && currentPage < (pageCount - 2)) {
                pages.push(
                    <Pagination.Item key={1} 
                        onClick={(event) => onClickSelectPage(event, 1, pageCount)}
                        active={(1 === currentPage) ? true : false}
                    >
                        1
                    </Pagination.Item>
                );
                pages.push(<Pagination.Ellipsis key={2} disabled/>);
                
                for (let i = (currentPage - 1); i <= (currentPage + 1); i++) {
                    pages.push(
                        <Pagination.Item key={i} 
                            onClick={(event) => onClickSelectPage(event, i, pageCount)}
                            active={(i === currentPage) ? true : false}
                        >
                            {i}
                        </Pagination.Item>
                    );
                }

                pages.push(<Pagination.Ellipsis key={currentPage + 2} disabled/>);
                pages.push(
                    <Pagination.Item key={pageCount} 
                        onClick={(event) => onClickSelectPage(event, pageCount, pageCount)}
                        active={(pageCount === currentPage) ? true : false}
                    >
                        {pageCount}
                    </Pagination.Item>
                );
            }

            if (currentPage >= (pageCount - 2)) {
                for (let i = 1; i < 4; i++) {
                    pages.push(
                        <Pagination.Item key={i} 
                            onClick={(event) => onClickSelectPage(event, i, pageCount)}
                            active={(i === currentPage) ? true : false}
                        >
                            {i}
                        </Pagination.Item>
                    );
                }
                pages.push(<Pagination.Ellipsis key={4} disabled/>);
                for (let i = (pageCount - 2); i <= pageCount; i++) {
                    pages.push(
                        <Pagination.Item key={i} 
                            onClick={(event) => onClickSelectPage(event, i, pageCount)}
                            active={(i === currentPage) ? true : false}
                        >
                            {i}
                        </Pagination.Item>
                    );
                }
            }
        }
        
        pages.push(
            <Pagination.Next key={pageCount+1}
                disabled={(currentPage === pageCount) ? true : false}
                onClick={(event) => onClickSelectPage(event, currentPage + 1, pageCount)}
            />
        );

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
                            <select className="form-control mr-1" defaultValue={pageSize}
                                name={pageSizeSelectorName} onChange={onChangePageSize}
                            >
                                {pageSizeSelectorList.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
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
                                        name={setPageInputName} onChange={handleInputChange}/>
                                
                                <LoadingButton className="btn ml-1" buttonStyle="btn-primary"
                                        type="submit" isLoading={isLoading}
                                        onClick={(event) => onClickSetPage(event, pageCount)}
                                >
                                    Go
                                </LoadingButton>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}
