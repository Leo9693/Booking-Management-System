import React, {Component} from 'react';
import axios from 'axios';
import {  Layout, Icon, Button, Input, AutoComplete, Row, Col, List, Avatar,Table, Divider } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { deleteBusiness, fetchBusinessById, fetchBusinesses, updateBusiness } from '../../api/business';
import BlockUi from 'react-block-ui';
import Item from 'antd/lib/list/Item';

const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;
const { Option } = AutoComplete;

class BusinessDisplay extends Component{
    constructor(props) {
        super(props);
        this.state = {
            businesses: [],

            isFetching: false,

            isLoading: false,
            isSaving: false,
            notFound: false,
            error: null,
        };

        this.columns = [
            {
                title: 'Business Name',
                dataIndex: 'businessName',          
                key: 'businessName',
                fixed: 'left',
                width: 100,
            },      
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },        
            {
                title: 'ABN',
                dataIndex: 'ABN',
                key: 'ABN',
            },    
            {
                title: 'Phone',
                dataIndex: 'phone',          
                key: 'phone',
            },  
            {
                title: 'Street Address',
                dataIndex: 'streetAddress',            
                key:'streetAddress',
            },
            {
                title: 'State',
                dataIndex: 'state',            
                key:'state',
            },
            {
              title: 'Postcode',
              dataIndex: 'postcode',           
              key: 'postcode',
            }, 
            {
              title: 'Action',              
              key: 'action',
              fixed: 'right',
              width: 100,
              render:(text, record)=>
              ( 
              <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Link to={{pathname: `/businesses/list/${record._id}`}}>
                   <Button>
                        Edit
                   </Button>
                </Link>
                    <Button onClick={() => this.handleDelete(record._id)}>Delete</Button>
              </div>
            )             
              }, 
          ]; 
         
    }

    componentDidMount() {
        this.setState({ isFetching: true, error: null});
        fetchBusinesses()
          .then(data => {       
            this.setState({ businesses: data});
          })
          .catch(error => {
            this.setState({ isFetching: false, error});
          });
      };

    handleSearch = e => {
        e.preventDefault();
        console.log(this.props.form.getFieldsValue());
    }
     
    handleDelete = id => {       
        if (window.confirm("Do you want to delete this business ?")) {          
          this.setState({ isFetching: true });
          deleteBusiness(id).then(res => {
              this.setState({ isFetching: false });
              fetchBusinesses()
              .then(data => {       
                this.setState({ businesses: data});
              })
          }).catch(error => {
              console.log(error);
          });
          }        
        }
    
    render() {
        return (<div>
            <Layout>
                <Header className="bd-header">
                    <Row>
                        <Col span={12}>
                            <div className="bd-search" onSubmit={this.handleSearch.bind(this)} 
                            Layout="inline">
                                
                                    <Search
                                        placeholder="input search text"
                                        onSearch={value => console.log(value)}
                                        style={{ width: 200 }}
                                    />    
                            </div>
                        </Col>

                        <Col span={12}>
                            <div className="bd-new">
                                <Link className="bd-link" to={{pathname:`/businesses/list`}}>
                                    <Button type="primary">New List</Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Content className="bd-content">   
                    <BlockUi blocking={this.state.isLoading}>
                        {console.log(this.state.businesses)}
                        {console.log(this.columns)}
                        <Table columns={this.columns} dataSource={this.state.businesses} scroll={{ x: 1500, y: 300 }}/>
                    </BlockUi>
                 </Content>
                 <Footer className="bd-footer">
                     Footer
                </Footer>
             </Layout>
         </div> 
        )
    }
}
    
export default withRouter(BusinessDisplay);


