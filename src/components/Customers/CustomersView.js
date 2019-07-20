import BlockUi from 'react-block-ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { getCustomerByFilter } from '../../api/customer';
import CustomersList from './CustomerList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faInfo, faAd } from '@fortawesome/free-solid-svg-icons';
import SubTopNav from '../Ui/subTopNav';
import PaginationBar from '../Ui/paginationBar';

export default class InfoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      Info: [],
      isFetching: false,
      searchKeyword: '',
      searchFilter: 'searchAll',
      sortKey: 'customerName',
      documentsCount: '',
      currentPage: 1,
      pageSize: 5,
      setPageAs: null
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true, error: null });
    getCustomerByFilter()
      .then(data => {
        this.setState({
          Info: data.customers,
          documentsCount: data.customerCount,
          isFetching: false
        });
      })
      .catch(error => {
        this.setState({ isFetching: false, error });
      });
  }

  search = e => {
    e.preventDefault();
    this.setState({ isFetching: true, error: null });
    const { searchFilter, searchKeyword, sortKey } = this.state;
    getCustomerByFilter(searchFilter, searchKeyword, sortKey)
      .then(data => {
        this.setState({
          Info: data.customers,
          documentsCount: data.customerCount,
          isFetching: false
        });
      })
      .catch(error => {
        this.setState({ isFetching: false, error });
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onClickSelectPage = (event, page, pageCount) => {
    event.preventDefault();
    this.setState({ isFetching: true, error: null });
    const { searchFilter, searchKeyword, sortKey, pageSize } = this.state;
    getCustomerByFilter(searchFilter, searchKeyword, sortKey, page, pageSize)
      .then(data => {
        this.setState({
          Info: data.customers,
          documentsCount: data.customerCount,
          currentPage: page,
          isFetching: false
        });
      })
      .catch(error => {
        this.setState({ isFetching: false, error });
      });
  };

  onClickSetPage = (event, pageCount) => {
    const setPageAs = this.state.setPageAs;
    event.preventDefault();
    if (setPageAs < 1 || setPageAs > pageCount) {
      return;
    }
    this.setState({ isFetching: true, error: null });
    const { searchFilter, searchKeyword, sortKey, pageSize } = this.state;
    getCustomerByFilter(
      searchFilter,
      searchKeyword,
      sortKey,
      setPageAs,
      pageSize
    )
      .then(data => {
        this.setState({
          Info: data.customers,
          documentsCount: data.customerCount,
          currentPage: setPageAs,
          isFetching: false
        });
      })
      .catch(error => {
        this.setState({ isFetching: false, error });
      });
  };

  onChangePageSize = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    this.setState({ isFetching: true, error: null });
    let { searchFilter, searchKeyword, sortKey, currentPage } = this.state;
    currentPage = 1;
    getCustomerByFilter(
      searchFilter,
      searchKeyword,
      sortKey,
      currentPage,
      value
    )
      .then(data => {
        this.setState({
          Info: data.customers,
          documentsCount: data.customerCount,
          isFetching: false
        });
      })
      .catch(error => {
        this.setState({ isFetching: false, error });
      });
  };

  handleUpdate(id) {
    this.props.history.push(`/customers/edit/${id}`);
  }

  render() {
    const Info = this.state.Info;
    const { documentsCount, currentPage, pageSize } = this.state;
    const pageSizeSelectorList = [1, 3, 5, 10, 15, 20];
    return (
      <div>
        <Link to='/customers/edit/NEW' className='btn btn-lg btn-primary '>
          Add new Customer
        </Link>

        <BlockUi blocking={this.state.isFetching}>
          <SubTopNav
            handleInputChange={this.handleInputChange}
            search={this.search}
            // isLoading={isLoading}
            title={'Customer Data Management'}
            titleLink={'/customers'}
            searchList={['customerName', 'email', 'preferName']}
            sortList={['customerName', 'email', 'preferName']}
          />
          <div>
            {/*  {this.state.Info.map((Info, index) => ( <CustomersTable Info={Info} key={Info._id} /> ))} */}

            {Info && (
              <div className='mx-5 mt-5'>
                <table className='my-3 table'>
                  <thead>
                    <tr className='row'>
                      <th className='col-2'>CustomerName</th>
                      <th className='col-3'>PreferName</th>
                      <th className='col-4'>Email</th>

                      <th className='col-3'>Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Info.map(item => (
                      <tr key={item._id} className='row'>
                        <td className='col-2'>{item.customerName}</td>
                        <td className='col-3'>{item.preferName}</td>
                        <td className='col-4'>{item.email}</td>
                        <td className='col-3'>
                          {console.log(item._id)}
                          <Link to={`/categories/${item._id}`}>
                            <button
                              type='button'
                              className='btn btn-info btn-sm mr-4 px-1'
                              style={{ width: '30px' }}
                              data-toggle='tooltip'
                              data-placement='top'
                              title='Details'
                            >
                              <FontAwesomeIcon
                                icon={faAd}
                                // onClick={() => handleDetail(item._id)}
                              />
                              {/* <i className="fas fa-info text-light px-1" */}
                              {/* onClick={() => handleDetail(item._id)} */}
                              {/* /> */}
                            </button>
                          </Link>
                          <button
                            type='button'
                            className='btn btn-warning btn-sm mr-4'
                            style={{ width: '30px' }}
                            onClick={() => this.handleUpdate(item._id)}
                            data-toggle='tooltip'
                            data-placement='top'
                            title='Edit'
                          >
                            <FontAwesomeIcon icon={faEdit} />
                            {/* <i className="far fa-edit text-light"/> */}
                          </button>
                          <button
                            type='button'
                            className='btn btn-danger btn-sm mr-4'
                            style={{ width: '30px' }}
                            // onClick={() => handleDelete(item._id)}
                            data-toggle='tooltip'
                            data-placement='top'
                            title='Delete'
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                            <i className='far fa-trash-alt text-light' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className='mt-5'>
            <PaginationBar
              documentsCount={documentsCount}
              currentPage={currentPage}
              pageSize={pageSize}
              pageSizeSelectorList={pageSizeSelectorList}
              pageSizeSelectorName={'pageSize'}
              setPageInputName={'setPageAs'}
              onClickSelectPage={this.onClickSelectPage}
              onClickSetPage={this.onClickSetPage}
              handleInputChange={this.handleInputChange}
              onChangePageSize={this.onChangePageSize}
            />
          </div>
        </BlockUi>
      </div>
    );
  }
}
