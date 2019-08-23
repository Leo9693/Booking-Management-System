import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BlockUi from 'react-block-ui'
import { actionCreators } from './store';
import SubTopBar from '../common/SubTopBar';
import PaginationBar from '../common/PaginationBar';
import CategoryList from './CategoryList'
import CreateAndUpdateModal from '../common/CreateAndUpdateModal';
import { CREATE, UPDATE, LARGE, SMALL } from '../../utils/constant'

class Category extends Component {
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
            modalTitle: 'Category',
            modalInputList: ['name', 'description'],
            modalInputValue: { name: '', description: '' },
            screenType: LARGE,
        };
    }

    componentDidMount = () => {
        const searchCondition = this.getSearchCondition();
        this.props.searchByFilterAsync(searchCondition);
        window.addEventListener('resize', this.handleResize);
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
        const searchCondition = this.getSearchCondition();
        this.props.searchByFilterAsync(searchCondition);
    }

    handleShowCreateModal = event => {
        event.preventDefault();
        this.setState({
            modalType: CREATE,
            modalInputValue: { name: '', description: '' },
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
                        onShowCreate={this.handleShowCreateModal}
                        title={"New Category"}
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
                    onSubmit={this.handleSubmitModal}
                />
                {errorInfo && <div style={{ color: "red" }}>Warning: {errorInfo.response.data}</div>}

                {documentsList &&
                    <div className="mx-2 mt-5">
                        <CategoryList
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

    // selectPage: (pageSelected, searchCondition) => {
    //     dispatch(actionCreators.selectPage(pageSelected, searchCondition));
    // }
});

export default connect(mapState, mapDispatch)(Category);