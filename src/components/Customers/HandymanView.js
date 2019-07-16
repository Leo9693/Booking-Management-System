import BlockUi from 'react-block-ui';
import React from 'react';
import { Link } from 'react-router-dom';

// import Button, { LoadingButton } from '../UI/Button';
import HandymanTable from './HandymanTable';
import { fetchInfo } from '../../api/handyman';

export default class InfoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      Info: [],
      customerId: null,
      isFetching: false
    };
  }

  componentDidMount() {
    this.setState({ customerId: this.props.match.params.id });
    console.log(this.props.match.params.id);
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
    console.log('render ' + this.state.customerId);
    return (
      <div>
        <BlockUi blocking={this.state.isFetching}>
          <div className='row' style={{ marginTop: 15 }}>
            {this.state.Info.map((Info, index) => (
              <HandymanTable
                Info={Info}
                key={Info._id}
                customerId={this.state.customerId}
              />
            ))}
          </div>
        </BlockUi>
      </div>
    );
  }
}
