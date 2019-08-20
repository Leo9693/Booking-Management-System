import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BlockUi from 'react-block-ui'
import { actionCreators } from './store';
import CreateModal from './CreateModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import UpdateModal from './UpdateModal';
import { LoadingButton } from '../Ui/Button';
import SubTopBar from '../Ui/SubTopBar';
import PaginationBar from '../Ui/paginationBar';
import { setIsLoading } from './store/actionCreators';
import { ModalTitle } from 'react-bootstrap';
import CategoryList from './CategoryList'
import CreateAndUpdateModal from '../Ui/CreateAndUpdateModal';
import { CREATE, UPDATE, LARGE, SMALL } from '../../utils/constant'

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageRequested: '1',
            pageSize: '5',
            searchValue: '',
            searchField: 'searchAll',
            sortType: 'name',
            sortValue: 1,
            selectedDocumentID: '',
            modalType: CREATE,
            modalTitle: 'Category',
            modalInputList: ['name', 'description'],
            modalInputValue: { name: '', description: '' },
            screenType: LARGE,
        };
    }

    componentDidMount() {
        const searchCondition = this.getSearchCondition();
        this.props.searchByFilter(searchCondition);
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    getSearchCondition() {
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
        const searchCondition = this.getSearchCondition();
        this.props.searchByFilter(searchCondition);
    }

    handleShowCreateModal = event => {
        event.preventDefault();
        this.setState({
            modalType: CREATE,
        });
        this.props.setIsShowModal(true);
    }

    handleHideModal = () => {
        this.props.setIsShowModal(false);
        this.props.setError('');
    }

    handlesubmitModal = event => {
        event.preventDefault();
        const searchCondition = this.getSearchCondition();
        const { modalType, modalInputValue, selectedDocumentID } = this.state;
        if (modalType === CREATE) {
            this.props.addDocument(modalInputValue, searchCondition);
        } else {
            this.props.updateDocument({ ...modalInputValue, id: selectedDocumentID }, searchCondition);
        }
    }

    handleShowUpdateModal = id => {
        const { documentsList } = this.props;
        const selectedDocuments = documentsList.filter(item => item.id == id)
        const { name, description } = selectedDocuments[0];
        this.setState({
            modalType: UPDATE,
            modalInputValue: { name, description },
            selectedDocumentID: id,
        });
        this.props.setIsShowModal(true);
    }

    handleClickDelete = id => {
        const searchCondition = this.getSearchCondition();
        if (window.confirm("Warning: do you want to delete it ?")) {
            this.props.deleteDocument(id, searchCondition);
        }
    }

    handleClickDetails = id => {
        console.log(id);
    }

    render() {
        // const { handleInputChange, handleSearch, handleDetail, handleDelete, handleUpdate, showCreate, selectPage, changePageSize } = this.props;
        // const { documentsList, searchKeyword, searchFilter, isShowUpdateModal, errorInfo, currentPage, pageSize, sortKey, sortValue, isShowCreate, setPageAs, documentCount, isLoading } = this.props;
        const {
            pageRequested,
            pageSize,
            searchValue,
            searchField,
            sortType,
            sortValue,
            modalType,
            modalTitle,
            modalInputList,
            modalInputValue,
            screenType
        } = this.state;

        const {
            isLoading,
            isShowModal,
            errorInfo,
            documentCount,
            documentsList,
        } = this.props;

        // const search = (event) => {
        //     handleSearch(event, searchKeyword, searchFilter, currentPage, pageSize, sortKey, sortValue)
        // };
        // const onClickSelectPage = (event, page, pageCount) => {
        //     event.preventDefault();
        //     selectPage(page, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue);
        // };
        // const onClickSetPage = (event, pageCount) => {
        //     event.preventDefault();
        //     const page = parseInt(setPageAs);
        //     selectPage(page, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue);
        // };
        // const onChangePageSize = (event) => {
        //     changePageSize(event, searchKeyword, searchFilter, currentPage, pageSize, sortKey, sortValue)
        // }
        // const pageSizeSelectorList = [1, 3, 5, 10, 15, 20];

        return (
            <Fragment>
                <BlockUi blocking={isLoading}>
                    <SubTopBar
                        onInputChange={this.handleInputChange}
                        onSearch={this.handleSearch}
                        searchValue={searchValue}
                        isLoading={isLoading}
                        onShowCreateModal={this.handleShowCreateModal}
                        title={"New category"}
                        searchList={["name", "description"]}
                        sortList={["name", "description"]}
                    />
                </BlockUi>
                <CreateAndUpdateModal
                    isShow={isShowModal}
                    type={modalType}
                    title={modalTitle}
                    inputList={modalInputList}
                    inputValue={modalInputValue}
                    errorInfo={errorInfo}
                    onInputChange={this.handleModalInputChange}
                    onCancel={this.handleHideModal}
                    onSubmit={this.handlesubmitModal}
                />
                {errorInfo && <div style={{ color: "red" }}>Warning: {errorInfo.response.data}</div>}

                {documentsList &&
                    <div className="mx-2 mt-5">
                        <CategoryList
                            screenType={screenType}
                            documentsList={documentsList}
                            onClickDetail={this.handleClickDetails}
                            onClickUpdate={this.handleShowUpdateModal}
                            onClickDelete={this.handleClickDelete}
                        />
                        <div className="mt-5">
                            {/* <PaginationBar documentCount={documentCount}
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
                            /> */}
                        </div>
                    </div>

                }
            </Fragment>
        )
    }
}

