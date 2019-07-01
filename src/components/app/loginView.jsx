import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {login} from '../../api/auth';

class LoginView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // isFetching: false,
            email: '',
            password: '',
            error: null,
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        this.setState({
            [target.name]: target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const {email, password} = this.state;
        this.setState({
            // isFetching: true,
            error: null,
        });

        login(email, password).
            then(auth => {
            // this.setState({
            //     isFetching: false,
            // });
            this.props.history.replace('/clients');
            }).catch(err => {
                console.log(err.response.data);
                this.setState({
                    error: err,
                })
            });
    }

    render() {
        // const {isFetching, email, password} = this.state;
        const {email, password} = this.state;
        console.log('loginView is rendered');
        return (
            <div className="container">
                {this.state.error && <div>{this.state.error.response.data}</div>}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="inputName" className="sr-only">
                        email:
                    </label>
                    <input type="text" name="email" className="form-control"
                        placeholder="input email" value={email}
                        onChange={this.handleInputChange} required autoFocus
                    ></input>
                    <label htmlFor="inputPassword" className="sr-only">
                        Password: 
                    </label>
                    <input type="password" name="password" className="form-control"
                        value={password} onChange={this.handleInputChange}
                        placeholder="input password" required
                    ></input>

                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                        // loading={isFetching}
                    >
                        Sign in
                    </button>
                </form>
            </div>
        )
    }
}

export default withRouter(LoginView);
