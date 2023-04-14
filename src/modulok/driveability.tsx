import { Component } from "react";

interface State {
    data: Result[];
    leiras: string;
    motorkomponens: string;
    price: number;
    quantity: number;
}
interface Result {
    id: number;
    leiras: string;
    motorkomponens: string;
    price: number;
    quantity: number;
}

export default class Driveability extends Component<{}, State>{
    
}