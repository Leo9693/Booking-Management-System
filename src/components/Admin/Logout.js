
import { Avatar, Row, Col} from 'antd';
import React from 'react';
import {withRouter} from "react-router-dom";

import { getUsername, logout } from '../../api/auth';

  class Logout extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
  
    username=getUsername();
    handleLogout=()=>{
       
        logout().then(() => this.props.history.replace('/'));
    }
    render() {   
      return (
        
            <Row span={24} className="logout">
                <Col span={16}> 
                    <h2>Welcome to JR Handyman CMS</h2>
                </Col>     
                <Col span={5} style={{margin:0}}>                        
                    <div><Avatar style={{ backgroundColor: '#87d068' }} icon="user" /><span>Hi,{this.username}</span></div>        
                </Col>
                <Col span={2}> 
                    <a onClick={this.handleLogout} id="logout__button">Log out</a>
                </Col> 
            </Row>
       
      );
    }
}


export default withRouter(Logout);
          