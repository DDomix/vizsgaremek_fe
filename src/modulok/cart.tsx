import { it } from "node:test";
import { Component, ReactNode } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import './css/cartstyle.css'

interface CartProps {
    updatedCart: Result[];
}
interface CartState {
    amount: number;
    allvalue: number
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

export default class Cart extends Component<CartProps, CartState>{
    constructor(props: CartProps) {
        super(props);
        this.state = {
            amount: 1,
            allvalue: 0,
        };
        this.removeall = this.removeall.bind(this);
        this.counterplus = this.counterplus.bind(this);
        this.counterminus = this.counterminus.bind(this);
    }
    
    removeall() {
        if (this.props.updatedCart.length < 1) {
            window.alert("the cart is empty")
        } else {
            this.props.updatedCart.splice(0, this.props.updatedCart.length);
            console.log(this.props.updatedCart);
            this.render();
        }
    }
    counterplus() {
        const currentItem = this.props.updatedCart.find(item => item.id === item.id); 
        console.log(currentItem);
        if (currentItem) {
            const updatedAmount = this.state.amount + 1;
            const currentPrice = currentItem.price * updatedAmount;
            this.setState({
                amount: updatedAmount,
                allvalue: this.state.allvalue + currentItem.price
            });
        }
    }
    counterminus() {
        if (this.state.amount > 1) {
            const currentItem = this.props.updatedCart.find(item => item.id === item.id); // Assuming you have an itemId variable that holds the current item's id
            if (currentItem) {
                const updatedAmount = this.state.amount - 1;
                const currentPrice = currentItem.price * updatedAmount;
                this.setState({
                    amount: updatedAmount,
                    allvalue: this.state.allvalue - currentItem.price
                });
            }
        }
    }
    render(): ReactNode {
        if (this.props.updatedCart.length < 1) {
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
        const currentItem = this.props.updatedCart.find(item => item.id === item.id); 
        return (
            <div className="divdiv">
                <div className="Cart-Container">
                    <div className="Header">
                        <h3 className="Heading">Shopping Cart</h3>
                        <h5 className="Action" onClick={this.removeall}>Remove all</h5>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            
                            {this.props.updatedCart.map((item) => (
                                <div className="Cart-Items">

                                    <div className="image-box col-sm-12">
                                        <img className="images" src={'/images/shop/' + item.team + ' ' + item.type + ' ' + item.color + '.jpg'} alt="kép"></img>
                                    </div>
                                    <div className="about col-sm-12">
                                        <h1 className="title">{item.team} {item.type}</h1><br />
                                        <h3 className="subtitle">Size: {item.size}</h3><br />
                                        <h3 className="subtitle">Color: {item.color}</h3>

                                    </div>
                                    <div className="counter col-sm-12">
                                        <div className="buttons" onClick={this.counterplus}>+</div>
                                        <div className="count">{this.state.amount}</div>
                                        <div className="buttons" onClick={this.counterminus}>-</div>
                                    </div>
                                    <div className="prices col-sm-12">
                                        <div className="amount">{item.price} Ft</div>
                                        <div className="remove"><u>Remove</u></div>
                                    </div>
                                </div>

                            ))}
                        </div>

                    </div>
                    <div className="checkout">
                        <div className="total">
                            <div>
                                <div className="Subtotal">Sub-Total</div>
                                <div className="items">{this.props.updatedCart.length}</div>
                            </div>
                            <div className="total-amount">{this.state.allvalue}</div>
                        </div>
                        <button className="button">Checkout</button></div>
                </div>
            </div>
        );
    }
}