import React, { Component } from 'react';

import Button, { LoadingButton } from '../Ui/Button';
import {withRouter} from "react-router-dom";

import { fetchBusinessById, createBusiness, updateBusiness } from '../../api/business';
import BlockUi from "react-block-ui";

class CourseEditView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
      isSaving: false,
      isFetching: false,
      error: null,
    };
  }

  componentDidMount() {
    if (this._isNew()) {
        return;
    }
    const courseId = this.props.match.params.id;
    this.setState({ isFetching: true });
    fetchBusinessById(courseId)
        .then(course => this.setState({ isFetching: false, course }))
        .catch(error => this.setState({ isFetching: false, error: error }));
  }

  _isNew = () => {
      const { id } = this.props.match.params;
      return id === 'NEW';
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState((preState) => {
      const course = { ...preState.course };
      course[name] = value;
      return { course };
    });
  }

  _save = ({ id, data }) => {
      if (this._isNew()) {
          return createBusiness(data);
      }
      return updateBusiness(id, data);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ isSaving: true, error: null });
    const { course } = this.state;
    this._save({ id: course._id, data: course })
    .then(() => {
      this.setState({ isSaving: false });
      this.props.history.replace('/courses');
    })
    .catch(error => {
      this.setState({ isSaving: false, error });
    });
  }

  handleCancel = () => {
    this.props.history.push('/courses');
  }

  render() {
    const { course, isSaving } = this.state;
    return (
      <BlockUi blocking={this.state.isFetching}>
        <form className="jr-form-edit" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Code</label>
                <input
                  className="form-control"
                  name="code"
                  value={course.code || ''}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Name</label>
                <input
                  className="form-control"
                  name="name"
                  value={course.name || ''}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Introduction</label>
                <textarea
                  style={{ height: 100 }}
                  className="form-control"
                  name="description"
                  value={course.description || ''}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <LoadingButton type="submit" loading={isSaving}>
            <span style={{ paddingLeft: 3 }} />
            Save
          </LoadingButton>
          <Button onClick={this.handleCancel}> Cancel </Button>
        </form>
      </BlockUi>
    );
  }
}

export default withRouter(CourseEditView);
