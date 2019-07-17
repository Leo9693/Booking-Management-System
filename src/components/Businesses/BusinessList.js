import React from 'react';
import {createBusiness, fetchBusinessById} from '../../api/business';
import {
  Form,
  Input,
  Select,
  Button,
  AutoComplete,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class BusinessList extends React.Component {
  state = {
    isSaving: false,
    isFetching: false,
    error: null,
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        this.setState({ isSaving: true});

        console.log('Received values of form: ', values);

        createBusiness(values).then(() => {       
            this.setState({isSaving: false});
            this.props.history.replace('/businesses');
        }).catch(error => {
            console.log(error);
          });
      }
    });
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
         <Form.Item label="Business Name">
          {getFieldDecorator('businessName', {
            rules: [
              { 
                required: true, 
                message: 'Please input business name!' 
              }
            ],
          })(<Input />)
          }
        </Form.Item>
    
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [
              { 
                required: true, 
                message: 'Please input your phone number!' 
              }
            ],
          })(<Input style={{ width: '100%' }} />)}
        </Form.Item>
        
        <Form.Item label="ABN">
          {getFieldDecorator('ABN', {
            rules: [
              { 
                required: true, 
                message: 'Please input ABN!' 
              }
            ],
          })(<Input />)
          }
        </Form.Item>

        <Form.Item label="Street Address">
          {getFieldDecorator('streetAddress', {
            rules: [{ required: true, message: 'Please input street address!' }],
          })(   
              <Input />
          )}
        </Form.Item>

         <Form.Item label="State">   
          {getFieldDecorator('state')
          (
            <select>
            <option value="QLD">QLD</option>
            <option value="TAS">TAS</option>
            <option value="WA">WA</option>
            <option value="WA">SA</option>
            <option value="WA">VIC</option>
            <option value="WA">NSW</option>
            <option value="WA">ATC</option>
            <option value="WA">NT</option>
            </select>
            )
          }
        </Form.Item>
      
         <Form.Item label="Postcode">
          {getFieldDecorator('postcode', {
            rules: [
              { 
                required: true, 
                message: 'Please input postcode!' 
              }
            ],
          })(<Input />)
          }
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(BusinessList);
