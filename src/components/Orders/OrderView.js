import { Card, Steps, Rate, Descriptions, Row, Col } from 'antd';
import {fetchOrderById, deleteOrder} from '../../api/order';
import BlockUi from 'react-block-ui';
import React from 'react';
const {Step} =Steps;



export default class Orders extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFetching: false,
		order: {customer:{customerName:"abc"},
	           business:{businessName:"abc"}},
      };
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({ isFetching: true, error: null});
        fetchOrderById(id)
          .then(data => {                
			this.setState({ order: data,isFetching: false});  
			console.log(this.state.order);        
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
     handleDelete=()=>{  
      const id = this.props.match.params.id;    
      if (window.confirm("Do you want to delete this order ?")) {        
        deleteOrder(id).then(res => {
          this.props.history.push('/orders/management');
        }).catch(error => {
            console.log(error );
        });
      }
	}		
     render() {
      return ( 
		
    <BlockUi blocking={this.state.isFetching}>
        
		<Card title={this.stepOrder(this.state.order.status)} style={this.style} actions={[<a onClick={this.handleEdit}>EDIT</a>, <a onClick={this.handleDelete}>DELETE</a>]}>
			<div style={{ background: '#ECECEC', padding: '10px' }}>

				<Card bordered={false}>
				<Descriptions title="Customer Info">
				<Descriptions.Item label="CustomerName">{this.state.order.customer.customerName}</Descriptions.Item>
				<Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
				<Descriptions.Item label="Address">11 First Ave, NorthArea,4000</Descriptions.Item>		
				</Descriptions>
				</Card>				
				<Card  bordered={false}>
				<Descriptions title="Business Info">
				<Descriptions.Item label="BusinessName">{this.state.order.business.businessName}</Descriptions.Item>
				<Descriptions.Item label="Telephone">1810001111</Descriptions.Item>
				<Descriptions.Item label="Address">11 First Ave, NorthArea,4000</Descriptions.Item>		
				</Descriptions>
				</Card>
            
			</div>
			<div>				
				<Row gutter={16}>
					<Col span={8}>
						<Card title="Job location" bordered={false}>
						dfajfldjljflajlfdjlfjdlsjfl
						</Card>
					</Col>
					<Col span={8}>
						<Card title="Service comments" bordered={false}>
						dfoaufodufoduofu
						</Card>
					</Col>
					<Col span={8}>
						<Card title="Service grade" bordered={false}>
						<Rate disabled defaultValue={this.state.order.grade} />
						</Card>
					</Col>
				</Row>
			</div>
		</Card>
    </BlockUi>
      )
     }
    }