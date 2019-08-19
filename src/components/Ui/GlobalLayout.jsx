import React, { Component } from 'react';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Logout from '../Admins/Logout';

const { Header, Footer, Sider, Content } = Layout;

export default class GlobalLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            collapsed: !prevState.collapsed,
        }));
    };

    render() {
        const { collapsed } = this.state;
        return (
            <Layout className="global-layout" style={{ minHeight: '100vh' }}>
                <Sider
                    className="global-layout__sider"
                    breakpoint="md"
                    collapsedWidth="0"
                // trigger
                // collapsible
                // collapsed={collapsed}
                >

                    {/* <div className="logo" /> */}

                    <Menu theme="light" defaultSelectedKeys={['home']} >
                        <Menu.Item key="home">
                            <Link to='/'>
                                <Icon type='pie-chart' />
                                <span>Home</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="customers">
                            <Link to='/customers'>
                                <Icon type="usergroup-add" />
                                <span>Customer</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="businesses">
                            <Link to='/businesses'>
                                <Icon type="tool" />
                                <span>Business</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="orders">
                            <Link to='/orders'>
                                <Icon type="container" />
                                <span>Order</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="categories">
                            <Link to='/categories'>
                                <Icon type="switcher" />
                                <span>Category</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider >
                <Layout>
                    <Header className="global-layout__header">
                        <Row type="flex" justify="start" align="middle" gutter={8}>
                            {/* <Col span={1}>
                                <Icon
                                    className="trigger"
                                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                            </Col> */}
                            <Col span={16} md={16} style={{ textAlign: "left" }}>
                                <h4>JR Handyman CMS</h4>
                            </Col>
                            <Col span={8} md={8} style={{ textAlign: "right" }}>
                                <div className="global-layout__header__container">
                                    <div className="global-layout__header__item">
                                        <Logout />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Header>
                    <Content className="global-layout__content">
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout >
        )
    }

}