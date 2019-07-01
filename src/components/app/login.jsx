import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { login } from '../../api/auth';

class Login extends Component {

    render() {
        const {loginError, loginEmail, loginPassword, history} = this.props;
        return (
            <div className="container">
                {loginError && <div>{loginError.response.data}</div>}
                <form>
                    <label 
                        htmlFor="inputName" 
                        className="sr-only"
                    >
                        email:
                    </label>
                    <input 
                        type="email" 
                        name="loginEmail" 
                        className="form-control"
                        placeholder="input email" 
                        value={loginEmail}
                        onChange={this.props.handleInputChange} 
                        required 
                        autoFocus
                    />
                    <label 
                        htmlFor="inputPassword" 
                        className="sr-only"
                    >
                        Password: 
                    </label>
                    <input 
                        type="password" 
                        name="loginPassword" 
                        className="form-control"
                        value={loginPassword} 
                        onChange={this.props.handleInputChange}
                        placeholder="input password" 
                        required
                    />
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        onClick={(event) => this.props.handleSubmit(event, loginEmail, loginPassword, loginError, history)}
                        // loading={isFetching}
                    >
                        Sign in
                    </button>
                </form>
            </div>            
        )
    }
}

const mapState = (state) => {
    return {
        loginEmail: state.app.loginEmail,
        loginPassword: state.app.loginPassword,
        loginError: state.app.loginError
    }
};

const mapDispatch = (dispatch) => {
    return {
        handleInputChange: (event) => {
            const target = event.target;
            dispatch(actionCreators.inputChange(target.name, target.value));
        },

        handleSubmit: (event, loginEmail, loginPassword, loginError, history) => {
            event.preventDefault();
            console.log(loginError);
            if (loginError) {
                console.log('loginError');
                dispatch(actionCreators.setError(null));
            }
            login(loginEmail, loginPassword)
                .then(() => history.replace('/orders'))
                .catch(err => dispatch(actionCreators.setError(err)));
            //dispatch(actionCreators.loginSubmit(loginEmail, loginPassword));

        }
    //     //     login(email, password).
    //     //         then(auth => {
    //     //         // this.setState({
    //     //         //     isFetching: false,
    //     //         // });
    //     //         this.props.history.replace('/clients');
    //     //         }).catch(err => {
    //     //             console.log(err.response.data);
    //     //             this.setState({
    //     //                 error: err,
    //     //             })
    //     //         });
    //     //     }
    }
};

export default connect(mapState, mapDispatch)(Login)