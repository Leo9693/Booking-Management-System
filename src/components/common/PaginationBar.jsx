import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import { LoadingButton } from './Button.jsx';

export default class PaginationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slectedPage: 1
        }
    }

    componentDidMount = () => {
        this.setState({
            slectedPage: this.props.currentPage,
        })
    }

    handleInputChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        const {
            documentCount = 1,
            currentPage = 1,
            pageSize = 5,
            pageSizeSelectorList = [1, 3, 5, 10, 20],
            pageSizeSelectorName = "pageSize",
            isLoading,
            onSelectPage,
            onSelectPageSize,
        } = this.props;
        const { slectedPage } = this.state;
        const pageCount = Math.ceil(documentCount / pageSize);
        let pages = [];

        pages.push(
            <Pagination.Prev key={0}
                disabled={(currentPage === 1) ? true : false}
                onClick={(event) => onSelectPage(event, currentPage - 1, pageCount)}
            />
        );
        if (pageCount <= 7) {
            for (let i = 1; i <= pageCount; i++) {
                pages.push(
                    <Pagination.Item key={i}
                        onClick={(event) => onSelectPage(event, i, pageCount)}
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
                            onClick={(event) => onSelectPage(event, i, pageCount)}
                            active={(i === currentPage) ? true : false}
                        >
                            {i}
                        </Pagination.Item>
                    );
                }
                pages.push(<Pagination.Ellipsis key={4} disabled />)
                for (let i = (pageCount - 2); i <= pageCount; i++) {
                    pages.push(
                        <Pagination.Item key={i}
                            onClick={(event) => onSelectPage(event, i, pageCount)}
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
                        onClick={(event) => onSelectPage(event, 1, pageCount)}
                        active={(1 === currentPage) ? true : false}
                    >
                        1
                    </Pagination.Item>
                );
                pages.push(<Pagination.Ellipsis key={2} disabled />);
                for (let i = (currentPage - 1); i <= (currentPage + 1); i++) {
                    pages.push(
                        <Pagination.Item key={i}
                            onClick={(event) => onSelectPage(event, i, pageCount)}
                            active={(i === currentPage) ? true : false}
                        >
                            {i}
                        </Pagination.Item>
                    );
                }

                pages.push(<Pagination.Ellipsis key={currentPage + 2} disabled />);
                pages.push(
                    <Pagination.Item key={pageCount}
                        onClick={(event) => onSelectPage(event, pageCount, pageCount)}
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
                            onClick={(event) => onSelectPage(event, i, pageCount)}
                            active={(i === currentPage) ? true : false}
                        >
                            {i}
                        </Pagination.Item>
                    );
                }

                pages.push(<Pagination.Ellipsis key={4} disabled />);
                for (let i = (pageCount - 2); i <= pageCount; i++) {
                    pages.push(
                        <Pagination.Item key={i}
                            onClick={(event) => onSelectPage(event, i, pageCount)}
                            active={(i === currentPage) ? true : false}
                        >
                            {i}
                        </Pagination.Item>
                    );
                }
            }
        }

        pages.push(
            <Pagination.Next key={pageCount + 1}
                disabled={(currentPage === pageCount) ? true : false}
                onClick={(event) => onSelectPage(event, currentPage + 1, pageCount)}
            />
        );

        return (
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-md-12 col-lg-4 offset-lg-1 mr-auto">
                        <Pagination>
                            {pages}
                        </Pagination>
                    </div>
                    <div className="col-md-12 col-lg-3 offset-lg-1">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Items/Page</span>
                            </div>
                            <select
                                className="form-control mr-1"
                                defaultValue={pageSize}
                                name={pageSizeSelectorName}
                                onChange={onSelectPageSize}
                            >
                                {pageSizeSelectorList.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-3">
                        <form className="needs-validation">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Page: </span>
                                </div>
                                <input
                                    type="number"
                                    className="form-control"
                                    max={pageCount} min={1} step={1}
                                    value={slectedPage}
                                    name="slectedPage"
                                    onChange={this.handleInputChange}
                                />
                                <LoadingButton
                                    className="btn btn-outline-primary ml-1"
                                    type="submit"
                                    isLoading={isLoading}
                                    onClick={(event) => onSelectPage(event, parseInt(slectedPage), pageCount)}
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
