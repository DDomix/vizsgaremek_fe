import { Component, FormEvent, ReactNode } from "react";
import { Link, Route } from "react-router-dom";

import './css/register.css'

interface State {
    username: string;
    password: string;
    loginError: string;
}

interface Props {
    authToken: string;
    onAuthTokenChange: (token: string) => void;
}

export default class Login extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginError: '',
        }
    }
    
    handleLogout = () => {
        localStorage.removeItem('authToken');
        this.props.onAuthTokenChange('');
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
            if (response.status === 401) {
                this.setState({ loginError: 'Hibás név vagy jelszó' });
            } else {
                this.setState({ loginError: 'Szerver hiba' });
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
    }

    render(): ReactNode {

        return <div className="login-box">
        <h2>Login</h2>
        <form>
            <div className="user-box">
                <input type="text" name="" required />
                <label>Username</label>
            </div>
            <div className="user-box">
                <input type="password" name="" required />
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