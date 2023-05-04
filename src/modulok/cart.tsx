import { Component, ReactNode } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/cartstyle.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface CartProps {
    updatedCart: CartItem[];
}
interface CartState {
    amount: number;
    allvalue: number
}
export interface CartItem {
    id: number;
    color: string;
    type: string;
    size: string;
    team: string;
    price: number;
    quantity: number;
    amount: number;
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
        this.checkout = this.checkout.bind(this);
    }

    getSubtotal() {
        return this.props.updatedCart.reduce((acc, x) => acc + (x.price * x.amount), 0);
    }

    updateSubtotal() {
        this.setState({
            ...this.state,
            allvalue: this.getSubtotal()
        });
    }

    componentDidMount?() {
        this.updateSubtotal();
    }

    removeall() {
        if (this.props.updatedCart.length < 1) {
            toast.error('Cart is empty', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            this.props.updatedCart.splice(0, this.props.updatedCart.length);
            console.log(this.props.updatedCart);
            this.setState({});
        }
    }
    counterplus(itemId: number) {
        const currentItem = this.props.updatedCart.find(item => item.id === itemId);
        console.log(currentItem);

        if (!currentItem)
            return;

        const updatedAmount = currentItem.amount + 1;
        const currentPrice = currentItem.price * updatedAmount;

        if (updatedAmount > currentItem.quantity) {
            currentItem.amount = currentItem.quantity;
        } else {
            currentItem.amount = updatedAmount;
        }
        this.updateSubtotal();
    }
    counterminus(itemId: number) {
        const currentItem = this.props.updatedCart.find(item => item.id === itemId);
        console.log(currentItem);

        if (currentItem && currentItem.amount > 1) {
            const updatedAmount = currentItem.amount - 1;
            const currentPrice = currentItem.price * updatedAmount;
            currentItem.amount = updatedAmount;

            this.updateSubtotal();

            console.log(this.state.allvalue)
        }

    }
    itemremove(itemId: number) {
        const currentItemIndex = this.props.updatedCart.findIndex(item => item.id === itemId);
        if (currentItemIndex > -1) {
            const updatedCart = [...this.props.updatedCart];
            const currentItem = updatedCart[currentItemIndex];
            updatedCart.splice(currentItemIndex, 1);
            this.setState({
                allvalue: this.state.allvalue - currentItem.price
            });
            this.props.updatedCart.splice(currentItemIndex, 1);
        }
    }
    checkout = async () => {
        console.log(this.props.updatedCart);
        const response = await fetch('http://localhost:3000/api/checkout', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.props.updatedCart),
        });
        const responseBody = await response.json();
        (toast.success(responseBody.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        }));
        this.removeall();
    }

    render(): ReactNode {
        if (this.props.updatedCart.length < 1) {
            return <div className="valami"><Link to='/shop'><button className="cartbackbutton"><FontAwesomeIcon icon={faArrowLeft} /></button></Link>
                <div className="divdiv">

                    <div className="Cart-Container">
                        <div className="Header">
                            <h3 className="Heading">Shopping Cart</h3>
                            <h5 className="Action" onClick={this.removeall}>Remove all</h5>

                        </div>
                        <h1 className="emptycart">The Cart is Empty</h1>
                    </div>
                </div></div>
        }
        return <div className="valami"><Link to='/shop'><button className="cartbackbutton"><FontAwesomeIcon icon={faArrowLeft} /></button></Link>
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
                                        <img className="images" src={'/images/shop/' + item.team + ' ' + item.type + ' ' + item.color + '.jpg'} alt="kÃ©p"></img>
                                    </div>
                                    <div className="about col-sm-12">
                                        <h1 className="title">{item.team} {item.type}</h1><br />
                                        <h3 className="subtitle">Size: {item.size}</h3><br />
                                        <h3 className="subtitle">Color: {item.color}</h3><br />
                                        <h3 className="subtitle">Avaiable: {item.quantity}</h3>
                                    </div>
                                    <div className="counter col-sm-12">
                                        <div className="buttons" onClick={() => this.counterplus(item.id)}>+</div>
                                        <div className="count">{item.amount}</div>
                                        <div className="buttons" onClick={() => this.counterminus(item.id)}>-</div>
                                    </div>
                                    <div className="prices col-sm-12">
                                        <div className="amount">{item.price} Ft</div>
                                        <div className="remove"><u onClick={() => this.itemremove(item.id)}>Remove</u></div>
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
                            <div className="total-amount">{this.state.allvalue} Ft</div>
                        </div>
                        <button className="button" onClick={this.checkout}>Checkout</button></div>
                </div>
            </div>
        </div>
    }
}