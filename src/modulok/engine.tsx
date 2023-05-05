import { Component, ReactNode } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import './css/engine.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface State {
    data: EngineResult[];
    leiras: string;
    motorkomponens: string;
    price: number;
    quantity: number;
    min: number;
    max: number;
}
export interface EngineResult {
    id: number;
    leiras: string;
    motorkomponens: string;
    price: number;
    quantity: number;
    amount: number;
}
interface Props {
    authToken: string;
    onAuthTokenChange: (token: string) => void;
    addToEngineCart: (r: EngineResult) => void;
} 

export default class Engine extends Component<Props, State>{
    constructor(props: Props) {
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

        const adatok = await response.json() as EngineResult[];


        this.setState({
            data: adatok,
        }, () => { console.log(this.state.data); })



        //console.table(response);

    }
    addtocart(item: EngineResult) {
        toast.info('In order to avoid car compatibility errors, please contact us by e-mail at papp.dominik1010@gmail.com', {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
    componentDidMount() {
        this.kereses();
    }

    render(): ReactNode {
        /*const { min, max } = this.state;*/
        if (this.props.authToken === '') {
            return <Navigate to='/'/>
        }
        return <div className="carscontent">
            <Link to='/car'><button className="enginebackbutton"><FontAwesomeIcon icon={faArrowLeft}/></button></Link>
            <input className="kereses" type="search" placeholder="Keresés" onChange={(e) => this.setState({ motorkomponens: e.target.value })} />
            <button className="keresesgomb" onClick={this.kereses}>Keresés</button>
            {<Row xs={1} md={3} className="g-4">
                {this.state.data.map((item) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={'/images/car/engine/'+item.motorkomponens+'.jpg'} />
                            
                            <Card.Body>
                                <Card.Title>{item.motorkomponens}</Card.Title>
                                <Card.Text>
                                    {item.leiras}<br />
                                </Card.Text>
                                <Card.Text style={{ float: "right", color: "green", width: "fit-content" }}>
                                    Price: {item.price} Ft <br />
                                    Remaining: {item.quantity} db

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