import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import BlockUi from 'react-block-ui'
import { actionCreators } from './store';
import SubTopBar from '../common/SubTopBar';
import PaginationBar from '../common/PaginationBar';
import OrderTable from './OrderTable';
import CreateAndUpdateModal from '../common/CreateAndUpdateModal';
import {
    CREATE, UPDATE, LARGE, SMALL, SEARCH_ALL,
    ORDER_MODAL_INPUT_LIST, ORDER_SEARCH_LIST, ORDER_SORT_LIST
} from '../../utils/constant';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageRequested: 1,
            pageSize: 5,
            searchValue: '',
            searchField: SEARCH_ALL,
            sortType: 'jobEstimatedTime',
            sortValue: 1,
            selectedDocumentID: '',
            modalType: UPDATE,
            modalTitle: 'Order',
            modalInputList: ORDER_MODAL_INPUT_LIST,
            modalInputValue: {
                customer: '',
                business: '',
                category: '',
                jobLocation: '',
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
        this.props.history.push('/orders/create')
    }

    handleShowUpdateModal = id => {
        const { documentsList } = this.props;
        const selectedDocuments = documentsList.filter(item => item.id === id)
        const { customer, business, category, jobLocation } = selectedDocuments[0];
        this.setState({
            modalType: UPDATE,
            modalInputValue: { customer, business, category, jobLocation },
            selectedDocumentID: id,
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
            screenType,
            modalType,
            modalTitle,
            modalInputList,
            modalInputValue
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
                        title={"New Order"}
                        searchList={ORDER_SEARCH_LIST}
                        sortList={ORDER_SORT_LIST}
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
                            <OrderTable
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
    documentCount: state.order.documentCount,
    documentsList: state.order.documentsList,
    isLoading: state.order.isLoading,
    isShowModal: state.order.isShowModal,
    errorInfo: state.order.errorInfo,
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

export default connect(mapState, mapDispatch)(Order);