import { it } from "node:test";
import { Component, ReactNode } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import './css/cartstyle.css'

interface CartProps {
    updatedCart: Result[];
}
export interface Result {
    id: number;
    color: string;
    type: string;
    size: string;
    team: string;
    price: number;
    quantity: number;
}

export default class Cart extends Component<CartProps>{
    removeall() {
        window.alert("asd");
    }

    render(): ReactNode {
        const { updatedCart } = this.props;
        console.log(updatedCart);
        if (updatedCart.length < 1) {
            return <div className="divdiv">
                <div className="Cart-Container">
                    <div className="Header">
                        <h3 className="Heading">Shopping Cart</h3>
                        <h5 className="Action" onClick={this.removeall}>Remove all</h5>
                    </div>
                    <h1 className="emptycart">The Cart is Empty</h1>
                </div>
            </div>
        }
        return (
            <div className="divdiv">
                <div className="Cart-Container">
                    <div className="Header">
                        <h3 className="Heading">Shopping Cart</h3>
                        <h5 className="Action" onClick={this.removeall}>Remove all</h5>
                    </div>
                    {updatedCart.map((item) => (
                        <div className="Cart-Items">
                            <div className="image-box">
                                <img className="images" src={'/images/shop/' + item.team + ' ' + item.type + ' ' + item.color + '.jpg'} alt="kép"></img>
                            </div>
                            <div className="about">
                                <h1 className="title">{item.team} {item.type}</h1><br />
                                <h3 className="subtitle">Size: {item.size}</h3><br />
                                <h3 className="subtitle">Color: {item.color}</h3>

                            </div>
                            <div className="counter">
                                <div className="buttons">+</div>
                                <div className="count">1</div>
                                <div className="buttons">-</div>
                            </div>
                            <div className="prices">
                                <div className="amount">{item.price} Ft</div>
                                <div className="remove"><u>Remove</u></div>
                            </div>
                        </div>
                    ))}
                    <div className="checkout">
                        <div className="total">
                            <div>
                                <div className="Subtotal">Sub-Total</div>
                                <div className="items">{updatedCart.length}</div>
                            </div>
                            <div className="total-amount">$6.18</div>
                        </div>
                        <button className="button">Checkout</button></div>
                </div>
            </div>
        );
    }
}