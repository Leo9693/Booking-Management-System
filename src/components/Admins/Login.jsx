import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Spin } from 'antd';
import ErrorAlert from '../common/ErrorAlert';
import { Link } from 'react-router-dom'
import { actionCreators } from './store';
import { login } from '../../api/auth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            error: null,
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ isLoading: true });
                const { username, password } = values;
                login(username, password)
                    .then(res => {
                        this.setState({ isLoading: false });
                        this.props.saveLoginInfo(res);
                        this.props.history.push('/');
                    })
                    .catch(err => {
                        this.setState({ isLoading: false });
                        this.setState({ error: err.response.data })
                    })
            }
        });
    };

    handleCloseErrorAlert = e => {
        this.setState({ error: null });
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
                <Form onSubmit={this.handleSubmit} id="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input admin name!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="name"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                    </Button>
                        Or <Link to='/admin/signup'>register now!</Link>
                    </Form.Item>
                </Form>
            </Spin>
        );
    }
}

const LoginForm = Form.create({ name: 'normal_login' })(Login);

const mapDispatch = (dispatch) => ({
    saveLoginInfo: (loginInfo) => {
        dispatch(actionCreators.saveLoginInfo(loginInfo));
    }
});

export default connect(null, mapDispatch)(LoginForm)