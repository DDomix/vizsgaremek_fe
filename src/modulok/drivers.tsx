import { Component, ReactNode } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";

interface State {
    data: Result[];
    nev: string;
    nemzetiseg: string;
    csapat: string;
    kategoria: string;
    helyezes: number;
    kor: number;
    szerzettpontok: number;
}
interface Result {
    id: number;
    nev: string;
    nemzetiseg: string;
    csapat: string;
    kategoria: string;
    helyezes: number;
    kor: number;
    szerzettpontok: number;
}
interface Token {
    authToken: string;
    onAuthTokenChange: (token: string) => void;
}

export default class Drivers extends Component<Token, State> {
    
    constructor(props: Token) {
        super(props);
        this.state = {
            nev: '',
            nemzetiseg: '',
            csapat: '',
            kategoria: '',
            helyezes: 0,
            kor: 0,
            szerzettpontok: 0,
            data: [],
        }
    }
    
    kereses = async () => {
        const filterData: any = {
        };
        if (this.state.nev) {
            filterData.nev = this.state.nev
        }
        if (this.state.nemzetiseg) {
            filterData.nemzetiseg = this.state.nemzetiseg
        }
        if (this.state.csapat) {
            filterData.csapat = this.state.csapat
        }
        if (this.state.kategoria) {
            filterData.kategoria = this.state.kategoria
        }
        if (this.state.helyezes) {
            filterData.helyezés = this.state.helyezes
        }
        if (this.state.kor) {
            filterData.kor = this.state.kor
        }
        if (this.state.szerzettpontok) {
            filterData.szerzettpontok = this.state.szerzettpontok
        }

        console.log(filterData)
        const response = await fetch('http://localhost:3000/api/drivers', {
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

    filterdelete=async ()=> {
        console.log(this)
        await this.setState({nev:'', csapat:'', nemzetiseg:''})
        this.kereses();
    }
    contact(){

    }

    render(): ReactNode {
        if (this.props.authToken === '') {
            return <Navigate to='/'/>
        }return <div>
            <input type="search" id="nevmezo" placeholder="Név" onChange={(e) => this.setState({ nev: e.target.value })}/>
            <input type="search" placeholder="Csapat" onChange={(e) => this.setState({ csapat: e.target.value })}/>
            <input type="search" placeholder="Nemzetiség" onChange={(e) => this.setState({ nemzetiseg: e.target.value })}/>
            <button onClick={this.kereses}>Keresés</button>
            <button onClick={this.filterdelete}>Feltételek törlése</button>
            {<Row xs={1} md={4} className="g-4">
                {this.state.data.map((item) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={'/images/drivers/'+item.nev+'.jpg'}/>
                            <Card.Body>
                                <Card.Title>{item.nev}</Card.Title>
                                <Card.Text>
                                  Nationality: {item.nemzetiseg}<br/>
                                  Age: {item.kor}
                                </Card.Text>
                                <Card.Text>
                                    Team: {item.csapat}<br/>
                                    Category: {item.kategoria}
                                </Card.Text>
                                <Card.Text>
                                    Last Season placement: {item.helyezes}<br/>
                                    Points that season: {item.szerzettpontok}
                                </Card.Text>
                                <Button style={{float: "left"}} onClick={this.contact}>Contact</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>}
        </div>
    }
}