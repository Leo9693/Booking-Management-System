// Management.js
import {deleteOrder} from '../../api/order';
import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider } from 'antd';


export default class displayTable extends React.Component {   
    columns = [
        {
          title: 'ID',
          dataIndex: '_id',
          key: 'id',  
          render: (text, record) => (
            <span>    
           
            <Link
                to={{
                    pathname: `/orders/management/${text}`,           
                }}>{text}
            </Link>          
            </span>      
          ),
        },
        {
          title: 'CreatedTime',
          dataIndex: 'createTime',
          key: 'createTime',
        },
        
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },        
        {
        title: 'Customer',
        dataIndex: 'customer.customerName',
        key: 'customer',
        },    
        {
            title: 'Business',
            dataIndex: 'business.businessName',
            key: 'business',
        },  
        {
          title: 'Service Type',
          dataIndex: 'category.name',
          key: 'category',
        }, 
        {
          title: 'Action',
          dataIndex: '_id',
          key: 'action',
          render: (text, record) => (       
            <span>
               <Link
                to={{
                    pathname: `/orders/management/edit/${text}`,           
                }}>Edit
            </Link>
            <Divider type="vertical" />
            <a href="#" onClick={(e) => { this.deleteRecord(text);}} >Delete</a>
          </span>
          ),
        },
      ]; 
      deleteRecord=(e)=>{      
        if (window.confirm("Do you want to delete this order ?")) {          
          deleteOrder(e).then(res => {
            this.location.reload() ;
          }).catch(error => {
              console.log(error );
          });
        }
      }
    render() {
      return (
   
        <div><Table columns={this.columns} dataSource={this.props.orders} rowKey="_id" />,
       </div>
       
      );
    }
  }
  