const mapState = state => ({
    documentCount: state.category.documentCount,
    documentsList: state.category.documentsList,
    isLoading: state.category.isLoading,
    isShowModal: state.category.isShowModal,
    errorInfo: state.category.errorInfo,
    // isShowCreate: state.category.isShowCreate,
    // isShowUpdateModal: state.category.isShowUpdateModal,

    // isShowCreate: state.category.isShowCreate,
    // setPageAs: state.category.setPageAs,

});

const mapDispatch = dispatch => ({
    // handleInputChange: (event) => {
    //     event.preventDefault();
    //     dispatch(actionCreators.setError(''));
    //     const { name, value } = event.target
    //     dispatch(actionCreators.handleInputChange(name, value));
    // },

    // handleSearch: (event, searchKeyword, searchFilter, currentPage, pageSize, sortKey, sortValue) => {
    //     event.preventDefault();
    //     dispatch(actionCreators.setError(''));
    //     dispatch(actionCreators.handleSearchByFilter(searchFilter, searchKeyword, currentPage, pageSize, sortKey, sortValue));
    // },

    // initializeData: (searchFilter, searchKeyword, currentPage, pageSize, sortKey, sortValue) => {
    //     dispatch(actionCreators.handleInputChange('pageSize', 5))
    //     dispatch(actionCreators.selectPage(1));
    //     dispatch(actionCreators.handleSearchByFilter());
    // },

    // showCreate: (event) => {
    //     console.log('showCreate, showCreate, showCreate, showCreate,showCreate ')
    //     event.preventDefault();
    //     dispatch(actionCreators.showCreate());
    // },

    // handleDetail: (id) => {
    //     console.log(id);
    // },

    // handleUpdate: (id) => {
    //     dispatch(actionCreators.setSelectedCategoryID(id));
    //     dispatch(actionCreators.showUpdateModal(true));
    // },

    // handleDelete: (id) => {
    //     dispatch(actionCreators.setSelectedCategoryID(id));
    //     dispatch(actionCreators.setDeleteConfirm(true));
    // },

    // selectPage: (page, pageCount, searchFilter, searchKeyword, pageSize, sortKey, sortValue) => {
    //     if (page < 1 || page > pageCount) {
    //         return;
    //     }
    //     dispatch(actionCreators.setIsLoading(true));
    //     dispatch(actionCreators.selectPage(page));
    //     dispatch(actionCreators.handleSearchByFilter(searchFilter, searchKeyword, page, pageSize, sortKey, sortValue));
    // },

    // changePageSize: (event, searchKeyword, searchFilter, currentPage, pageSize, sortKey, sortValue) => {
    //     const { name, value } = event.target
    //     dispatch(actionCreators.handleInputChange(name, value));
    //     pageSize = value;
    //     dispatch(actionCreators.handleSearchByFilter(searchFilter, searchKeyword, currentPage, pageSize, sortKey, sortValue));
    // },

    searchByFilter: searchCondition => {
        dispatch(actionCreators.searchByFilter(searchCondition));
    },

    setIsShowModal: isShowModal => {
        dispatch(actionCreators.setIsShowModal(isShowModal));
    },

    setError: errorInfo => {
        dispatch(actionCreators.setError(errorInfo));
    },

    addDocument: (document, searchCondition) => {
        dispatch(actionCreators.addDocument(document, searchCondition));
    },

    updateDocument: (document, searchCondition) => {
        dispatch(actionCreators.updateDocument(document, searchCondition));
    },

    deleteDocument: (id, searchCondition) => {
        dispatch(actionCreators.deleteDocument(id, searchCondition));
    },
});

export default connect(mapState, mapDispatch)(Category);