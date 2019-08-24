import React, { Component, Fragment } from 'react';
import StepNavBar from '../common/StepNavBar';
import CustomerFilterAndSelect from '../common/filterAndSelect/CustomerFilterAndSelect';
import CategoryFilterAndSelect from '../common/filterAndSelect/CategoryFilterAndSelect';
import { LARGE, SMALL } from '../../utils/constant';

const stepSetting = [
    {
        title: 'First',
        content: 'Choose-customer',
    },
    {
        title: 'Second',
        content: 'Choose-category',
    },
    {
        title: 'Last',
        content: 'Choose-business',
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

    getCurrentStep = step => {
        this.setState({
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

    render() {
        const { currentStep, screenType, isNextButtonDisabled } = this.state;
        return (
            <Fragment>
                <StepNavBar
                    stepSetting={stepSetting}
                    getCurrentStep={this.getCurrentStep}
                    isNextButtonDisabled={isNextButtonDisabled}
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
                    {currentStep === 2 && <div>Step2</div>}
                </StepNavBar>
            </Fragment>
        )
    }
}