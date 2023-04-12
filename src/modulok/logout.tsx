import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

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
       
       if(this.props.authToken!==''){
            return <Link to='/'><button onClick={this.handleLogout} className="logoutbutton">Logout</button></Link>
       }
        
    }
}
