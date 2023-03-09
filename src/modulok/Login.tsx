import { Component, FormEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import { RouterProp, withRouter } from "../withRouter";

import './css/register.css'

interface State {
    username: string;
    password: string;
    loginError: string;
}

interface Props {
    authToken: string;
    router: RouterProp;
    onAuthTokenChange: (token: string) => void;
}

class Login extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginError: '',
        }
    }
    

    handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        const loginData = {
            'username': this.state.username,
            'password': this.state.password,
        };
        

        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(loginData),
        });
        
        if (!response.ok) {
            const responseBody = await response.json();
            if(response.status === 401) {
                window.alert(responseBody.message)
            }
            return;
        }
        const responseBody = await response.json();
        localStorage.setItem('authToken', responseBody.token);
        
        this.setState({
            username: '',
            password: '',
            loginError: '',
        })
        this.props.onAuthTokenChange(responseBody.token);
        
        this.props.router.navigate('/f1');
    }

    render(): ReactNode {

        const { username, password } = this.state;

        return <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={this.handleLogin}>
            <div className="user-box">
                <input type="text" name="" required value={username} onChange={(e) => this.setState({ username: e.target.value })}/>
                <label>Username</label>
            </div>
            <div className="user-box">
                <input type="password" name="" required value={password} onChange={(e) => this.setState({ password: e.target.value })} />
                <label>Password</label>
            </div>
            <Link to='/register' className="link-btn">Register</Link>
            <button className="asd">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Login
            </button>
        </form>
    </div>
    }
}

export default withRouter(Login);
