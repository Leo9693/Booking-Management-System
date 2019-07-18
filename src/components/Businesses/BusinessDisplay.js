import React, {Component} from 'react';

import {createForm} from 'rc-form';
import {  Layout, Button, Input, AutoComplete, Row, Col, Table, Pagination } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { deleteBusiness, fetchBusinesses} from '../../api/business';
import BlockUi from 'react-block-ui';

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
                width: '10%',
            },      
            {
              title: 'E-mail',
              dataIndex: 'email',
              key: 'email',
              width: '20%',
            },  
                    
            {
                title: 'ABN',
                dataIndex: 'ABN',
                key: 'ABN',
                width: '20%',
            },    
            {
                title: 'Phone Number',
                dataIndex: 'phone',          
                key: 'phone',
                width: '20%',
            },  
            {
                title: 'Street Address',
                dataIndex: 'streetAddress',            
                key:'streetAddress',
                width: '20%',
            },
            {
                title: 'State',
                dataIndex: 'state',            
                key:'state',
                width: '10%',
            },
            {
              title: 'Postcode',
              dataIndex: 'postcode',           
              key: 'postcode',
              width: '20%',
            },        
            {
              title: 'Action',              
              key: 'action',
              fixed: 'right',
           
              render:(text, record)=>
              ( 
              <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Link to={{pathname: `/businesses/list/${record._id}`, state:{ record }}}>
                   <Button>Edit</Button>
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

    // handleEdit = e => {
    //     const { business } = this.state;
    //     this.props.history.push({
    //         pathname: `/businesses/list/${business._id}`,
    //     });
    //   
     
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
                                    style={{ 
                                        width: 200,
                                     }}
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
                        <Table 
                            columns={this.columns} 
                            dataSource={this.state.businesses} 
                            scroll={{ x: 2000, y: 300 }}                  
                        />
                    </BlockUi>
                 </Content>
                 <Footer className="bd-footer">
                      
                </Footer>
             </Layout>
         </div> 
        )
    }
}
    
export default BusinessDisplay;


