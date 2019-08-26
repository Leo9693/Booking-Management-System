import React from 'react';
import { Statistic, Row, Col, Icon } from 'antd';
import BlockUi from 'react-block-ui'
import { connect } from 'react-redux';
import { actionCreators as categoryActionCreators } from '../Categories/store';
import { actionCreators as businessActionCreators } from '../Businesses/store';
import { actionCreators as customerActionCreators } from '../Customers/store';
import { actionCreators as orderActionCreators } from '../Orders/store';

const PUBLIC_URL = process.env.PUBLIC_URL;

class Home extends React.Component {
    componentDidMount() {
        const {
            categoryDocumentCount,
            customerDocumentCount,
            businessDocumentCount,
            orderDocumentCount,
            categoryInit,
            customerInit,
            businessInit,
            orderInit,
        } = this.props;
        if (!categoryDocumentCount || categoryDocumentCount === 0) {
            categoryInit();
        }
        if (!customerDocumentCount || customerDocumentCount === 0) {
            customerInit();
        }
        if (!businessDocumentCount || businessDocumentCount === 0) {
            businessInit();
        }
        if (!orderDocumentCount || orderDocumentCount === 0) {
            orderInit();
        }
    }

    render() {
        const { categoryDocumentCount, customerDocumentCount, businessDocumentCount, orderDocumentCount } = this.props;
        return (
            <BlockUi blocking={this.props.isLoading}>
                <div id="home-page">
                    <h4 className="text-center mb-5">Data Profile</h4>
                    <Row gutter={16} align="bottom">
                        <Col xs={24} md={12}>
                            <Row>
                                <Col span={8}>
                                    <img className="img-cover" src={`${PUBLIC_URL}/business.png`} alt="business" />
                                </Col>
                                <Col span={14} offset={2}>
                                    <Statistic
                                        title="Businesses Online"
                                        value={businessDocumentCount}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix={<Icon type="arrow-up" />}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} md={12}>
                            <Row>
                                <Col span={8}>
                                    <img className="img-cover" src={`${PUBLIC_URL}/customer.png`} alt="customer" />
                                </Col>
                                <Col span={14} offset={2}>
                                    <Statistic
                                        title="Customers Online"
                                        value={customerDocumentCount}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix={<Icon type="arrow-up" />}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Row>
                                <Col span={8}>
                                    <img className="img-cover" src={`${PUBLIC_URL}/order.png`} alt="order" />
                                </Col>
                                <Col span={14} offset={2}>
                                    <Statistic
                                        title="Total Orders"
                                        value={orderDocumentCount}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix={<Icon type="arrow-up" />}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} md={12}>
                            <Row>
                                <Col span={8}>
                                    <img className="img-cover" src={`${PUBLIC_URL}/category.png`} alt="category" />
                                </Col>
                                <Col span={14} offset={2}>
                                    <Statistic
                                        title="Total Categories"
                                        value={categoryDocumentCount}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix={<Icon type="arrow-up" />}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </BlockUi>
        )
    }
}

const mapState = (state) => ({
    categoryDocumentCount: state.category.documentCount,
    customerDocumentCount: state.customer.documentCount,
    businessDocumentCount: state.business.documentCount,
    orderDocumentCount: state.order.documentCount,
    isLoading: state.order.isLoading,
});

const mapDispatch = (dispatch) => ({
    categoryInit: () => {
        dispatch(categoryActionCreators.searchByFilterAsync());
    },
    customerInit: () => {
        dispatch(customerActionCreators.searchByFilterAsync());
    },
    businessInit: () => {
        dispatch(businessActionCreators.searchByFilterAsync());
    },
    orderInit: () => {
        dispatch(orderActionCreators.searchByFilterAsync());
    }
});

export default connect(mapState, mapDispatch)(Home);