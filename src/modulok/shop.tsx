import { getValue } from "@testing-library/user-event/dist/utils";
import { Component, FormEvent, ReactNode } from "react";
import './css/shopstyle.css';

interface State {
    color: string;
    size: string;
    team: string;
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
        const loginData: any = {
            /*'color': this.state.color,
            'size': this.state.size,
            'team': this.state.team,*/
            'name': this.state.name,
        };
        if (this.state.color) {
            loginData.color = this.state.color
        }
        if (this.state.size) {
            loginData.size = this.state.size
        }
        if (this.state.team) {
            loginData.team = this.state.team
        }

        const response = await fetch('http://localhost:3000/api/shop', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(loginData),
        });

        console.table(response);
    }


    render(): ReactNode {

        const { color, size, team } = this.state;

        return <div className="shopstyle">
            <div className="dropdown">
                <button className="dropbtn">Szín</button>
                <div className="dropdown-content">
                    <input type="radio" name="szin" value={color} onChange={(e) => this.setState({ color: e.target.value = "Fekete" })} />Fekete
                    <input type="radio" name="szin" value={color} onChange={(e) => this.setState({ color: e.target.value = "Fehér" })} />Fehér
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Méret</button>
                <div className="dropdown-content">
                    <input type="radio" id="S" name="meret" value={size} onChange={(e) => this.setState({ size: e.target.value = "S" })} />S
                    <input type="radio" id="M" name="meret" value={size} onChange={(e) => this.setState({ size: e.target.value = "M" })} />M
                    <input type="radio" id="L" name="meret" value={size} onChange={(e) => this.setState({ size: e.target.value = "L" })} />L
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Csapat</button>
                <div className="dropdown-content">
                    <input type="radio" id="Red-Bull" name="team" value={team} onChange={(e) => this.setState({ team: e.target.value = "Red-Bull" })} />Red-Bull
                    <input type="radio" id="Mercedes" name="team" value={team} onChange={(e) => this.setState({ team: e.target.value = "Mercedes" })} />Mercedes
                    <input type="radio" id="Ferrari" name="team" value={team} onChange={(e) => this.setState({ team: e.target.value = "Ferrari" })} />Ferrari
                    <input type="radio" id="McLaren" name="team" value={team} onChange={(e) => this.setState({ team: e.target.value = "McLaren" })} />McLaren
                    <input type="radio" id="Alpine" name="team" value={team} onChange={(e) => this.setState({ team: e.target.value = "Alpine" })} />Alpine
                    <input type="radio" id="Aston Martin" name="team" value={team} onChange={(e) => this.setState({ team: e.target.value = "Aston Martin" })} />Aston Martin
                    <input type="radio" id="Alpha Tauri" name="team" value={team} onChange={(e) => this.setState({ team: e.target.value = "Alpha Tauri" })} />Alpha Tauri
                    <input type="radio" id="Alfa Romeo" name="team" value={team} onChange={(e) => this.setState({ team: e.target.value = "Alfa Romeo" })} />Alfa Romeo
                    <input type="radio" id="Haas" name="team" value={team} onChange={(e) => this.setState({ team: e.target.value = "Haas" })} />Haas
                    <input type="radio" id="Williams" name="team" value={team} onChange={(e) => this.setState({ team: e.target.value = "Williams" })} />Williams
                </div>
            </div>
            <button onClick={this.kereses}>Keresés</button>
        </div>
    }
}