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
          
          this.setState({ orders: data,isFetching: false});
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
          console.log(values);
          fetchOrders(values)
            .then(data => {
              console.log(data);
              this.setState({ orders: data,isFetching: false});
              
            })
            .catch(error => {
            
              this.setState({ orders:[], isFetching: false, error});
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
        labelCol: { span: 6},
        wrapperCol: { span: 18 },     
      };
      return (
        <Form {...formItemLayout} onSubmit={this.handleSearch}>     
        <Button type="primary" onClick={this.handleAddNewOrder}>Add New order</Button>
        <div className="searchField"> 
        <Row type="flex" justify="start" span={24} style={{ marginBottom: 1 }}> 
        <Col span={6}>        
        <Form.Item label="Field" hasFeedback >
          {getFieldDecorator('searchType', {
            rules: [{ required: true, message: 'select Customer or Business' }]
          })(
            <Select placeholder="search type" >
              <Option value="customer">Customer</Option>
              <Option value="business">Business</Option>
            </Select>,          
          )}
        </Form.Item > 
        </Col> 
        <Col span={6}>       
        <Form.Item label="Name" hasFeedback>
          {getFieldDecorator('key')(
            <Input placeholder="key word"/>            
          )}
        </Form.Item>
        </Col>       
        <Col span={6}>
        <Form.Item label="Sort By" hasFeedback>
          {getFieldDecorator('sort')(
            <Select placeholder="Please select">
              <Option value="status">Order Status</Option>
              <Option value="createTime">Created Time</Option>
              <Option value="grade">Rate</Option>
            </Select>        
          )}
        </Form.Item>   
        </Col>   
        <Col span={6}>
        <Form.Item label="Results">
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
        </Col>
        </Row>
            
				
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
				
				
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>         
                  Clear
                </Button> 
				
              
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