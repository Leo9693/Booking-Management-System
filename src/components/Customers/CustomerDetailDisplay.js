import React from 'react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchOrderById } from '../../api/order';
import { fetchInfoById } from '../../api/customer';

class InfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      Info: [],
      orderIds: [],
      isFetching: false,
      searchKeyword: '',
      searchFilter: 'searchAll',
      sortKey: 'customerName',
      documentsCount: '',
      currentPage: 1,
      pageSize: 5,
      setPageAs: 1
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ isFetching: true });
    fetchInfoById(id)
      .then(Info => this.setState({ isFetching: false, Info }))
      .catch(error => this.setState({ isFetching: false, error: error }));

    const Info = this.state.Info;
    this.setState({ orderIds: Info.orders });
  }

  handleUpdate(id) {
    this.props.history.push(`/orders/management/${id}`);
  }
  render() {
    const Info = this.state.Info;
    return (
      <div className='jr-detail_container'>
        <div className='jr-detail_cover'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='jr-detail_cover_title_block'>
                <h2>{`${Info.customerName} `}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className='jr-detail_content'>
          <div className='row'>
            <div className='col-sm-6'>
              <ul className='jr-detail_content_list'>
                <li>
                  <span className='item_label'>
                    PreferName:{`${Info.preferName}`}
                  </span>
                </li>
                <li>
                  <span className='item_label'>email:</span>
                  <span className='item_value'>{Info.email}</span>
                </li>
                <li>
                  <span className='item_label'>phone:</span>
                  <span className='item_value'>{Info.phone}</span>
                </li>
                {Info.orders && (
                  <li>
                    <span className='item_label'>Order(s)</span>
                    <div>
                      {Info.orders && (
                        <div className='mx-5 mt-5'>
                          <table className='my-3 table'>
                            <thead>
                              <tr className='row'>
                                <th className='col-10'>Order Details</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Info.orders.map(item => (
                                <tr key={item._id} className='row'>
                                  <td
                                    onClick={() => this.handleUpdate(item)}
                                    className='col-10'
                                  >
                                    [Order Details]
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </li>
                )}
                {/* <li>
                <span className="item_label">End at</span>
                <span className="item_value">{}</span>
              </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(InfoView);
