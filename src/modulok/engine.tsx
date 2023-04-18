import { Component, ReactNode } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";

interface State {
    data: Result[];
    leiras: string;
    motorkomponens: string;
    price: number;
    quantity: number;
    min: number;
    max: number;
}
interface Result {
    id: number;
    leiras: string;
    motorkomponens: string;
    price: number;
    quantity: number;
}
interface Token {
    authToken: string;
    onAuthTokenChange: (token: string) => void;
} 

export default class Engine extends Component<Token, State>{
    constructor(props: Token) {
        super(props);
        this.state = {
            leiras: '',
            motorkomponens: '',
            price: 0,
            quantity: 0,
            data: [],
            min: 0,
            max: 0,
        }
    }

    kereses = async () => {
        const filterData: any = {
        };
        if (this.state.min) {
            filterData.price = this.state.min;
        }
        if (this.state.max) {
            filterData.price = this.state.max;
        }
        if (this.state.motorkomponens) {
            filterData.motorkomponens = this.state.motorkomponens;
        }

        const response = await fetch('http://localhost:3000/api/engine', {
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

    render(): ReactNode {
        /*const { min, max } = this.state;*/
        if (this.props.authToken === '') {
            return <Navigate to='/'/>
        }
        return <div>
            {/* <input type="number" placeholder="MIN" onChange={(e) => this.setState({ min: e.target.valueAsNumber })} /> */}
            {/* <input type="number" placeholder="MAX" onChange={(e) => this.setState({ min: e.target.valueAsNumber })} /> */}
            <input type="search" placeholder="Keresés" onChange={(e) => this.setState({ motorkomponens: e.target.value })} />

            <button onClick={this.kereses}>Keresés</button>
            {<Row xs={1} md={3} className="g-4">
                {this.state.data.map((item) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" /*src={'/images/shop/'+item.team+ ' '+item.color+ '.jpg'}*/ />
                            <Card.Body>
                                <Card.Title>{item.motorkomponens}</Card.Title>
                                <Card.Text>
                                    {item.leiras}<br />
                                </Card.Text>
                                <Card.Text style={{ float: "right", color: "green", width: "fit-content" }}>
                                    Price: {item.price} Ft <br />
                                    Remaining: {item.quantity} db

                                </Card.Text>
                                <Button style={{ float: "left" }} /*onClick={this.addtocart}*/>Add To Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>}
        </div>
    }
}