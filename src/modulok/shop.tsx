import { ChangeEvent, Component, FormEvent, ReactNode, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './css/shopstyle.css';
import { Button, Card, Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";


interface State {
    data: Result[];
    color: string;
    type: string;
    size: string;
    team: string;
    price: number;
    quantity: number;
}
interface Result {
    id: number;
    color: string;
    type: string;
    size: string;
    team: string;
    price: number;
    quantity: number;
}
interface Token {
    authToken: string;
    onAuthTokenChange: (token: string) => void;
} 


export default class Shop extends Component<Token, State> {

    constructor(props: Token) {
        super(props);
        this.state = {
            color: '',
            size: '',
            type: '',
            team: '',
            price: 0,
            quantity: 0,
            data: [],
        }
    }


    kereses = async () => {
        const filterData: any = {
        };
        if (this.state.color) {
            filterData.color = this.state.color
        }
        if (this.state.size) {
            filterData.size = this.state.size
        }
        if (this.state.team) {
            filterData.team = this.state.team
        }
        if (this.state.type) {
            filterData.type = this.state.type
        }
        console.log(filterData)
        const response = await fetch('http://localhost:3000/api/shop', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(filterData),
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

    async productpage(e: FormEvent) {
        const id = e.currentTarget.id;
        console.log(id);
        let response = await fetch('http://localhost:3000/api/shop/'+id,{
            method:'GET',
            headers: {
                'Content-type': 'application/json'
            },
        });
        console.log(response)
    }
    filterdelete=async ()=> {
        console.log(this)
        await this.setState({team:'', type:'', color:'', size:''})
        this.kereses();
    }

    addtocart(){
        
    }


    render(): ReactNode {

        const { color, size, team, type } = this.state;

        if (this.props.authToken === '') {
            return <Navigate to='/'/>
        } return <div className="shopstyle">
            {/* <input type="search" placeholder="Csapat" onChange={(e) => this.setState({ team: e.target.value })}/> */}
            <div className="dropdown">
                <button className="dropbtn">Csapat</button>
                <div className="dropdown-content">
                    <input type="radio" id="Red-Bull" name="team" value={team} checked={this.state.team==='Red-Bull'} onChange={(e) => this.setState({ team: e.target.value = "Red-Bull" })} />Red-Bull
                    <input type="radio" id="Mercedes" name="team" value={team} checked={this.state.team==='Mercedes'} onChange={(e) => this.setState({ team: e.target.value = "Mercedes" })} />Mercedes
                    <input type="radio" id="Ferrari" name="team" value={team} checked={this.state.team==='Ferrari'} onChange={(e) => this.setState({ team: e.target.value = "Ferrari" })} />Ferrari
                    <input type="radio" id="McLaren" name="team" value={team} checked={this.state.team==='McLaren'} onChange={(e) => this.setState({ team: e.target.value = "McLaren" })} />McLaren
                    <input type="radio" id="Alpine" name="team" value={team} checked={this.state.team==='Alpine'} onChange={(e) => this.setState({ team: e.target.value = "Alpine" })} />Alpine
                    <input type="radio" id="Aston Martin" name="team" value={team} checked={this.state.team==='Aston Martin'} onChange={(e) => this.setState({ team: e.target.value = "Aston Martin" })} />Aston Martin
                    <input type="radio" id="Alpha Tauri" name="team" value={team} checked={this.state.team==='Alpha Tauri'} onChange={(e) => this.setState({ team: e.target.value = "Alpha Tauri" })} />Alpha Tauri
                    <input type="radio" id="Alfa Romeo" name="team" value={team} checked={this.state.team==='Alfa Romeo'} onChange={(e) => this.setState({ team: e.target.value = "Alfa Romeo" })} />Alfa Romeo
                    <input type="radio" id="Haas" name="team" value={team} checked={this.state.team==='Haas'} onChange={(e) => this.setState({ team: e.target.value = "Haas" })} />Haas
                    <input type="radio" id="Williams" name="team" value={team} checked={this.state.team==='Williams'} onChange={(e) => this.setState({ team: e.target.value = "Williams" })} />Williams
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Méret</button>
                <div className="dropdown-content">
                    <input type="radio" id="S" name="meret" value={size} onChange={(e) => this.setState({ size: e.target.value = "XS" })} />XS
                    <input type="radio" id="S" name="meret" value={size} onChange={(e) => this.setState({ size: e.target.value = "S" })} />S
                    <input type="radio" id="M" name="meret" value={size} onChange={(e) => this.setState({ size: e.target.value = "M" })} />M
                    <input type="radio" id="L" name="meret" value={size} onChange={(e) => this.setState({ size: e.target.value = "L" })} />L
                    <input type="radio" id="S" name="meret" value={size} onChange={(e) => this.setState({ size: e.target.value = "XL" })} />XL
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Szín</button>
                <div className="dropdown-content">
                    <input type="radio" name="szin" value={color} onChange={(e) => this.setState({ color: e.target.value = "Fekete" })} />Fekete
                    <input type="radio" name="szin" value={color} onChange={(e) => this.setState({ color: e.target.value = "Fehér" })} />Fehér
                    <input type="radio" name="szin" value={color} onChange={(e) => this.setState({ color: e.target.value = "Piros" })} />Piros
                    <input type="radio" name="szin" value={color} onChange={(e) => this.setState({ color: e.target.value = "Sárga" })} />Sárga
                    <input type="radio" name="szin" value={color} onChange={(e) => this.setState({ color: e.target.value = "Narancs" })} />Narancs
                    <input type="radio" name="szin" value={color} onChange={(e) => this.setState({ color: e.target.value = "Zöld" })} />Zöld
                    <input type="radio" name="szin" value={color} onChange={(e) => this.setState({ color: e.target.value = "Kék" })} />Kék
                </div>
            </div>
            
            <div className="dropdown">
                <button className="dropbtn">Típus</button>
                <div className="dropdown-content">
                    <input type="radio" id="T-Shirt" name="team" value={type} onChange={(e) => this.setState({ type: e.target.value = "T-Shirt" })} />T-Shirt
                    <input type="radio" id="Cap" name="team" value={type} onChange={(e) => this.setState({ type: e.target.value = "Cap" })} />Cap
                    <input type="radio" id="Cap" name="team" value={type} onChange={(e) => this.setState({ type: e.target.value = "Hoodie" })} />Hoodie
                </div>
            </div>
            <button onClick={this.kereses}>Keresés</button>
            <button onClick={this.filterdelete}>Feltételek törlése</button>
            {<Row xs={1} md={4} className="g-4">
                {this.state.data.map((item) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={'/images/shop/'+item.team+ ' '+item.type+ ' ' +item.color+ '.jpg'}/>
                            <Card.Body>
                                <Card.Title>{item.team} {item.type}</Card.Title>
                                <Card.Text>
                                  Szín: {item.color}<br/>
                                  Size: {item.size}
                                </Card.Text>
                                <Card.Text style={{float: "right", color: "green", width: "fit-content"}}>
                                    Price: {item.price} Ft <br/>
                                    Remaining: {item.quantity} db
                                    
                                </Card.Text>
                                <Button style={{float: "left"}} onClick={this.addtocart}>Add To Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>}
        </div>
    }
}
