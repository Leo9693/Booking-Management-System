import React, { Component } from 'react';
import BlockUi from 'react-block-ui';
import {withRouter} from "react-router-dom";

import Button from '../Ui/Button';
import BusinessDetailDisplay from './BusinessDetailDisplay';
import { fetchBusinessById, deleteBusiness } from "../../api/business";

class BusinessDetailView extends Component {
  constructor(props) {
    super(props);
    // let { course } = props.location.state || {};
    this.state = {
      isLoading: false,
      isSaving: false,
      notFound: false,
      error: null,
      course: {},
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ isLoading: true });
    fetchBusinessById(id)
    .then(course => {
        this.setState({ isLoading: false, course, error: null });
    })
    .catch(error => {
        this.setState({ isLoading: false, error });
    });
  }

  handleEdit = (event) => {
    const { business } = this.state;
    this.props.history.push({
        pathname: `/businesses/edit/${business._id}`,
    });
  }

  handleDelete(event) {
    if (window.confirm("Do you want to delete this course ?")) {
      const { id } = this.props.match.params;
        this.setState({ isLoading: true });
      deleteBusiness(id).then(res => {
          this.setState({ isLoading: false });
          this.props.history.push('/courses');
      }).catch(error => {
          this.setState({ isLoading: false, error });
      });
    }
  }

  render() {
    const { isLoading, business } = this.state;
    return (
      <BlockUi blocking={isLoading}>
        <BusinessDetailDisplay business={business} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button primary className={'btn-group'} onClick={this.handleEdit}>
            Edit
          </Button>
          <Button danger className={'btn-group'} onClick={this.handleDelete}>
            Delete
          </Button>
        </div>
      </BlockUi>
    );
  }
}

export default withRouter(BusinessDetailView);
