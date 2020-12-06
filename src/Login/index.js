import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';

const LoginPage = () => (
    <div>
        <h1>Login</h1>
        <LoginForm/>
        <SignUpLink/>
    </div>
)

const INITIAL_STATE = {
    email: "",
    password: "",
    error: null
}

class LoginFormBase extends Component {
    constructor(props){
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    // update the state every time a value changes
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    // form submit method
    onSubmit = (event) => {
        // unpack variables from event (from form)
        const { email, password } = this.state;
        // attempt login with firebase
        this.props.firebase
            .doSignInWithEmailAndPassword(email,password) // returns promise we will now handle
                // successful authentication
                .then(() => {
                    this.setState({...INITIAL_STATE}); // reset form
                    this.props.history.push('../'); // return to palette list
                })
                // authentication failure
                .catch(error => {
                    this.setState({ error });
                });
        // stop the page from refreshing
        event.preventDefault();
    };

    // render form
    render(){
        // unpack state
        const { email, password, error } = this.state;
        // check if valid input

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="email"
                    placeholder="Email Address"
                    required
                />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
                {error && <p>error.message</p>}
            </form>
        )
    }
}

const LoginLink = () => (
    <Link to="/Login">Login</Link>
)

const LoginForm = withRouter(withFirebase(LoginFormBase))

export default LoginPage;

export { LoginForm, LoginLink };