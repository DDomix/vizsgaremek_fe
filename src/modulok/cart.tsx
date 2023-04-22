import { Component, ReactNode } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/cartstyle.css'

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
        if (currentItem) {
            const updatedAmount = currentItem.amount + 1;
            const currentPrice = currentItem.price * updatedAmount;
            currentItem.amount = updatedAmount;
            this.setState({
                allvalue: this.state.allvalue + currentItem.price
            });
        }
    }
    counterminus(itemId: number) {
        const currentItem = this.props.updatedCart.find(item => item.id === itemId); 
        console.log(currentItem);
        if (currentItem && currentItem.amount > 1) {
            const updatedAmount = currentItem.amount - 1;
            const currentPrice = currentItem.price * updatedAmount;
            currentItem.amount = updatedAmount;
            this.setState({
                allvalue: this.state.allvalue - currentItem.price
            });
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
                                        <div className="buttons" onClick={()=>this.counterplus(item.id)}>+</div>
                                        <div className="count">{item.amount}</div>
                                        <div className="buttons" onClick={()=>this.counterminus(item.id)}>-</div>
                                    </div>
                                    <div className="prices col-sm-12">
                                        <div className="amount">{item.price} Ft</div>
                                        <div className="remove"><u onClick={()=>this.itemremove(item.id)}>Remove</u></div>
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
                        <button className="button">Checkout</button></div>
                </div>
            </div>
        );
    }
}