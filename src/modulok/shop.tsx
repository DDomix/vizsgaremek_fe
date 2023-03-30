import { Component, FormEvent, ReactNode } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Link } from "react-router-dom";
import './css/shopstyle.css';
import { Button, Card, CardGroup, Col, Row } from "react-bootstrap";
import { type } from "os";

interface State {
    data: Result[];
    color: string;
    type: string;
    size: string;
    team: string;
}
interface Result {
    id: number;
    color: string;
    type: string;
    size: string;
    team: string;
}



export default class Shop extends Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            color: '',
            size: '',
            type: '',
            team: '',
            data: [],
        }
    }


    kereses = async () => {
        const loginData: any = {
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
        if (this.state.type) {
            loginData.type = this.state.type
        }

        const response = await fetch('http://localhost:3000/api/shop', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(loginData),
        });

        const adatok = await response.json() as Result[];
        this.setState({
            data: adatok,
        }, () => { console.log(this.state.data); })

        //console.table(response);
        
    }
    componentDidMount() {
        this.kereses();
      }


    render(): ReactNode {

        const { color, size, team, type } = this.state;

        return <div className="shopstyle">
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
            <div className="dropdown">
                <button className="dropbtn">Méret</button>
                <div className="dropdown-content">
                    <input type="radio" id="S" name="meret" value={size} onChange={(e) => this.setState({ size: e.target.value = "S" })} />S
                    <input type="radio" id="M" name="meret" value={size} onChange={(e) => this.setState({ size: e.target.value = "M" })} />M
                    <input type="radio" id="L" name="meret" value={size} onChange={(e) => this.setState({ size: e.target.value = "L" })} />L
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Szín</button>
                <div className="dropdown-content">
                    <input type="radio" name="szin" value={color} onChange={(e) => this.setState({ color: e.target.value = "Fekete" })} />Fekete
                    <input type="radio" name="szin" value={color} onChange={(e) => this.setState({ color: e.target.value = "Fehér" })} />Fehér
                </div>
            </div>
            
            <div className="dropdown">
                <button className="dropbtn">Típus</button>
                <div className="dropdown-content">
                    <input type="radio" id="T-Shirt" name="team" value={type} onChange={(e) => this.setState({ type: e.target.value = "T-Shirt" })} />T-Shirt
                    <input type="radio" id="Cap" name="team" value={type} onChange={(e) => this.setState({ type: e.target.value = "Cap" })} />Cap
                </div>
            </div>
            <button onClick={this.kereses}>Keresés</button>
            {<Row xs={1} md={4} className="g-4">
                {this.state.data.map((item, idx) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={'/images/shop/'+item.team+ ' '+item.color+ '.jpg'}/>
                            <Card.Body>
                                <Card.Title>{item.team} {item.type}</Card.Title>
                                <Card.Text>
                                  Szín: {item.color}<br/>
                                  Size: {item.size}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>}
        </div>
    }
}
