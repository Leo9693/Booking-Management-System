import { Component } from 'react';
import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Logout from '../Admin/Logout';
const { Header, Footer, Sider, Content } = Layout;

// 引入子菜单组件
// const SubMenu = Menu.SubMenu; 

export default class BasicLayout extends Component {
  // state = {
  //   collapsed: false,
  // };

  // toggle = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed,
  //   });
  // };
  render() {
    return (
      <div>       
      <Layout>
        <Sider width={256} style={{ minHeight: '100vh' } }
             breakpoint="md"
             collapsedWidth="0"
             onBreakpoint={broken => {
               console.log(broken);
             }}
             onCollapse={(collapsed, type) => {
               console.log(collapsed, type);
             }}
            //  trigger={null} collapsible collapsed={this.state.collapsed}
        >
          <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
            <Link to="/">
              <Icon type="pie-chart" />
              <span>Home</span>
             </Link> 
            </Menu.Item>
            <Menu.Item key="2"><Link to="/customers/management">Customers</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/businesses/management">Businesses</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/orders/management">Orders</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/categories/management">Categories</Link></Menu.Item>
            {/* <SubMenu
              key="sub5"
              title={<span><Icon type="dashboard" /><span>Admin User</span></span>}
            >
               <Menu.Item key="6"><Link to="/admin/login">Login</Link></Menu.Item>
               <Menu.Item key="7"><Link to="/admin/setting">Setting</Link></Menu.Item>   
            </SubMenu>    */}
          </Menu>
        </Sider>
        <Layout >
          <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>
          <div>
            {/* <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            /> */}
            <Logout />
            </div>
            </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Handyman CMS by JR</Footer>
        </Layout>
      </Layout>
      </div>
    )
  }
}