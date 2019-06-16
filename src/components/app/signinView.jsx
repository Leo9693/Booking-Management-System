import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {login} from '../../api/auth';

class SigninView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: false,
            email: '',
            password: '',
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
            isFetching: true,
        });

        login(email, password).then(auth => {
            this.setState({
                isFetching: false,
            });

            this.props.history.push('/');
        });
    }

    render() {
        const {isFetching, email, password} = this.state;

        return (
            <div className="container">
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

export default withRouter(SigninView);

//export default SigninView;