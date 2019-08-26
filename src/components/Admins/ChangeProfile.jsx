import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Form, Input, Button } from 'antd';
import ErrorAlert from '../common/ErrorAlert';
import { actionCreators } from './store';
import { getUserEmail, getUserName, updateUser, getUserID } from '../../api/auth';

class ChangeProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            error: null,
            email: '',
            name: '',
            id: null
        }
    }

    componentDidMount() {
        this.setState({
            email: getUserEmail(),
            name: getUserName(),
            id: getUserID()
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ isLoading: true });
                const { email, name } = values;
                const { id } = this.state;
                updateUser({ id, email, name })
                    .then(res => {
                        this.setState({ isLoading: false });
                        this.props.saveRegisterInfo(res);
                        this.props.history.goBack();
                    })
                    .catch(err => {
                        this.setState({ isLoading: false });
                        this.setState({ error: err.response.data });
                    })
            }
        });
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
        const { isLoading, error, email, name } = this.state;

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
                        {getFieldDecorator(
                            'email',
                            {
                                initialValue: email,
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
                            }
                        )(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="Nickname">
                        {getFieldDecorator(
                            'name',
                            {
                                initialValue: name,
                                rules: [
                                    { required: true, message: 'Please input your nickname!' }
                                ],
                            }
                        )(
                            <Input />
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

const mapState = (state) => {
    return ({
        userName: state.admin.name,
        userEmail: state.admin.email
    })
};

const mapDispatch = (dispatch) => ({
    saveRegisterInfo: (registerInfo) => {
        dispatch(actionCreators.saveRegisterInfo(registerInfo));
    }
});

const ChangeProfileForm = Form.create({ name: 'change-profile' })(ChangeProfile);
export default connect(null, mapDispatch)(ChangeProfileForm);