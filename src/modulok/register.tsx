import React, { FormEvent } from "react";
import { Component, ReactNode } from "react";
import { Link, Route, Routes } from "react-router-dom";
import './css/register.css';
import Login from "./Login";

interface State {
    username: string;
    email: string;
    password: string;
    passwordagain: string;
    Error: string;
}
interface Props {
    authToken: string;
    onAuthTokenChange: (token: string) => void;
}

export default class Register extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordagain: '',
            Error: '',
        }
    }

    componentDidMount(): void {
        const token = localStorage.getItem('authToken');
        if (token !== null) {
            this.props.onAuthTokenChange(token);
        }
    }

    handleregistration = async (e: FormEvent) => {
        e.preventDefault();
        const registerData = {
            'username': this.state.username,
            'email': this.state.email,
            'password': this.state.password,
            'passwordagain': this.state.passwordagain,
        };
        
        
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(registerData),
        });
        
        
        

        if (!response.ok) {
            const responseBody = await response.json();
            if(response.status === 400) {
                window.alert(responseBody.message)
            }
            return;
        }
        else{
            window.alert("successful registration");
        }

        this.setState({
            username: '',
            password: '',
            email: '',
            passwordagain: '',
        })
    }

    render(): ReactNode {

        const { authToken } = this.props;
        const { username, password,email,passwordagain, Error: loginError } = this.state;
        
        return <div>
            <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={this.handleregistration}>
            <div className="user-box">
                <input type="text" name="" required value={username} onChange={(e) => this.setState({ username: e.target.value })}/>
                <label>Username</label>
            </div>
            <div className="user-box">
                <input type="email" name="" required value={email} onChange={(e) => this.setState({ email: e.target.value })}/>
                <label>Email address</label>
            </div>
            <div className="user-box">
                <input type="password" name="" required value={password} onChange={(e) => this.setState({ password: e.target.value })} />
                <label>Password</label>
            </div>
            <div className="user-box">
                <input type="password" name="" required value={passwordagain} onChange={(e) => this.setState({ passwordagain: e.target.value })} />
                <label>Password again</label>
            </div>
            <Link to='/' className="link-btn">Login</Link>
            <button className="asd">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Register
            </button>
        </form>
    </div>
        </div>
    }
}