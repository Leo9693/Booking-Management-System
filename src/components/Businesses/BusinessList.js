import React from 'react';
// import axios from 'axios';
// import BusinessEdit from './BusinessEdit';

class BusinessList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      InputBName: '',
      InputEmail: '',
      InputABN: '',
      InputPhone: '',
      InputStreet: '',
      InputPostcode: '',
      InputState: '',
      Check: '',
      list:[]}
  }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);

render() {
  return (
    <div className="col-sm-offset-2 col-sm-10">
       <form>
            <div>
              <p>Please enter your business list</p>
            </div>

            <div className="form-group" onChange={this.handleChange.bind(this)}>
          
              <label htmlFor="InputBName">Business Name</label>
              <input type="text" className="form-control" id="InputBName" placeholder="Business Name" onChange={this.handleChange.bind(this)} />
          
              <label htmlFor="InputEmail">Email address</label>
              <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange.bind(this)}/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            
              <label htmlFor="InputABN">ABN</label>
              <input type="text" className="form-control" id="InputABN" placeholder="ABN" />
              
              <label htmlFor="InputPhone">Phone</label>
              <input type="number" className="form-control" id="InputPhone" placeholder="Phone" onChange={this.handleChange.bind(this)}/>

              <label htmlFor="InputStreet">Street Address</label>
              <input type="text" className="form-control" id="InputStreet" placeholder="Street Address" onChange={this.handleChange.bind(this)}/>

              <label htmlFor="InputPostcode">Postcode</label>
              <input type="number" className="form-control" id="InputPostcode" placeholder="Postcode" onChange={this.handleChange.bind(this)}/>

              <label htmlFor="InputState">State</label>
              <select className="form-control" value={this.state.value} id="InputState" onChange={this.handleChange}>
                <option value="QLD">QLD</option>
                <option value="TAS">TAS</option>
                <option value="WA">WA</option>
                <option value="WA">SA</option>
                <option value="WA">VIC</option>
                <option value="WA">NSW</option>
                <option value="WA">ATC</option>
                <option value="WA">NT</option>
              </select>
              {/* <input type="text" className="form-control" id="InputState" placeholder="State" /> */}
            </div>
            <div className="form-check">
            <input type="checkbox" className="form-check-input" id="Check" onChange={this.handleChange.bind(this)}/>
            <label className="form-check-label" htmlFor="Check">Check me out</label>
          </div>
      <input type="submit" value="Submit" onClick={this.handleSubmit.bind(this)}/>
    </form> 
      <div>
        {
          this.state.list.map((item, index)=>
          {
            return (
              <form key={index}>
                {item}
              </form>
            )
          })
        }
      </div>
    </div> 
  );
 }
  handleChange(event) {
    console.log(event.target.value);
    console.log(event.target.id);
    this.setState({
      [event.target.id]: event.target.value,
    })
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
    })
  }
}

export {BusinessList as default};