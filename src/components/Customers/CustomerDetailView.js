import BlockUi from 'react-block-ui';
import React, { Component } from 'react';

import Button from '../Ui/Button';

import CustomerDetailDisplay from './CustomerDetailDisplay';
import { fetchInfoById, deleteInfo } from '../../api/customer';

class InfoDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSaving: false,
      notFound: false,
      error: null,
      Info: {}
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ isLoading: true });
    fetchInfoById(id)
      .then(Info => this.setState({ isLoading: false, Info, error: null }))
      .catch(error => this.setState({ isLoading: false, error: error }));
  }

  handleEdit = event => {
    const { Info } = this.state;
    // this.props.history.push({ pathname: `/customers/booking/${Info._id}` });
    this.props.history.push({ pathname: `/orders/management/edit/new` });
  };

  handleBack = event => {
    const { Info } = this.state;
    // this.props.history.push({ pathname: `/customers/booking/${Info._id}` });
    this.props.history.push({ pathname: `/customers` });
  };

  handleDelete = event => {
    if (window.confirm('Do you wang to delete this info?')) {
      const { id } = this.props.match.params;
      this.setState({ isLoading: false });
      deleteInfo(id)
        .then(response => {
          this.setState({ isLoading: false });
          this.props.history.replace('/customers');
        })
        .catch(error => {
          this.setState({ isLoading: false, error });
        });
    }
  };

  render() {
    const { isLoading, Info } = this.state;
    return (
      <BlockUi blocking={this.state.isLoading}>
        <div>
          <CustomerDetailDisplay Info={this.state.Info} />
          <div style={{ justifyContent: 'center' }}>
            <Button primary className={'btn-group'} onClick={this.handleBack}>
              Back
            </Button>
            {'  '}
            <Button primary className={'btn-group'} onClick={this.handleEdit}>
              Booking
            </Button>
            {'  '}
            <Button danger className={'btn-group'} onClick={this.handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </BlockUi>
    );
  }
}

export default InfoDetailView;
