import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Form, Input, Button } from 'antd';
import ErrorAlert from '../common/ErrorAlert';
import { actionCreators } from './store';
import { logout, getUserID, updatePassword } from '../../api/auth';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            isLoading: false,
            error: null,
            id: '',
        }
    }

    componentDidMount() {
        this.setState({
            id: getUserID()
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ isLoading: true });
                const { original: originalPassword, password: newPassword } = values;
                const { id } = this.state;
                updatePassword({ id, originalPassword, newPassword })
                    .then(res => {
                        this.setState({ isLoading: false });
                        logout()
                            .then(this.props.history.replace('/'));
                    })
                    .catch(err => {
                        this.setState({ isLoading: false });
                        this.setState({ error: err.response.data });
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
            sm: { span: 8, offset: 4 },
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
                    <Form.Item
                        label="Original Password"
                        hasFeedback
                    >
                        {getFieldDecorator(
                            'original',
                            {
                                rules: [
                                    { required: true, message: 'Please input your origianl password!' }
                                ],
                            }
                        )(
                            <Input.Password />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="New Password"
                        hasFeedback
                    >
                        {getFieldDecorator(
                            'password',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input new password!',
                                    },
                                    {
                                        validator: this.validateToNextPassword,
                                    },
                                ],
                            }
                        )(
                            <Input.Password />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Confirm New Password"
                        hasFeedback
                        onBlur={this.handleConfirmBlur}
                    >
                        {getFieldDecorator(
                            'confirm',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please confirm new password!',
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    },
                                ],
                            }
                        )(
                            <Input.Password />
                        )}
                    </Form.Item>
                    <Form.Item {...this.tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 40 }}>
                            Update
                        </Button>
                        <Button onClick={() => this.props.history.goBack()}>
                            Cancel
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

const ChangePasswordForm = Form.create({ name: 'change-password' })(ChangePassword);
export default connect(null, mapDispatch)(ChangePasswordForm);