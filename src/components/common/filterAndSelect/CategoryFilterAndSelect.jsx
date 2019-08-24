import React, { Component } from 'react';
import BlockUi from 'react-block-ui';
import PaginationBar from '../PaginationBar';
import SearchBar from '../SearchBar';
import { SEARCH_ALL, CATEGORY_SEARCH_LIST } from '../../../utils/constant'
import { getDocumentsByFilter as getDocumentsByFilterAsync } from '../../../api/categories';
import { LARGE } from '../../../utils/constant';
import ErrorAlert from '../ErrorAlert';

const searchList = CATEGORY_SEARCH_LIST;

export default class CategoryFilterAndSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documentsList: [],
            documentCount: 0,
            searchValue: '',
            searchField: SEARCH_ALL,
            pageRequested: 1,
            pageSize: 10,
            isLoading: false,
            error: null,
        };
    }

    componentDidMount() {
        const searchCondition = this.getSearchCondition();
        this.getDocumentsAsync(searchCondition);
    }

    getSearchCondition = () => {
        const { searchField, searchValue, pageRequested, pageSize } = this.state;
        const searchCondition = { searchField, searchValue, pageRequested, pageSize };
        return searchCondition;
    }

    getDocumentsAsync = searchCondition => {
        this.setState({
            isLoading: true,
            error: null,
        })
        getDocumentsByFilterAsync(searchCondition)
            .then(res => {
                this.setState({
                    documentsList: res.documents,
                    documentCount: res.documentCount,
                    isLoading: false,
                })
            })
            .catch(err => {
                this.setState({
                    error: err,
                    isLoading: false,
                })
            })
    }

    handleInputChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            error: null,
        })
    }

    handleSearch = event => {
        event.preventDefault();
        this.setState({
            pageRequested: 1
        });
        const searchCondition = this.getSearchCondition();
        searchCondition.pageRequested = 1;
        this.getDocumentsAsync(searchCondition);
    }

    selectDocument = event => {
        const { value } = event.target;
        const selectedDocument = this.state.documentsList.filter(item => item.id === value);
        this.props.getSelectedDocument(selectedDocument[0]);
    }

    handleSelectPage = (event, pageSelected, pageCount) => {
        event.preventDefault();
        if (pageSelected > 0 && pageSelected < pageCount + 1) {
            this.setState({
                pageRequested: pageSelected
            })
            const searchCondition = this.getSearchCondition();
            searchCondition.pageRequested = pageSelected;
            this.getDocumentsAsync(searchCondition);
        }
    }

    handleSelectPageSize = event => {
        const { value } = event.target;
        const selectedPageSize = parseInt(value);
        this.setState({
            pageSize: selectedPageSize,
            pageRequested: 1
        })
        const searchCondition = this.getSearchCondition();
        searchCondition.pageSize = selectedPageSize;
        searchCondition.pageRequested = 1;
        this.getDocumentsAsync(searchCondition);
    }

    render() {
        const { searchValue, isLoading, searchField, error, documentsList, documentCount, pageRequested, pageSize } = this.state;
        const isLargeScreen = (this.props.screenType === LARGE);

        return (
            <BlockUi blocking={isLoading}>
                {error && (
                    <ErrorAlert
                        description={error}
                        onClose={() => this.setState({ error: null })}
                    />
                )}
                <SearchBar
                    searchList={searchList}
                    isLoading={isLoading}
                    searchValue={searchValue}
                    onSearch={this.handleSearch}
                    onInputChange={this.handleInputChange}
                />
                <table className="my-3 ml-3 table">
                    <thead className="text-center">
                        <tr className="row">
                            <th className="col-1"></th>
                            <th className="col-5 col-sm-3">Service</th>
                            {(isLargeScreen || searchField === 'description')
                                && <th className="col-6 col-sm-8">Description</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {documentsList.map((item, index) => (
                            <tr key={item._id} className="row">
                                <td className="col-1">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="selectDocument"
                                            id={index}
                                            value={item.id}
                                            onClick={this.selectDocument} />
                                    </div>
                                </td>
                                <td className="col-5 col-sm-3">{item.name}</td>
                                {(isLargeScreen || searchField === 'description')
                                    && <td className="col-6 col-sm-8">{item.description}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-5">
                    <PaginationBar
                        documentCount={documentCount}
                        currentPage={pageRequested}
                        pageSize={pageSize}
                        pageSizeSelectorList={[1, 3, 5, 10, 20]}
                        pageSizeSelectorName="pageSize"
                        isLoading={isLoading}
                        onSelectPage={this.handleSelectPage}
                        onSelectPageSize={this.handleSelectPageSize}
                    />
                </div>
            </BlockUi>
        );
    }
}
