import React from "react";

import {createBusiness, updatebusiness} from '../../api/business';
 // handleChange(event) {
  
  //   this.setState({
  //     [event.target.id]: event.target.value,
  //   })
  // }

  class BusinessList extends Component {
    constructor(props){
      super(props);
      this.state={
    
       
      }  
    }

  handleChange=(event)=>{
    const { name, value } = event.target;

    this.setState((preState) => {
      const business = { ...preState.business };
      business[name] = value;
      return { business };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
   
    console.log(this.state.list);
    console.log(this.state.InputBName);
    console.log(this.state.InputEmail);
    console.log(this.state.InputABN);
    console.log(this.state.InputPhone);
    console.log(this.state.InputStreet);
    console.log(this.state.InputPostcode);
    console.log(this.state.InputState);
    this.setState({
      error: null, 
      list:[...this.state.list, 
        this.state.InputBName,
        this.state.InputEmail,
        this.state.InputABN,
        this.state.InputPhone,
        this.state.InputStreet,
        this.state.InputPostcode,
        this.state.InputState,
        this.state.Check
      ],
    });
  }
}
