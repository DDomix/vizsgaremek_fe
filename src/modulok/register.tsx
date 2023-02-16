import { Component, ReactNode } from "react";
import './css/register.css';
import Login from "./Login";
import { Link } from "react-router-dom";

export default class Register extends Component {
    render(): ReactNode {
        return <div>
            <div className="login-box">
        <h2>Register</h2>
        <form>
            <div className="user-box">
                <input type="text" name="" required/>
                <label>Username</label>
            </div>
            <div className="user-box">
                <input type="email" name="" required/>
                <label>Email address</label>
            </div>
            <div className="user-box">
                <input type="password" name="" required/>
                <label>Password</label>
            </div>
            <div className="user-box">
                <input type="password" name="" required/>
                <label>Password again</label>
                <a className="link-btn" href="/public/login.html">Login</a>
            </div>
            <a href="#" className="asd">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Register
            </a>
        </form>
    </div>
        </div>
    }
}