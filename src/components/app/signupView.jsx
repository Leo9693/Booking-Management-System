import React from 'react';
import {Form, Button, Row, Col, Container} from 'react-bootstrap';
import {handleSignup} from '../../api/handleSignup';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        this.setState({
            [target.name]: target.value,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {name, email, password} = this.state;
        console.log(name + email + password);
        handleSignup(name, email, password)
            .then(() => this.props.history.replace('/'));
    }

    render() {
        return (
            <Container className="mt-5">
            <Form  validated onSubmit={this.handleSubmit} className="mx-5">
                <Form.Group as={Row}>
                    <Form.Label  column sm={3}>Admin name</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            required type="text" placeholder="input your name"
                            name="name" onChange={this.handleInputChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label  column sm={3}>Email address</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            required type="email" placeholder="input your email"
                            name="email" onChange={this.handleInputChange} />
                    </Col>
                    <Form.Text className="ml-3 text-primary">
                        Email address must be unique.
                    </Form.Text>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label  column sm={3}>Password</Form.Label>
                    <Col sm={9}>
                        <Form.Control 
                            required type="password" placeholder="input your password"
                            name="password" onChange={this.handleInputChange} />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign up
                </Button>
            </Form>
            </Container>
        )
    }
}

export default Signup;

// import React, {Component} from 'react';
// import {withRouter} from 'react-router-dom';
// import {login} from '../../api/auth';

// class LoginView extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             // isFetching: false,
//             email: '',
//             password: '',
//         };
//     }

//     handleInputChange = (event) => {
//         const target = event.target;
//         this.setState({
//             [target.name]: target.value,
//         });
//     }

//     handleSubmit = (event) => {
//         event.preventDefault();

//         const {email, password} = this.state;
//         // this.setState({
//         //     isFetching: true,
//         // });

//         login(email, password).then(auth => {
//             // this.setState({
//             //     isFetching: false,
//             // });
//             this.props.history.replace('/');
//         });
//     }

//     render() {
//         // const {isFetching, email, password} = this.state;
//         const {email, password} = this.state;
//         console.log('loginView is rendered');
//         return (
//             <div className="container">
//                 <form onSubmit={this.handleSubmit}>
//                     <label htmlFor="inputName" className="sr-only">
//                         email:
//                     </label>
//                     <input type="text" name="email" className="form-control"
//                         placeholder="input email" value={email}
//                         onChange={this.handleInputChange} required autoFocus
//                     ></input>
//                     <label htmlFor="inputPassword" className="sr-only">
//                         Password: 
//                     </label>
//                     <input type="password" name="password" className="form-control"
//                         value={password} onChange={this.handleInputChange}
//                         placeholder="input password" required
//                     ></input>

//                     <button
//                         className="btn btn-lg btn-primary btn-block"
//                         type="submit"
//                         // loading={isFetching}
//                     >
//                         Sign in
//                     </button>
//                 </form>
//             </div>
//         )
//     }
// }

// export default withRouter(LoginView);

// //export default SigninView;