import React, { Component, Fragment } from 'react';
import StepNavBar from '../common/StepNavBar';
import { message } from 'antd';
import { Table, Form, Row, Col } from 'react-bootstrap';
import CustomerFilterAndSelect from '../common/filterAndSelect/CustomerFilterAndSelect';
import CategoryFilterAndSelect from '../common/filterAndSelect/CategoryFilterAndSelect';
import BusinessFilterAndSelect from '../common/filterAndSelect/BusinessFilterAndSelect';
import { addDocument as addDocumentAsync } from '../../api/orders';
import ErrorAlert from '../common/ErrorAlert';
import { LARGE, SMALL } from '../../utils/constant';

const stepSetting = [
    {
        title: 'Choose a customer',
        content: 'customer',
    },
    {
        title: 'Choose a service',
        content: 'category',
    },
    {
        title: 'Choose a business',
        content: 'business',
    },
    {
        title: 'Confirm and set location',
        content: 'confirm',
    },
];

export default class OrderCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            screenType: LARGE,
            isNextButtonDisabled: true,
            selectedCustomer: {},
            selectedCategory: {},
            selectedBusiness: {},
            jobLocation: '',
            error: null,
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        if (window.innerWidth < 576) {
            this.setState({
                screenType: SMALL
            })
        }
    }

    handleResize = event => {
        if (event.target.innerWidth >= 576) {
            this.setState({
                screenType: LARGE
            })
        } else {
            this.setState({
                screenType: SMALL
            })
        }
    }

    handleInputChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            error: null,
        })
    }

    getCurrentStep = step => {
        this.setState({
            error: null,
            currentStep: step,
            isNextButtonDisabled: true,
        })
    }

    getSelectedCustomer = selectedCustomer => {
        this.setState({
            selectedCustomer,
            isNextButtonDisabled: false
        })
    }

    getSelectedCategory = selectedCategory => {
        this.setState({
            selectedCategory,
            isNextButtonDisabled: false
        })
    }

    getSelectedBusiness = selectedBusiness => {
        this.setState({
            selectedBusiness,
            isNextButtonDisabled: false
        })
    }

    handleClickCreate = event => {
        this.setState({
            error: null,
        })
        const { selectedCustomer, selectedBusiness, selectedCategory, jobLocation } = this.state;
        const newDocument = {
            customer: selectedCustomer.name,
            business: selectedBusiness.name,
            category: selectedCategory.name,
            jobLocation
        };
        addDocumentAsync(newDocument)
            .then(res => {
                message.success('A new order has been succefully created.')
                this.props.history.push('/orders');
            })
            .catch(err => {
                this.setState({ error: err.response.data });
            })
    }

    render() {
        const { error, jobLocation, currentStep, screenType, isNextButtonDisabled, selectedCustomer, selectedBusiness, selectedCategory } = this.state;
        return (
            <Fragment>
                {error && (
                    <ErrorAlert
                        description={error}
                        onClose={() => this.setState({ error: null })}
                    />
                )}
                <StepNavBar
                    stepSetting={stepSetting}
                    getCurrentStep={this.getCurrentStep}
                    onClickCreate={this.handleClickCreate}
                    isNextButtonDisabled={isNextButtonDisabled}
                    isCreateButtonDisabled={!jobLocation}
                >
                    {currentStep === 0 &&
                        <CustomerFilterAndSelect
                            screenType={screenType}
                            getSelectedDocument={this.getSelectedCustomer}
                        />
                    }
                    {currentStep === 1 &&
                        <CategoryFilterAndSelect
                            screenType={screenType}
                            getSelectedDocument={this.getSelectedCategory}
                        />
                    }
                    {currentStep === 2 &&
                        <BusinessFilterAndSelect
                            screenType={screenType}
                            getSelectedDocument={this.getSelectedBusiness}
                        />}
                    {currentStep === 3 &&
                        <div style={{ maxWidth: "600px", margin: "auto", padding: "10px" }}>
                            <p>
                                Please confirm the new order info and input job location.
                            </p>
                            <Table bordered hover responsive>
                                <tbody>
                                    <tr>
                                        <th>Customer</th>
                                        <td>{selectedCustomer.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Category</th>
                                        <td>{selectedCategory.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Business</th>
                                        <td>{selectedBusiness.name}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Form validated>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={3}>Job location</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder={`Please input job location`}
                                            value={jobLocation}
                                            name="jobLocation"
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    }
                </StepNavBar>
            </Fragment>
        )
    }
}