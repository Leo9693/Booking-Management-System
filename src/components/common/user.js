import React, { Component } from 'react';
// import 'antd/dist/antd.css';
import { Layout } from 'antd';




const { Content } = Layout;

// 引入子菜单组件
// const SubMenu = Menu.SubMenu; 

class BasicLayout extends Component {
  render() {
    return (
      <Layout>
       
        <Layout >
          {/* <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</Header> */}
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Handyman CMS by JR</Footer> */}
        </Layout>
      </Layout>
    )
  }
};
export default BasicLayout;