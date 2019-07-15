// Management.js
import {fetchOrders } from '../../api/order';
import React from 'react';
import DisplayTable from './DisplayTable';
import BlockUi from 'react-block-ui';

import { Form, Row, Col, Input, Button, Select, Slider } from 'antd';
// import { createTracing } from 'trace_events';
const Option = Select.Option;
class OrdersManagement extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFetching: false,
        orders: [],
      };
    }
  
    componentDidMount() {
      this.setState({ isFetching: true, error: null});
      fetchOrders()
        .then(data => {
          console.log(data);
          this.setState({ orders: data.orders,isFetching: false});
        })
        .catch(error => {
          this.setState({ isFetching: false, error});
        });
    };
    
 
    handleSearch = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.setState({ isFetching: true, error: null});
          fetchOrders(values)
            .then(data => {
              console.log(data);
              this.setState({ orders: data.orders,isFetching: false});
            })
            .catch(error => {
              this.setState({ isFetching: false, error});
            });
          console.log('Received values of form: ', values)
        };
      });
    };
  
    handleReset = () => {
      this.props.form.resetFields();
    };
    handleAddNewOrder=()=>{
      // const id = this.props.match.params.id;      
      this.props.history.push({
        pathname: `/orders/management/edit/new`,
    })};
    formGet=()=>{
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
      return (
        <Form  {...formItemLayout} onSubmit={this.handleSearch}>     
        <Button type="primary" onClick={this.handleAddNewOrder}>Add New order</Button>
        <div className="searchField"> 
        <Row > 
              <Col>
        <Form.Item label="Field" hasFeedback style={{ width: 240 }}>
          {getFieldDecorator('searchType', {
            rules: [{ required: true, message: 'select Customer or Business' }], initialValue: "customer"
          })(
            <Select placeholder="search type" >
              <Option value="customer">Customer</Option>
              <Option value="business">Business</Option>
            </Select>,          
          )}
        </Form.Item >
     
         
        <Form.Item label="Name" hasFeedback style={{ width: 240 }}>
          {getFieldDecorator('key')(
            <Input placeholder="key word"/>            
          )}
        </Form.Item>
     
        <Form.Item label="Sort By" hasFeedback style={{ width: 240 }}>
          {getFieldDecorator('sort',{ initialValue: "createdAt"})(
            <Select placeholder="Please select">
              <Option value="status">Order Status</Option>
              <Option value="createdAt">Created Time</Option>
              <Option value="grade">Rate</Option>
            </Select>        
          )}
        </Form.Item>
      
      
        <Form.Item label="Results" style={{ width: 240 }}>
          {getFieldDecorator('pageSize')(
            <Slider 
            min={10}
            max={50}
              marks={{
                10: '10',
                20: '20',
                30: '30',
                40: '40',
                50:'50' ,            
              }}
            />,
          )}
        </Form.Item>
     
        {/* <Form.Item label="Current" style={{ width: 240 }}>
          {getFieldDecorator('page', { initialValue: 1 })(<InputNumber min={1} max={10} />)}
          <span className="ant-form-text"> results</span>
        </Form.Item>         */}
        <Button type="primary" htmlType="submit">
          Search
        </Button>
        <Button onClick={this.handleReset}>         
          Clear
        </Button> 
        </Col>
        </Row>
        </div>   
        <div > 
        <BlockUi blocking={this.state.isFetching}>      
        <DisplayTable orders={this.state.orders}/>
        </BlockUi>   
        </div>
      </Form>
      )
    }
    render() {
      return (  
        <this.formGet/> 
      );
    }
  }
  const searchCondition = Form.create({ name: 'advanced_search' })(OrdersManagement);
  export default searchCondition;