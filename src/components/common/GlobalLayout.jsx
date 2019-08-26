import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Logout from '../Admins/Logout';

const { Header, Sider, Content, Footer } = Layout;
const PUBLIC_URL = process.env.PUBLIC_URL;
class GlobalLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: true,
            isSmallScreen: false,
        }
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.handleResize);
        if (window.innerWidth < 992) {
            this.setState({ isSmallScreen: true });
        }
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = event => {
        if (event.target.innerWidth >= 992) {
            this.setState({ isSmallScreen: false });
        } else {
            this.setState({ isSmallScreen: true });
        }
    }

    setCollapse = collapsed => {
        this.setState({ isCollapsed: collapsed });
    };

    handleCloseMenuSider = () => {
        this.setState({ isCollapsed: true });
    }

    render() {
        const url = this.props.history.location.pathname;
        const firstPartUrl = url.split('/')[1];
        const { isCollapsed, isSmallScreen } = this.state;

        return (
            <Layout id="global-layout" style={{ minHeight: '100vh' }}>
                <Sider
                    className={`global-layout__sider ${(isSmallScreen && !isCollapsed) ? "sider-spread" : null}`}
                    breakpoint="lg"
                    collapsedWidth="0"
                    collapsed={isSmallScreen && isCollapsed}
                    onCollapse={(collapsed, type) => {
                        this.setCollapse(collapsed);
                    }}
                >
                    <div className="logo">
                        <img src={`${PUBLIC_URL}/logo.png`} alt="logo" />
                    </div>
                    <Menu theme="light" defaultSelectedKeys={['home']} selectedKeys={[firstPartUrl] || ['home']}>
                        <Menu.Item key="home">
                            <Link to='/home'>
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
                            <Col span={11} sm={13} md={15} lg={17} xl={19} xxl={20} style={{ textAlign: "left" }}>
                                <h4>JR CMS</h4>
                            </Col>
                            <Col span={13} sm={11} md={9} lg={7} xl={5} xxl={4} style={{ textAlign: "right" }}>
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

                    <Footer className="global-layout__footer">
                        JR Handyman CMS by Leo
                        </Footer>
                    <div
                        className={(isSmallScreen && !isCollapsed) && "layout-mask"}
                        onClick={this.handleCloseMenuSider}>
                    </div>
                </Layout>
            </Layout >

        )
    }
}

export default withRouter(GlobalLayout);