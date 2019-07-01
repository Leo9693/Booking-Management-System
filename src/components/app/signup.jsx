import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { signup } from '../../api/signup';

class Signup extends Component {

    render() {
        console.log('renderSignup');
        const {signupError, signupName, signupEmail, signupPassword, signupPasswordAgain, history} = this.props;
        return (
            <div className="container">
                <form>
                    <label htmlFor="signupName" className="sr-only">
                        Name:
                    </label>
                    <input required autoFocus
                        type="text" 
                        className="form-control"
                        placeholder="input name..."
                        name="signupName"  
                        value={signupName}
                        onChange={this.props.handleInputChange}     
                    />
                    <label htmlFor="signupEmail" className="sr-only">
                        Email:
                    </label>
                    <input required autoFocus
                        type="email" 
                        className="form-control"
                        placeholder="input email..."
                        name="signupEmail"  
                        value={signupEmail}
                        onChange={this.props.handleInputChange}     
                    />
                    <label htmlFor="signupPassword" className="sr-only">
                        Password:
                    </label>
                    <input required autoFocus
                        type="password" 
                        className="form-control"
                        placeholder="input password..."
                        name="signupPassword"  
                        value={signupPassword}
                        onChange={this.props.handleInputChange}     
                    />
                    <label htmlFor="signupPasswordAgain" className="sr-only">
                        Password:
                    </label>
                    <input required autoFocus
                        type="password" 
                        className="form-control"
                        placeholder="input password again..."
                        name="signupPasswordAgain"  
                        value={signupPasswordAgain}
                        onChange={this.props.handleInputChange}     
                    />
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        onClick={(event) => this.props.handleSubmit(event, signupError, signupName, signupEmail, signupPassword, signupPasswordAgain, history)}
                        // loading={isFetching}
                    >
                        Sign up
                    </button>                   
                </form>
                {signupError && <div>{signupError.response.data}</div>}
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        signupError: state.app.signupError,
        signupName: state.app.signupName,
        signupEmail: state.app.signupEmail,
        signupPassword: state.app.signupPassword,
        signupPasswordAgain: state.app.signupPasswordAgain
    }
}

const mapDispatch = (dispatch) => {
    return {
        handleInputChange: (event) => {
            const target = event.target;
            dispatch(actionCreators.inputChange(target.name, target.value))
        },

        handleSubmit: (event, signupError, signupName, signupEmail, signupPassword, signupPasswordAgain, history) => {
            event.preventDefault();
            if (signupError) {
                dispatch(actionCreators.setSignupError(null));
            }
            if (signupPassword !== signupPasswordAgain) {
                console.log(2);
                dispatch(actionCreators.setSignupError({response: {data: 'Please input same password'}}));
            }
            signup(signupName, signupEmail, signupPassword)
                .then(() => history.replace('/orders'))
                .catch(err => dispatch(actionCreators.setSignupError(err)));
        }
    }
}

export default connect(mapState, mapDispatch)(Signup)