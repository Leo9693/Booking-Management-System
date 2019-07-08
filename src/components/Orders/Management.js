// Management.js
import {fetchOrders } from '../../api/order';
import React from 'react';
import DisplayTable from './DisplayTable';

import { Form, Row, Col, Input, Button, Select, Slider} from 'antd';
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
            console.log(data.data);         
          this.setState({ orders: data.data});
          console.log(this.state.orders)
        })
        .catch(error => {
          this.setState({ isFetching: false, error});
        });
    };
    
 
    handleSearch = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {console.log('Received values of form: ', values)};
      });
    };
  
    handleReset = () => {
      this.props.form.resetFields();
    };
    handleAddNewOrder=()=>{
      const id = this.props.match.params.id;      
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
        {/* <Row gutter={24}>{this.getFields()}</Row> */}
        
        <Button type="primary" onClick={this.handleAddNewOrder}>Add New order</Button>
        
        <Row gutter={4}>
        {/* <Col span={6}>
        <Form.Item label="Field" hasFeedback>
          {getFieldDecorator('searchType', {
            rules: [{ required: true, message: 'select Customer or Business' }],
          })(
            <Select placeholder="search type">
              <Option value="customer">Customer</Option>
              <Option value="business">Business</Option>
            </Select>,          
          )}
        </Form.Item >
         </Col> */}
         <Col span={6}>
        <Form.Item label="key word" hasFeedback>
          {getFieldDecorator('key')(
            <Input placeholder="key word"/>            
          )}
        </Form.Item>
        </Col>
        {/* </Row>
        <Row> */}        
        <Col span={6}>
        <Form.Item label="By Sort" hasFeedback>
          {getFieldDecorator('sort')(
            <Select placeholder="Please select which name">
              <Option value="status">Order Status</Option>
              <Option value="createdAt">Creation Time</Option>
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
                15: '15',
                20: '20',
                30: '30',
                50:'50' ,            
              }}
            />,
          )}
        </Form.Item>
        </Col>
        </Row>
        <Row>
          <Col gutter={2} span={4} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button onClick={this.handleReset}> 
            {/* //style={{ marginLeft:2}}  */}
              Clear
            </Button>
          </Col>
        </Row>
        <div >          
        <DisplayTable orders={this.state.orders}/>
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