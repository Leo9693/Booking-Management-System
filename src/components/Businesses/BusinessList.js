import React from 'react';
import { Link} from 'react-router-dom';
import {createBusiness, fetchBusinessById, updateBusiness} from '../../api/business';
import {
  Form,
  Input,
  Select,
  Button,
  AutoComplete,
  Row, Col
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
    businesses:{},
  };

  componentDidMount() {
    if (this._isNew()) {
      return ;
    }
    const id = this.props.match.params.id;
    this.setState({ isFetching: true, error: null});
    fetchBusinessById(id)
      .then(data => {
        console.log(data);
        this.setState({ businesses: data});
      })
      .then(()=>{
        const businesses=this.state.businesses;
        this.props.form.setFieldsValue(
            { 
              ABN:`${businesses.ABN}`,
              businessName:`${businesses.businessName}`,
              postcode:`${businesses.postcode}`,
              state:`${businesses.state}`,
              email:`${businesses.email}`,
              streetAddress:`${businesses.streetAddress}`,
              phone:`${businesses.phone}`,
           }      
        )
      })
      .catch(error => {
        this.setState({ isFetching: false, error});
      });
  };

  _isNew = () => {
    const { id } = this.props.match.params;
    return id === 'create';
    }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((error, values) => {
      if (!error) {
          this.setState({ isSaving: true});
          console.log('Received values of form: ', values);
          if(this._isNew()) {
            createBusiness(values).then(() => {       
              this.setState({isSaving: false});
              this.props.history.replace('/businesses');
            }).catch(error => {
              console.log(error);
            });
          } else {
            const { id } = this.props.match.params;
            console.log(id);
            updateBusiness(id ,values).then(()=>{
              this.setState({isSaving: false});
              this.props.history.replace('/businesses');
            }).catch(error => {
              console.log(error);
            });
          }
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
    // const { business, size } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
         <Form.Item label="Business Name">
          {getFieldDecorator('businessName', 
          {
            rules: [
              { 
                required: true, 
                message: 'Please input business name!' 
              }
            ],
          })(<Input/>)
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
          })(<Input/>)}
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
          })(<Input/>)
          }
        </Form.Item>

        <Form.Item label="Street Address">
          {getFieldDecorator('streetAddress', {
            rules: [{ required: true, message: 'Please input street address!' }],
          })(   
              <Input />
          )}
        </Form.Item>

         <Form.Item label="State" >   
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
        <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Link className="bd-link" to={{pathname:`/businesses`}}>
                  <Button type="primary" style={{ marginLeft: 8 }}>Back</Button>
                </Link>
              </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(BusinessList);
