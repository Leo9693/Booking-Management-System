import React from 'react';
import { Statistic, Row, Col, Card, Icon } from 'antd';
import { connect } from 'react-redux';
import { actionCreators as CategoryActionCreators } from './category/store';

const PUBLIC_URL = process.env.PUBLIC_URL;
const styles = {
    cover: {
      width: '100%',
      height: "100%"
    },
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerDocumentsCount: 0,
            businessDocumentsCount: 0,
            orderDocumentsCount: 15,
        }
    }
    
    componentDidMount() {
        console.log('hahahahah');
        console.log(this.props.categoryDocumentsCount);
        if (!this.props.categoryDocumentsCount || this.props.categoryDocumentsCount === 0) {
            this.props.handleSearch();
        }
        if (this.state.businessDocumentsCount === 0) {
            const businessDocumentsCount = this.getCount('businesses');
            this.setState({
                businessDocumentsCount: businessDocumentsCount
            })
        }
        if (this.state.customerDocumentsCount === 0 ) {
            const customerDocumentsCount = this.getCount('customers');
            this.setState({
                customerDocumentsCount: customerDocumentsCount
            })
        }
    }

    getCount = (collectionType) => {
        switch (collectionType) {
            case 'businesses':
                return console.log('businesses');
            case 'customers':
                return console.log('customers');
            default: return;
        }
    }

    render(){
         
        return (
            <div>
                <h2 style={{textAlign: "center"}}>Welcome to JR Handyman CMS</h2>
                <div style={{margin: '100px' }}>
                    <Row gutter={16} style={{margin: '50px' }} align="bottom">
                        <Col span={12}>
                            <Row>
                                <Col span={8}>
                                    <img src={`${PUBLIC_URL}/business.png`} style={styles.cover} alt=""/>
                                </Col>
                                <Col span={14} offset={2}>

                                        <Statistic
                                            title="Handymen Online"
                                            value={11.28}
                                            valueStyle={{ color: '#3f8600' }}
                                            prefix={<Icon type="arrow-up" />}
                                        />

                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={8}>
                                    <img src={`${PUBLIC_URL}/customer.png`} style={styles.cover} alt=""/>
                                </Col>
                                <Col span={14} offset={2}>
                                        <Statistic
                                            title="Customers Online"
                                            value={11.28}
                                            valueStyle={{ color: '#3f8600' }}
                                            prefix={<Icon type="arrow-up" />}
                                        />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{margin: '50px' }}>
                        <Col span={12}>
                            <Row>
                                <Col span={8}>
                                    <img src={`${PUBLIC_URL}/order.png`} style={styles.cover} alt=""/>
                                </Col>
                                <Col span={14} offset={2}>

                                        <Statistic
                                            title="Total Orders"
                                            value={11.28}
                                            valueStyle={{ color: '#3f8600' }}
                                            prefix={<Icon type="arrow-up" />}
                                        />

                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={8}>
                                    <img src={`${PUBLIC_URL}/category.png`} style={styles.cover} alt=""/>
                                </Col>
                                <Col span={14} offset={2}>
                                        <Statistic
                                            title="Total Categories"
                                            value={this.props.categoryDocumentsCount}
                                            valueStyle={{ color: '#3f8600' }}
                                            prefix={<Icon type="arrow-up" />}
                                        />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>            
        )
    }
}

const mapState = (state) => ({
    categoryDocumentsCount: state.category.documentsCount,
});

const mapDispatch = (dispatch) => ({
    handleSearch: () => {
        console.log('mapDispatch - handleSearch')
        dispatch(CategoryActionCreators.setError(''));
        dispatch(CategoryActionCreators.handleSearch());
    },
});

export default connect(mapState, mapDispatch)(Home);
    