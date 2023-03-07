import { Component, ReactNode } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './css/car.css';

export default class Car extends Component {
    render(): ReactNode {
        return <div className="carbg">
            <section className="wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4" /*onClick={}*/>
                            <div className="card text-white click-col" id="engine">
                                <div className="card-img-overlay d-flex flex-column">
                                    <div className="card-body">
                                        <small className="card-meta mb-2">
                                            <h2>Engine</h2>
                                        </small>
                                        <small>
                                            <i className="fa fa-clock"></i>Here you can buy an F1 engine or just some parts of it
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
                            <div className="card text-white click-col" id="bodywork">
                                <div className="card-img-overlay d-flex flex-column">
                                    <div className="card-body">
                                        <small className="card-meta mb-2">
                                            <h2>Bodywork</h2>
                                        </small>
                                        <small>
                                            <i className="fa fa-clock"></i>Here you can buy a complete chassis or just improve yours with new parts
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
                            <div className="card text-white click-col" id="driveability">
                                <div className="card-img-overlay d-flex flex-column">
                                    <div className="card-body">
                                        <small className="card-meta mb-2">
                                            <h2>Driveability</h2>
                                        </small>
                                        <small>
                                            <i className="fa fa-clock"></i>Improve your cars driveability
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