import { Component, ReactNode } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './css/mainsite.css';



export default class MainSite extends Component {
    render(): ReactNode {
        return <div className="mainsite">
            <section className="wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4" /*onClick={}*/>
                            <div className="card text-white click-col" id="car-parts">
                                <div className="card-img-overlay d-flex flex-column">
                                    <div className="card-body">
                                        <small className="card-meta mb-2">
                                            <h2>Car</h2>
                                        </small>
                                        <small>
                                            <i className="fa fa-clock"></i>Buy parts of an F1 car
                                        </small>
                                    </div>
                                    <div className="card-footer">
                                        <div className="media">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" /*onClick={}*/>
                            <div className="card text-white click-col" id="drivers">
                                <div className="card-img-overlay d-flex flex-column">
                                    <div className="card-body">
                                        <small className="card-meta mb-2">
                                            <h2>Drivers</h2>
                                        </small>
                                        <small>
                                            <i className="fa fa-clock"></i>Search in the driver market
                                        </small>
                                    </div>
                                    <div className="card-footer">
                                        <div className="media">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" /*onClick={}*/>
                            <div className="card text-white click-col" id="f1shop">
                                <div className="card-img-overlay d-flex flex-column">
                                    <div className="card-body">
                                        <small className="card-meta mb-2">
                                            <h2>F1 Fan Shop</h2>
                                        </small>
                                        <small>
                                            <i className="fa fa-clock"></i>Collectible items for the biggest F1 fans
                                        </small>
                                    </div>
                                    <div className="card-footer">
                                        <div className="media">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    }
}