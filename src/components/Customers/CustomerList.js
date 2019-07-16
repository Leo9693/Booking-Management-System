import React, { Component } from 'react';
import { tsImportEqualsDeclaration } from '@babel/types';

class List extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      requiredItem: '0',
      error: null,
      Info: null,
      data: null,

      isFetching: false
    };
  }
  componentDidMount() {
    this.setState({ Info: this.props.Info });
  }

  replaceModalItem(index, item) {
    // console.log(index);
    this.setState({
      requiredItem: index,
      data: item
    });
  }

  saveModalDetails(item) {
    // const requiredItem = this.state.requiredItem;
    // let tempbrochure = this.props.Info;
    // tempbrochure[requiredItem] = item;
    // this.setState({ Info: tempbrochure });
  }

  deleteItem(index) {
    let tempBrochure = this.state.brochure;
    tempBrochure.splice(index, 1);
    this.setState({ brochure: tempBrochure });
  }

  render() {
    const Info = this.props.Info.map((item, index) => {
      return (
        <tr key={item._id}>
          <td>{item.customerName}</td>
          <td> - </td>
          <td>{item.email}</td>
          <td>
            <button
              className='btn btn-primary'
              data-toggle='modal'
              data-target='#exampleModal'
              onClick={() => this.replaceModalItem(item._id, item)}
            >
              edit
            </button>{' '}
            <button
              className='btn btn-danger'
              onClick={() => this.deleteItem(item._id)}
            >
              remove
            </button>
          </td>
        </tr>
      );
    });

    // const [requiredItem] = this.props.Info;
    // let modalData = this.props[requiredItem];

    const requiredItem = this.state.requiredItem;
    const data = this.state.data;
    console.log(requiredItem);
    // let modalData = this.state.Info[requiredItem];
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <h1>Customers List</h1>
          <h6>For Search</h6>
        </div>
        <table className='table table-striped'>
          <tbody>{Info}</tbody>
        </table>
      </div>
    );
  }
}

export default List;
