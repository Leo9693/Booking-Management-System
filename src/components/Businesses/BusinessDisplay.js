import React, {Component} from 'react';
import {  Layout, Icon, Button, Input, AutoComplete, Row, Col, List, Avatar,Table, Divider } from 'antd';
import { Link } from 'react-router-dom';
import {fetchBusinesses,deleteBusiness, fetchBusinessById} from '../../api/business';
import BlockUi from 'react-block-ui';

const { Header, Footer, Sider, Content } = Layout;
const { Option } = AutoComplete;

class BusinessDisplay extends Component{

 columns = [
        {
           title: 'Business Name',
         dataIndex: '_id',
           key: 'id',  
           render: (text, record) => (
             <span>    
           
            <Link
                 to={{
                     pathname: `/businesses${text}`,           
                 }}>{text}
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

    constructor(props) {
        super(props);
        this.state = {
          loading: false,

          isFetching: false,

          isLoading: false,
          isSaving: false,
          notFound: false,
          error: null,
          business: {},
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
            this.setState({ 
                isLoading: true,
        })

        fetchBusinessById(id)
        .then(business => {
            this.setState({ isLoading: false, business, error: null });
        })
        .catch(error => {
            this.setState({ isLoading: false, error });
        });
    }

    handleEdit = (event) => {
        const { business } = this.state;
        this.props.history.push({
            pathname: `/businesses/list`,
        });
      }
     
      handleDelete(event) {
        if (window.confirm("Do you want to delete this business list ?")) {
          const { id } = this.props.match.params;
            this.setState({ loading: true });
          deleteBusiness(id).then(res => {
              this.setState({ loading: false });
              this.props.history.push('/businesses');
          }).catch(error => {
              this.setState({ loading: false, error });
          });
        }
      }
        
    render(){
        return (<div>
            <Layout style={{}}>
                <Header className="bd-header">
                    <Row>
                        <Col span={12}>
                            <div className="bd-search">
                                
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
                    <BlockUi 
                    // blocking={loading}
                    >
                        <Table columns={this.columns} 
                        // dataSource={this.props.businesses} 
                       
                        
                        />
   
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button primary className={'btn-group'} onClick={this.handleEdit}>
                            Edit
                         </Button>
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
        );
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
