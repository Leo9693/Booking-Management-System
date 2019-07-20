import BlockUi from 'react-block-ui';
import React from 'react';
import { Link } from 'react-router-dom';

// import Button, { LoadingButton } from '../UI/Button';
import CustomersTable from './CustomerTable';
import { fetchInfo } from '../../api/customer';
import CustomersList from './CustomerList';

export default class InfoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      Info: [],
      isFetching: false
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true, error: null });
    fetchInfo()
      .then(data => {
        this.setState({ Info: data, isFetching: false });
      })
      .catch(error => {
        this.setState({ isFetching: false, error });
      });
  }

  render() {
    return (
      <div>
        <Link to='/customers/edit/NEW' className='btn btn-lg btn-primary '>
          Add new Customer
        </Link>

        <BlockUi blocking={this.state.isFetching}>
          <div className='row' style={{ marginTop: 15 }}>
            {this.state.Info.map((Info, index) => (
              <CustomersTable Info={Info} key={Info._id} />
            ))}
          </div>
        </BlockUi>
      </div>
    );
  }
}
