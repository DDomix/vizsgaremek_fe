import { ResultType } from "@remix-run/router/dist/utils";
import { Component, ReactNode } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

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

export default class Engine extends Component<{}, State>{
    constructor(props: {}) {
        super(props);
        this.state = {
            leiras: '',
            motorkomponens: '',
            price: 0,
            quantity: 0,
            data: [],
            min:0,
            max:0,
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

        const response = await fetch('http://localhost:3000/api/engine', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(filterData),
        });
        
        const adatok = await response.json() as Result[];
        adatok.forEach((pricecheck)=>{
            if(pricecheck.price>this.state.min && pricecheck.price<this.state.max){
                this.setState((prevState) => {
                    const filteredData = [...prevState.data, pricecheck];
                    return { data: filteredData };
                  }, () => {
                    console.log(this.state.data);
                  });
            }
            else{
                this.setState({
                    data: adatok,
                }, () => { console.log(this.state.data); })
            }
        })
          
        
        

        //console.table(response);
        
    }
    componentDidMount() {
        this.kereses();
    }

    render():ReactNode {
        const {min,max } = this.state;

        return <div>
            <input type="number" value={min} onChange={(e) => this.setState({ min: e.target.valueAsNumber})}></input>
            <input type="number" value={max} onChange={(e) => this.setState({ min: e.target.valueAsNumber})}></input>
            
            <button onClick={this.kereses}>Keresés</button>
            {<Row xs={1} md={4} className="g-4">
                {this.state.data.map((item) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" /*src={'/images/shop/'+item.team+ ' '+item.color+ '.jpg'}*//>
                            <Card.Body>
                                <Card.Title>{item.motorkomponens}</Card.Title>
                                <Card.Text>
                                  {item.leiras}<br/>
                                </Card.Text>
                                <Card.Text style={{float: "right", color: "green", width: "fit-content"}}>
                                    Price: {item.price} Ft <br/>
                                    Remaining: {item.quantity} db
                                    
                                </Card.Text>
                                <Button style={{float: "left"}} /*onClick={this.addtocart}*/>Add To Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>}
        </div>
    }
}