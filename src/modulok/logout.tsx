import { Component, ReactNode } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import './css/profilestyle.css';

interface Props {
    authToken: string;
    onAuthTokenChange: (token: string) => void;
}

export default class Logout extends Component<Props> {
    handleLogout = async () => {
        try {
          // Update the authToken state
          this.props.onAuthTokenChange('');
      
          // Trigger the server-side logout functionality
          const response = await fetch('http://localhost:3000/auth/logout', {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'application/json',
            },
          });

          // Remove the token from local storage
          localStorage.removeItem('authToken');

      
          // Check the response status
          if (response.status === 200) {
            // Logout successful
            // Do any additional cleanup or redirect the user to the login page
          } else {
            // Logout failed
            // Handle the error here
          }
        } catch (error) {
          console.error(error);
          // Handle the error here
        }
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