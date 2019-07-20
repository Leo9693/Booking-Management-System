import React, {Component} from 'react';

import { Layout, Button, Input, Row, Col, Table, Form } from 'antd';
import { Link } from 'react-router-dom';
import { deleteBusiness, fetchBusinesses} from '../../api/business';

import BlockUi from 'react-block-ui';
import Item from 'antd/lib/list/Item';

const { Search } = Input;
const { Header, Content } = Layout;

class BusinessDisplay extends Component{
    constructor(props) {
        super(props);
        this.state = {
            businesses: [],

            isFetching: false,

            isLoading: false,
            isSaving: false,
            error: null,
        };

        this.columns = [
            {
                title: 'Business Name',
                dataIndex: 'businessName',          
                key: 'businessName',
                fixed: 'left',
                width: 150,
            },

            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
              width: 250,
            },  

            {
                title: 'ABN',
                dataIndex: 'ABN',
                key: 'ABN',
                width: 200,

            },    
            {
                title: 'Phone',
                dataIndex: 'phone',          
                key: 'phone',
                width: 200,
            },  
            {
                title: 'Street Address',
                dataIndex: 'streetAddress',            
                key:'streetAddress',
                width: 200,
            },
            {
                title: 'State',
                dataIndex: 'state',            
                key:'state',
                width: 200,
            },
            {
              title: 'Postcode',
              dataIndex: 'postcode',           
              key: 'postcode',
              width: 200,
            },        
            {
              title: 'Action',              
              key: 'action',
              fixed: 'right',
              width: 200,
              render:(text, record)=>
              ( 
              <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Link to={{pathname: `/businesses/list/${record._id}`}}>
                   <Button>
                        Edit
                   </Button>
                </Link>

                <Button 
                    onClick={() => this.handleDelete(record._id)}
                    style={{ marginLeft: 8 }}
                >
                    Delete
                </Button>
              </div>
              )             
            }, 
        ]; 
    }

    componentDidMount() {
        this.setState({ isFetching: true, error: null});
        fetchBusinesses()
          .then(data => {       
            this.setState({ businesses: data.businesses});
          })
          .catch(error => {
            this.setState({ isFetching: false, error});
          });
      };

    handleSearch = (value) =>{
        fetchBusinesses(value)
        .then(data => {       
            this.setState({businesses: data.businesses});
        })
        .catch(error => {
            this.setState({ isFetching: false, error});
        });  
    }
            // console.log(this.props.form.getFieldsValue());
         
    handleDelete = id => {       
        if (window.confirm("Do you want to delete this business ?")) {          
          this.setState({ isFetching: true });
          deleteBusiness(id).then(res => {
              this.setState({ isFetching: false });
              fetchBusinesses()
              .then(data => {       
                this.setState({ businesses: data.businesses});
              })
          }).catch(error => {
              console.log(error);
          });
          }        
        }
    
    render() {  
    
        return (
        <div>     
            <Layout>
                <Header className="bd-header">
                  <Row>
                    <Col span={12}>
                        <div className="bd-search" layout="inline"> 
                    
                            <Search
                                placeholder="input search text"
                                style={{ width: 200 }}
                                onSearch={value => this.handleSearch(value)}
                            />                       
                        </div> 
                    </Col> 
                    <Col span={12}>
                        <div className="bd-new">

                            <Link className="bd-link" to={{pathname:`/businesses/list/create`}}>
                                <Button type="primary" block>New List</Button>
                            </Link>
                        </div>                          
                    </Col>  
                  </Row>

                </Header>
                <Content className="bd-content"> 
                    <BlockUi blocking={this.state.isLoading}>
                        {console.log(this.state.businesses)}
                        {console.log(this.columns)}
                            <Table 
                                columns={this.columns} 
                                dataSource={this.state.businesses} 
                                scroll={{ x: 1500, y: 300 }}                  
                            />
                    </BlockUi>
                </Content>

             </Layout>
         </div> 
        )
    }
}

export default Form.create()(BusinessDisplay);



