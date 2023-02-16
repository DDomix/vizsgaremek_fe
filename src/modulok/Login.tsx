import { Component, ReactNode } from "react";

import './css/loginstyle.css'

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
                <a className="link-btn" href="/src/modulok/register.tsx">  Register</a>
            </div>
            <a href="#" className="asd">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Login
            </a>
        </form>
    </div>
    }
}