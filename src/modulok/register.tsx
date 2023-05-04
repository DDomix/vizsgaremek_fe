import React, { FormEvent } from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import './css/register.css';
import { toast } from "react-toastify";

interface State {
    username: string;
    email: string;
    password: string;
    passwordagain: string;
    Error: string;
}

export default class Register extends React.Component<{}, State> {
    
    constructor(props: {}) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordagain: '',
            Error: '',
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
        
        
        const response = await fetch('http://localhost:3000/auth/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(registerData),
        });
        
        
        

        if (!response.ok) {
            const responseBody = await response.json();
            if(response.status === 400) {
                (toast.warn(responseBody.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  }));
            }
            return;
        }
        else{
            toast.success('Successful Registration', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }

        this.setState({
            username: '',
            password: '',
            email: '',
            passwordagain: '',
        })
    }

    render(): ReactNode {

        const { username, password,email,passwordagain } = this.state;
        
        return <div className="nemtom">
            <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={this.handleregistration}>
            <div className="userr-box">
                <input type="text" name="" required value={username} onChange={(e) => this.setState({ username: e.target.value })}/>
                <label>Username</label>
            </div>
            <div className="userr-box">
                <input type="email" name="" required value={email} onChange={(e) => this.setState({ email: e.target.value })}/>
                <label>Email address</label>
            </div>
            <div className="userr-box">
                <input type="password" name="" required value={password} onChange={(e) => this.setState({ password: e.target.value })} />
                <label>Password</label>
            </div>
            <div className="userr-box">
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