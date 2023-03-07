import { Component, ReactNode } from "react";
import { Link, Route } from "react-router-dom";

import './css/register.css'

export default class Login extends Component {
    
    
    
    
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