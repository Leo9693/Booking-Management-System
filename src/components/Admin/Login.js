
import { Form, Icon, Input, Button, Modal ,Row, Col} from 'antd';
import React from 'react';
import UserLayout from '../Ui/user';
import {withRouter} from "react-router-dom";
import { login, creatNewUser } from '../../api/auth';

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      visible: false,
    };
  }   

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {        
        login(values).then(auth => {
          this.setState({ isFetching: false });
          this.props.history.push('/');
        });
        console.log('Received values of form: ', values);
      }
    });
  };
  
  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (!err) {
        creatNewUser(values).then(newUser => {
          this.setState({ visible: false });
          // console.log(newUser);
        }).catch(err=>{
          console.log(err.response.data);
          alert(err.response.data);
        })
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      // this.setState({ visible: true });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    <UserLayout>
      <CollectionCreateForm
      wrappedComponentRef={this.saveFormRef}
      visible={this.state.visible}
      onCancel={this.handleCancel}
      onCreate={this.handleCreate}/>
      
    <Row >  
        <Col span={8} offset={8}>
      <Form onSubmit={this.handleSubmit} className="login-form">
      <Form.Item>JR Handyman-CMS DEMO</Form.Item>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username: guest"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password: guest"
            />,
          )}
        </Form.Item>     
        <Form.Item>
        <Row gutter={6} span={24} justify={"space-around"}>
            <Col span={24}>
          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
          </Col>
          <Col span={12}>
          <a className="login-form-forgot" href="">
          <span>Forgot password</span>
          </a>
          </Col >
          <Col span={12}>
          Or <a href='#' onClick={this.showModal} ><span>register now!</span>
          </a>
          </Col>
        </Row>        
        </Form.Item>
        
      </Form>
      </Col>
    </Row>
    </UserLayout>
    );
  }
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new admin user"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Username">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input username' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password">
              {getFieldDecorator('password',
              {
                rules: [{ required: true, message: 'Please input password' }],
              })(<Input type="password" />)}
            </Form.Item>   
          </Form>
        </Modal>
      );
    }
  },
);

export default withRouter(LoginForm);
          