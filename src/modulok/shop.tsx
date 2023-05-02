import { Component, ReactNode, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './css/shopstyle.css';
import './css/sidebar.css';
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Cart from './cart';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBars, faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { FaAngleUp, FaArrowUp } from "react-icons/fa";

interface State {
    data: Result[];
    color: string;
    type: string;
    size: string;
    team: string;
    price: number;
    quantity: number;
    isOpen: boolean;
}
interface Result {
    id: number;
    color: string;
    type: string;
    size: string;
    team: string;
    price: number;
    quantity: number;
    amount: number;
}
interface Props {
    authToken: string;
    onAuthTokenChange: (token: string) => void;
    addToCart: (r: Result) => void;
}


export default class Shop extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            color: '',
            size: '',
            type: '',
            team: '',
            price: 0,
            quantity: 0,
            data: [],
            isOpen: false,
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
        })
        if (adatok.length < 1) {
            toast.error('Nincs a keresésnek megfelelő elem', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            this.filterdelete();
        }
        
    }
    componentDidMount() {
        this.kereses();
    }

    filterdelete = async () => {
        console.log(this)
        this.setState({ team: '', type: '', color: '', size: '' })
        this.kereses();
    }

    addtocart(item: Result) {
        if (item.quantity < 1) {
            toast.warn('Out of Stock', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            this.props.addToCart(item);
            toast.success('Added to Cart', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

    }
    toggleSidebar = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    


    render(): ReactNode {

        const { color, size, team, type } = this.state;

        if (this.props.authToken === '') {
            return <Navigate to='/' />
        } return <div className="shopstyle">
            
            <Link to='/f1'><button className="backbutton"><FontAwesomeIcon icon={faArrowLeft}/></button></Link>
            <button className="menubutton" onClick={this.toggleSidebar}><FontAwesomeIcon icon={faBars} /></button>
            <aside className={`sidebar ${this.state.isOpen ? 'open' : ''}`}>
                <button className="xmenubutton" onClick={this.toggleSidebar}><FontAwesomeIcon icon={faXmark} /></button>
                <ul className="sidebar__menu">
                <Sidebar>
                        <Menu>
                            <SubMenu label="Csapatok">
                                <MenuItem><input type="radio" id="Red-Bull" name="team" value={team} checked={this.state.team === 'Red-Bull'} onChange={(e) => this.setState({ team: e.target.value = "Red-Bull" })} />Red-Bull</MenuItem>
                                <MenuItem><input type="radio" id="Mercedes" name="team" value={team} checked={this.state.team === 'Mercedes'} onChange={(e) => this.setState({ team: e.target.value = "Mercedes" })} />Mercedes</MenuItem>
                                <MenuItem><input type="radio" id="Ferrari" name="team" value={team} checked={this.state.team === 'Ferrari'} onChange={(e) => this.setState({ team: e.target.value = "Ferrari" })} />Ferrari</MenuItem>
                                <MenuItem><input type="radio" id="McLaren" name="team" value={team} checked={this.state.team === 'McLaren'} onChange={(e) => this.setState({ team: e.target.value = "McLaren" })} />McLaren</MenuItem>
                                <MenuItem><input type="radio" id="Alpine" name="team" value={team} checked={this.state.team === 'Alpine'} onChange={(e) => this.setState({ team: e.target.value = "Alpine" })} />Alpine</MenuItem>
                                <MenuItem><input type="radio" id="Aston Martin" name="team" value={team} checked={this.state.team === 'Aston-Martin'} onChange={(e) => this.setState({ team: e.target.value = "Aston-Martin" })} />Aston Martin</MenuItem>
                                <MenuItem><input type="radio" id="Alpha Tauri" name="team" value={team} checked={this.state.team === 'Alpha-Tauri'} onChange={(e) => this.setState({ team: e.target.value = "Alpha-Tauri" })} />Alpha Tauri</MenuItem>
                                <MenuItem><input type="radio" id="Alfa Romeo" name="team" value={team} checked={this.state.team === 'Alfa-Romeo'} onChange={(e) => this.setState({ team: e.target.value = "Alfa-Romeo" })} />Alfa Romeo</MenuItem>
                                <MenuItem><input type="radio" id="Haas" name="team" value={team} checked={this.state.team === 'Haas'} onChange={(e) => this.setState({ team: e.target.value = "Haas" })} />Haas</MenuItem>
                                <MenuItem><input type="radio" id="Williams" name="team" value={team} checked={this.state.team === 'Williams'} onChange={(e) => this.setState({ team: e.target.value = "Williams" })} />Williams</MenuItem>
                            </SubMenu>
                            <SubMenu label="Méret">
                                <MenuItem><input type="radio" id="S" name="meret" value={size} checked={this.state.size === 'XS'} onChange={(e) => this.setState({ size: e.target.value = "XS" })} />XS</MenuItem>
                                <MenuItem><input type="radio" id="S" name="meret" value={size} checked={this.state.size === 'S'} onChange={(e) => this.setState({ size: e.target.value = "S" })} />S</MenuItem>
                                <MenuItem><input type="radio" id="M" name="meret" value={size} checked={this.state.size === 'M'} onChange={(e) => this.setState({ size: e.target.value = "M" })} />M</MenuItem>
                                <MenuItem><input type="radio" id="L" name="meret" value={size} checked={this.state.size === 'L'} onChange={(e) => this.setState({ size: e.target.value = "L" })} />L</MenuItem>
                                <MenuItem><input type="radio" id="S" name="meret" value={size} checked={this.state.size === 'XL'} onChange={(e) => this.setState({ size: e.target.value = "XL" })} />XL</MenuItem>
                            </SubMenu>
                            <SubMenu label="Szín">
                                <MenuItem><input id="inputfekete" className="input" type="radio" name="szin" value={color} checked={this.state.color === 'Black'} onChange={(e) => this.setState({ color: e.target.value = "Black" })} />Black</MenuItem>
                                <MenuItem><input type="radio" name="szin" value={color} checked={this.state.color === 'White'} onChange={(e) => this.setState({ color: e.target.value = "White" })} />White</MenuItem>
                                <MenuItem><input type="radio" name="szin" value={color} checked={this.state.color === 'Red'} onChange={(e) => this.setState({ color: e.target.value = "Red" })} />Red</MenuItem>
                                <MenuItem><input type="radio" name="szin" value={color} checked={this.state.color === 'Yellow'} onChange={(e) => this.setState({ color: e.target.value = "Yellow" })} />Yellow</MenuItem>
                                <MenuItem><input type="radio" name="szin" value={color} checked={this.state.color === 'Orange'} onChange={(e) => this.setState({ color: e.target.value = "Orange" })} />Orange</MenuItem>
                                <MenuItem><input type="radio" name="szin" value={color} checked={this.state.color === 'Green'} onChange={(e) => this.setState({ color: e.target.value = "Green" })} />Green</MenuItem>
                                <MenuItem><input type="radio" name="szin" value={color} checked={this.state.color === 'Blue'} onChange={(e) => this.setState({ color: e.target.value = "Blue" })} />Blue</MenuItem>
                            </SubMenu>
                            <SubMenu label="Típus">
                                <MenuItem><input type="radio" id="T-Shirt" name="team" value={type} checked={this.state.type === 'T-Shirt'} onChange={(e) => this.setState({ type: e.target.value = "T-Shirt" })} />T-Shirt</MenuItem>
                                <MenuItem><input type="radio" id="Cap" name="team" value={type} checked={this.state.type === 'Cap'} onChange={(e) => this.setState({ type: e.target.value = "Cap" })} />Cap</MenuItem>
                                <MenuItem><input type="radio" id="Cap" name="team" value={type} checked={this.state.type === 'Hoodie'} onChange={(e) => this.setState({ type: e.target.value = "Hoodie" })} />Hoodie</MenuItem>
                            </SubMenu>
                        </Menu>
                        <button className="gombok" onClick={this.kereses}>Keresés</button><br />
                        <button className="gombok" onClick={this.filterdelete}>Feltételek törlése</button>
                    </Sidebar>;
                </ul>
            </aside>
            
            <Link to='/cart'><button className="cartbutton"><FontAwesomeIcon icon={faCartShopping} /></button></Link>
            {<Row xs={1} md={4} className="g-4">
                {this.state.data.map((item: Result) => (
                    <Col>
                        <Card key={item.id}>
                            <Card.Img variant="top" src={'/images/shop/' + item.team + ' ' + item.type + ' ' + item.color + '.jpg'} />
                            <Card.Body>
                                <Card.Title>{item.team} {item.type}</Card.Title>
                                <Card.Text>
                                    Szín: {item.color}<br />
                                    Size: {item.size}
                                </Card.Text>
                                <Card.Text style={{ float: "right", color: "green", width: "fit-content" }}>
                                    Price: {item.price} Ft <br />
                                    {item.quantity === 0 ?
                                        <span style={{ color: "red" }}>Out of Stock</span> :
                                        `Remaining: ${item.quantity} db`}
                                </Card.Text>
                                <Button style={{ float: "left" }} onClick={() => this.addtocart(item)}>Add To Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>}
            
        </div>
    }
}
