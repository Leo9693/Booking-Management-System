import React, { Component } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import ErrorAlert from '../common/ErrorAlert';
import { connect } from 'react-redux';
import { addUser } from '../../api/auth';
import { actionCreators } from './store';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            isLoading: false,
            error: null,
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ isLoading: true });
                const { email, password, nickname } = values;
                addUser({ email, password, name: nickname })
                    .then(res => {
                        this.setState({ isLoading: false });
                        this.props.saveRegisterInfo(res);
                        this.props.history.push('/');
                    })
                    .catch(err => {
                        this.setState({ isLoading: false });
                        this.setState({ error: err.response.data })
                    })
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    handleCloseErrorAlert = e => {
        this.setState({ error: null });
    };

    formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4, offset: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
    };

    tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isLoading, error } = this.state;

        return (
            <Spin spinning={isLoading} tip="Loading...">
                {error && (
                    <ErrorAlert
                        description={error}
                        onClose={this.handleCloseErrorAlert}
                    />
                )}
                <Form {...this.formItemLayout} onSubmit={this.handleSubmit} >
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'Please input a valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback onBlur={this.handleConfirmBlur}>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="Nickname">
                        {getFieldDecorator('nickname', {
                            rules: [
                                { required: true, message: 'Please input your nickname!' }
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...this.tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        )
    }
}

const mapDispatch = (dispatch) => ({
    saveRegisterInfo: (registerInfo) => {
        dispatch(actionCreators.saveRegisterInfo(registerInfo));
    }
});

const SignupForm = Form.create({ name: 'register' })(Signup);

export default connect(null, mapDispatch)(SignupForm);