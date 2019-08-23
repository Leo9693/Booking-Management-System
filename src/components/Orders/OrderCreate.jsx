import React, { Component, Fragment } from 'react';
import StepNavBar from '../Ui/StepNavBar';

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
        }
    }

    getCurrentStep = step => {
        this.setState({
            currentStep: step,
        })
    }

    render() {
        const { currentStep } = this.state;
        return (
            <Fragment>
                <StepNavBar stepSetting={stepSetting} getCurrentStep={this.getCurrentStep}>
                    {currentStep === 0 && <div>Step0</div>}
                    {currentStep === 1 && <div>Step1</div>}
                    {currentStep === 2 && <div>Step2</div>}
                </StepNavBar>
            </Fragment>
        )
    }
}