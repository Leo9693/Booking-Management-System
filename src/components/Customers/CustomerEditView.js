import BlockUi from 'react-block-ui';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button, { LoadingButton } from '../Ui/Button';
import { createInfo, fetchInfoById, updateInfo } from '../../api/customer';

class InfoEditView extends Component {
  constructor(props) {
    super(props);
    this.state = { Info: {}, isSaving: false, isFetching: false };
  }

  componentDidMount() {
    if (this._isNew()) {
      return;
    }
    const id = this.props.match.params.id;
    this.setState({ isFetching: true });
    fetchInfoById(id)
      .then(Info => this.setState({ isFetching: false, Info }))
      .catch(error => this.setState({ isFetching: false, error: error }));
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState(preState => {
      const Info = { ...preState.Info };
      Info[name] = value;
      return { Info };
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ isSaving: true, error: null });
    const { Info } = this.state;
    this._save({ id: Info._id, data: Info })
      .then(() => {
        this.setState({ isSaving: false });
        this.props.history.replace('/customers');
      })
      .catch(error => {
        this.setState({ isSaving: false, error });
      });
  };

  handleCancel = () => {
    this.props.history.push('/customers');
  };

  _save = ({ id, data }) => {
    if (this._isNew()) {
      return createInfo(data);
    }
    return updateInfo(id, data);
  };

  _isNew = () => {
    const { id } = this.props.match.params;
    return id === 'NEW';
  };

  render() {
    const { Info, isSaving } = this.state;
    return (
      <BlockUi blocking={this.state.isFetching}>
        <form
          className='jr-form-edit'
          onSubmit={this.handleSubmit}
          onReset={this.redirect}
        >
          <div className='row'>
            <div className='col-md-6'>
              <div className='form-group'>
                <label>customerName</label>
                <input
                  className='form-control'
                  name='customerName'
                  value={Info.customerName || ''}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='form-group'>
                <label>preferName</label>
                <input
                  className='form-control'
                  name='preferName'
                  value={Info.preferName || ''}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='form-group'>
                <label>email</label>
                <input
                  className='form-control'
                  name='email'
                  value={Info.email || ''}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <div className='form-group'>
                <label>phone</label>
                <input
                  className='form-control'
                  name='phone'
                  value={Info.phone || ''}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          {this.state.error && (
            <div className='row'>
              <div className='col-md-12'>
                <div className='form-group'>
                  <label>Error:</label>
                  <div>
                    {this.state.error && (
                      <p>{this.state.error.response.data}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <LoadingButton type='submit' loading={isSaving}>
            <span style={{ paddingLeft: 3 }} />
            Save
          </LoadingButton>
          <Button onClick={this.handleCancel}> Cancel </Button>
        </form>
      </BlockUi>
    );
  }
}

export default withRouter(InfoEditView);
