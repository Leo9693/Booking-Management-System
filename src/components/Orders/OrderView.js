import { Card, Steps, Row, Col } from 'antd';
import {fetchOrderById} from '../../api/order';
import React from 'react';
const {Step} =Steps;


export default class Orders extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFetching: false,
        order: [],
      };
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({ isFetching: true, error: null});
        fetchOrderById(id)
          .then(data => {
                
            this.setState({ order: data});
          
          })
          .catch(error => {
            this.setState({ isFetching: false, error});
          });
      };
    style = {
        // width: "600px",
        margin: '30px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        border: '1px solid #e8e8e8',
      };
    stepOrder=(statu)=>{
       const status=["booking","accepted","finished"]
       const index=status.indexOf(statu);
       return (
        <Steps size="small" current={index}>
        <Step title="Booking" />
        <Step title="Accepted" />
        <Step title="Finished" />
      </Steps>
       )
     };
     handleEdit=()=>{
      const id = this.props.match.params.id;      
      this.props.history.push({
        pathname: `/orders/management/edit/${id}`,
    });
     }
     render() {
      return ( 
     <Card title={this.stepOrder(this.state.order.status)} style={this.style} actions={[<a onClick={this.handleEdit}>EDIT</a>, <a>DELETE</a>]}>
        <div style={{ background: '#ECECEC', padding: '10px' }}>
          <Row gutter={5}>
            <Col span={12}>
              <Card title="Customer" bordered={false}>
              <div>CustomerName</div>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Business" bordered={false}>
                BusinessName
              </Card>
         </Col>
          </Row>
          
        </div>
        <div>jobLocation</div>
        <div>Comments</div>
        <div>Service Rate</div>
      </Card>
      )
     }
    }