import { Component, ReactNode } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

interface State {
    data: Result[];
    leiras: string;
    vezerloegysegkomponens: string;
    price: number;
    quantity: number;
}
interface Result {
    id: number;
    leiras: string;
    vezerloegysegkomponens: string;
    price: number;
    quantity: number;
}
interface Token {
    authToken: string;
    onAuthTokenChange: (token: string) => void;
}

export default class Driveability extends Component<Token, State>{
    constructor(props: Token) {
        super(props);
        this.state = {
            leiras: '',
            vezerloegysegkomponens: '',
            price: 0,
            quantity: 0,
            data: [],
        }
    }

    kereses = async () => {
        const filterData: any = {
        };
        if (this.state.vezerloegysegkomponens) {
            filterData.kasznikomponens = this.state.vezerloegysegkomponens;
        }

        const response = await fetch('http://localhost:3000/api/driveability', {
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
    addtocart() {
        toast.warn('Function not avaiable', {
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
    render(): ReactNode {
        /*const { min, max } = this.state;*/
        if (this.props.authToken === '') {
            return <Navigate to='/'/>
        }
        return <div>
            {/* <input type="number" placeholder="MIN" onChange={(e) => this.setState({ min: e.target.valueAsNumber })} /> */}
            {/* <input type="number" placeholder="MAX" onChange={(e) => this.setState({ min: e.target.valueAsNumber })} /> */}
            <input type="search" placeholder="Keresés" onChange={(e) => this.setState({ vezerloegysegkomponens: e.target.value })} />

            <button onClick={this.kereses}>Keresés</button>
            {<Row xs={1} md={4} className="g-4">
                {this.state.data.map((item) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" /*src={'/images/shop/'+item.team+ ' '+item.color+ '.jpg'}*/ />
                            <Card.Body>
                                <Card.Title>{item.vezerloegysegkomponens}</Card.Title>
                                <Card.Text>
                                    {item.leiras}<br />
                                </Card.Text>
                                <Card.Text style={{ float: "right", color: "green", width: "fit-content" }}>
                                    Price: {item.price} Ft <br />
                                    Remaining: {item.quantity} db

                                </Card.Text>
                                <Button style={{ float: "left" }} onClick={this.addtocart}>Add To Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>}
        </div>
    }
}