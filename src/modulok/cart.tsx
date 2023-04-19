import { Component, ReactNode } from "react";

interface CartProps {
    updatedCart: Result[];
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

export default class Cart extends Component<CartProps>{
    render(): ReactNode {
        
        const { updatedCart } = this.props;
        console.log(updatedCart);
        
        return <div>
            {updatedCart.map((item) => (
          <div>{item.team}</div>
        ))}
        </div>
    }
}