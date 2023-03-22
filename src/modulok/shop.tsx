import { getValue } from "@testing-library/user-event/dist/utils";
import { Component, FormEvent, ReactNode } from "react";
import './css/shopstyle.css';

interface State {
    color:string;
    size:string;
    team:string;
    name: string;
}


export default class Shop extends Component<{}, State> {
    
    constructor(props: {}) {
        super(props);
        this.state = {
            color: '',
            size: '',
            team: '',
            name: '',
        }
    }


    kereses = async (e: FormEvent) => {
        e.preventDefault();
        console.log(e)
        const loginData = {
            'color': this.state.color,
            'size': this.state.size,
            'team': this.state.team,
            'name': this.state.name,
        };
        
        const response = await fetch('http://localhost:3000/api/shop', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            //body: JSON.stringify(loginData),
        });

        console.log(response);
    }


    render(): ReactNode {

        const { color, size } = this.state;
        
        return <div className="shopstyle">
            <input type="radio" name="szin" value={color} onChange={(e) => this.setState({ color: e.target.value="Fekete" })}/>Fekete
            <input type="radio" name="szin" value={color} onChange={(e) => this.setState({ color: e.target.value="Fehér" })}/>Fehér
            <br/>
            <input type="radio" id="S" name="meret" value={size} onChange={(e) => this.setState({ size: e.target.value="S" })} />S
            <input type="radio" id="M" name="meret" value={size} onChange={(e) => this.setState({ size: e.target.value="M" })} />M
            <input type="radio" id="L" name="meret" value={size} onChange={(e) => this.setState({ size: e.target.value="L" })} />L

            <button onClick={this.kereses}>Keresés</button>
        </div>
    }
}