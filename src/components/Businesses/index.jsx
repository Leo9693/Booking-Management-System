import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import BlockUi from 'react-block-ui';
import { actionCreators } from './store';
import SubTopBar from '../common/SubTopBar';
import PaginationBar from '../common/PaginationBar';
import BusinessList from './BusinessList';
import CreateAndUpdateModal from '../common/CreateAndUpdateModal';
import {
    CREATE, UPDATE, LARGE, SMALL,
    BUSINESS_MODAL_INPUT_LIST, BUSINESS_SEARCH_LIST, BUSINESS_SORT_LIST
} from '../../utils/constant'

class Business extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageRequested: 1,
            pageSize: 5,
            searchValue: '',
            searchField: 'searchAll',
            sortType: 'name',
            sortValue: 1,
            selectedDocumentID: '',
            modalType: CREATE,
            modalTitle: 'Business',
            modalInputList: BUSINESS_MODAL_INPUT_LIST,
            modalInputValue: {
                name: '',
                ABN: '',
                email: '',
                phone: '',
                streetAddress: '',
                postcode: '',
            },
            screenType: LARGE,
        };
    }

    componentDidMount = () => {
        const searchCondition = this.getSearchCondition();
        this.props.searchByFilterAsync(searchCondition);
        window.addEventListener('resize', this.handleResize);
        if (window.innerWidth < 576) {
            this.setState({
                screenType: SMALL
            })
        }
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleResize);
    }

    getSearchCondition = () => {
        const { searchField, searchValue, pageRequested, pageSize, sortType, sortValue } = this.state;
        const searchCondition = { searchField, searchValue, pageRequested, pageSize, sortType, sortValue };
        return searchCondition;
    }

    handleResize = event => {
        if (event.target.innerWidth >= 576) {
            this.setState({
                screenType: LARGE
            })
        } else {
            this.setState({
                screenType: SMALL
            })
        }
    }

    handleInputChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleModalInputChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({
            modalInputValue: { ...this.state.modalInputValue, [name]: value }
        })
    }

    handleSearch = event => {
        event.preventDefault();
        this.setState({
            pageRequested: 1
        });
        const searchCondition = this.getSearchCondition();
        searchCondition.pageRequested = 1;
        this.props.searchByFilterAsync(searchCondition);
    }

    handleShowCreateModal = event => {
        event.preventDefault();
        this.setState({
            modalType: CREATE,
            modalInputValue: {
                name: '',
                ABN: '',
                email: '',
                phone: '',
                streetAddress: '',
                postcode: '',
            },
        });
        this.props.setIsShowModal(true);
    }

    handleHideModal = () => {
        this.props.setIsShowModal(false);
        this.props.setError('');
    }

    handleSubmitModal = event => {
        event.preventDefault();
        const searchCondition = this.getSearchCondition();
        const { modalType, modalInputValue, selectedDocumentID } = this.state;
        if (modalType === CREATE) {
            this.props.addDocumentAsync(modalInputValue, searchCondition);
        } else {
            this.props.updateDocumentAsync({ ...modalInputValue, id: selectedDocumentID }, searchCondition);
        }
    }

    handleShowUpdateModal = id => {
        const { documentsList } = this.props;
        const selectedDocuments = documentsList.filter(item => item.id === id)
        const { name, ABN, email, phone, streetAddress, postcode } = selectedDocuments[0];
        this.setState({
            modalType: UPDATE,
            modalInputValue: { name, ABN, email, phone, streetAddress, postcode },
            selectedDocumentID: id,
        });
        this.props.setIsShowModal(true);
    }

    handleClickDelete = id => {
        const searchCondition = this.getSearchCondition();
        if (window.confirm("Warning: do you want to delete it ?")) {
            this.setState({
                pageRequested: 1
            });
            searchCondition.pageRequested = 1;
            this.props.deleteDocumentAsync(id, searchCondition);
        }
    }

    handleClickDetails = id => {
        console.log(id);
    }

    handleSelectPage = (event, pageSelected, pageCount) => {
        event.preventDefault();
        if (pageSelected > 0 && pageSelected < pageCount + 1) {
            this.setState({
                pageRequested: pageSelected
            })
            const searchCondition = this.getSearchCondition();
            searchCondition.pageRequested = pageSelected;
            this.props.searchByFilterAsync(searchCondition);
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
        this.props.searchByFilterAsync(searchCondition);
    }

    render() {
        const {
            searchField,
            searchValue,
            pageRequested,
            pageSize,
            modalType,
            modalTitle,
            modalInputList,
            modalInputValue,
            screenType
        } = this.state;
        const { isLoading, isShowModal, errorInfo, documentCount, documentsList } = this.props;

        return (
            <Fragment>
                <BlockUi blocking={isLoading}>
                    <SubTopBar
                        onInputChange={this.handleInputChange}
                        onSearch={this.handleSearch}
                        searchValue={searchValue}
                        isLoading={isLoading}
                        onShowCreate={this.handleShowCreateModal}
                        title={"New Business"}
                        searchList={BUSINESS_SEARCH_LIST}
                        sortList={BUSINESS_SORT_LIST}
                    />
                    <CreateAndUpdateModal
                        isShow={isShowModal}
                        type={modalType}
                        title={modalTitle}
                        inputList={modalInputList}
                        inputValue={modalInputValue}
                        errorInfo={errorInfo}
                        onInputChange={this.handleModalInputChange}
                        onCancel={this.handleHideModal}
                        onSubmit={this.handleSubmitModal}
                    />
                    {errorInfo && <div style={{ color: "red" }}>Warning: {errorInfo.response.data}</div>}
                    {documentsList &&
                        <div className="mx-2 mt-5">
                            <BusinessList
                                screenType={screenType}
                                searchField={searchField}
                                documentsList={documentsList}
                                onClickDetail={this.handleClickDetails}
                                onClickUpdate={this.handleShowUpdateModal}
                                onClickDelete={this.handleClickDelete}
                            />
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
                        </div>
                    }
                </BlockUi>
            </Fragment>
        )
    }
}

const mapState = state => ({
    documentCount: state.business.documentCount,
    documentsList: state.business.documentsList,
    isLoading: state.business.isLoading,
    isShowModal: state.business.isShowModal,
    errorInfo: state.business.errorInfo,
});

const mapDispatch = dispatch => ({
    searchByFilterAsync: searchCondition => {
        dispatch(actionCreators.searchByFilterAsync(searchCondition));
    },

    setIsShowModal: isShowModal => {
        dispatch(actionCreators.setIsShowModal(isShowModal));
    },

    setError: errorInfo => {
        dispatch(actionCreators.setError(errorInfo));
    },

    addDocumentAsync: (document, searchCondition) => {
        dispatch(actionCreators.addDocumentAsync(document, searchCondition));
    },

    updateDocumentAsync: (document, searchCondition) => {
        dispatch(actionCreators.updateDocumentAsync(document, searchCondition));
    },

    deleteDocumentAsync: (id, searchCondition) => {
        dispatch(actionCreators.deleteDocumentAsync(id, searchCondition));
    },
});

export default connect(mapState, mapDispatch)(Business);