import React, {Component} from 'react';
import {  Layout, Icon, Button, Input, AutoComplete, Row, Col, List, Avatar,Table, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { deleteBusiness, fetchBusinessById, fetchBusinesses } from '../../api/business';
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
             dataIndex: '_id',
               key: 'id',  
               render: (businesses, record) => (
                 <span>    
                <Link
                     to={{
                         pathname: `/businesses`,           
                     }}>{businesses}
                 </Link>          
                 </span>      
              ),
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },        
            {
                title: 'ABN',
                dataIndex: 'abn',
                key: 'abn',
            },    
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'business',
            },  
            {
              title: 'Postcode',
              dataIndex: 'postcode',
              key: 'postcode',
          }, 
          ]; 
    }

    componentDidMount() {
        this.setState({ isFetching: true, error: null});
        fetchBusinesses()
          .then(data => {
              console.log(data.data);         
            this.setState({ businesses: data.data});
            console.log(this.state.businesses)
          })
          .catch(error => {
            this.setState({ isFetching: false, error});
          });
      };

    handleSearch = e => {
        e.preventDefault();
        console.log(this.props.form.getFieldsValue());
    }
    
    handleEdit = e => {
        const { business } = this.state;
        this.props.history.push({pathname:`/businesses/list/${business._id}`});
    }
     
    handleDelete = e => {
    if (window.confirm("Do you want to delete this business list ?")) {
        const { id } = this.props.match.params;
        this.setState({ isLoading: false });

        deleteBusiness(id).then(res => {
            this.setState({ isLoading: false });
            this.props.history.replace('/businesses');
        }).catch(error => {
            this.setState({ isLoading: false, error });
        });
    }
    };

    render() {
        const {isLoading, business} = this.state;
        
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
                        <Table columns={this.columns} 
                        // dataSource={this.props.businesses} 
                        />
   
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Link to={{pathname: `/businesses/list`, state: { business },}}>
                         <Button primary className={'btn-group'} onClick={this.handleEdit}>
                            Edit
                         </Button>
                      </Link>
                       
                        <Button danger className={'btn-group'} onClick={this.handleDelete}>
                            Delete
                         </Button>   
                    </div>
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
    
export default BusinessDisplay;


// // import {fetchBusinesses} from '../../api/business';

// // export default class BusinessDisplay extends Component {
// //   constructor(props){
// //     super(props);
// //     this.state={
// //         isFetching: false,
// //         BusinessInfo:{},
// //     }
// //   }  
// //   componentDidMount(){
// //       this.setState({isFetching:true, error:null});
// //     fetchBusinesses()
// //     .then(data=>{
// //         this.setState({businessInfo:data, isFetching:false});
// //     })
// //     .catch(error=>{
// //         this.setState({isFetching:false, error});
// //     })
// // }

// //   render(){
// //       return(
// //         <div className='checkb'>
// //             <Button type="primary" shape="round" icon="">
// //                 Add business list
// //             </Button>
// //             <p>Business: <input type="text" placeholder="Business" /></p>
// //             {/* onChange={this.handleChange.bind(this)} */}
// //             <button onClick={this.handleSubmit.bind(this)}>Submit</button>
// //             <ul>
// //                 {this.state.list.map((item, index)=>{

// //                     return (
// //                         <li key={item._id}>
// //                             {item}
// //                         </li>
// //                     )
// //                 })}
// //             </ul>         
// //         </div>
// //         )
// //     }
// //     handleSubmit(event){
// //         // event.preventDefault();
// //         this.setState({
// //             list:[...this.state.list,this.state.BusinessInfo]
// //         })
// //     }
// // }

// //     // handleChange(event){
// //     //     this.setState
// //     // 
