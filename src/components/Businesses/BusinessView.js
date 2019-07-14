import React from 'react';
import { Link } from 'react-router-dom';
import BlockUi from 'react-block-ui';

import BusinessCard from './BusinessCard';
import { fetchBusinesses } from '../../api/business';


export default class BusinessView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      businesses: [],
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true, error: null});
    fetchBusinesses()
      .then(data => {
        this.setState({ businesses: data, isFetching: false });
      })
      .catch(error => {
        this.setState({ isFetching: false, error});
      });
  }

  render() {
    return (
      <div>
        <Link to="/businesses/edit/NEW" className="btn btn-lg btn-primary ">
          Add new business
        </Link>
        <BlockUi blocking={this.state.isFetching}>
          <div className="row" style={{ marginTop: 15 }}>
              {this.state.businesses.map((business, index) => <BusinessCard business={business} key={business._id} />)}
          </div>
        </BlockUi>
      </div>

    );
  }
}
