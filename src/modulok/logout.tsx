import { Component, ReactNode } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import './css/profilestyle.css';

interface Props {
    authToken: string;
    onAuthTokenChange: (token: string) => void;
}

export default class Logout extends Component<Props> {
    handleLogout = () => {
        localStorage.removeItem('authToken');
        this.props.onAuthTokenChange('');
    }

    render(): ReactNode {

        if (this.props.authToken !== '') {
            return <Dropdown className="profile">
                <Dropdown.Toggle>
                    
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item><Link to='/'><button onClick={this.handleLogout} className="logoutbutton">Logout</button></Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        }

    }
}
