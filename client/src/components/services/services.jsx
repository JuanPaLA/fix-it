import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component } from 'react';
import axios from 'axios';
import Nav2 from './../nav/nav';
import Footer from './../footer/footer';
import './services.css';
import { Link } from 'react-router-dom';
import { UncontrolledCollapse } from 'reactstrap';
import { connect } from 'react-redux';
import { getServices } from '../../redux/actions/serviceActions';
import  PropTypes from 'prop-types';

class Services extends Component {
    constructor(props){
        super(props);
        this.state = {
            specialties : []
        };
    }

    async componentDidMount(){
        await axios.get('http://localhost:5000/api/services/all')
        .then( res => {
            const specialties = res.data;
            this.setState({specialties}) 
        })
        
       await this.props.getServices(); 
    }

    render() {
        console.log(this.props.service)
        return (
            <div>
                <Nav2/>
                <div className="componentContent">
                
                {/* <img src={Logo} className="App-logo" alt="logo" /> */}

                <h4 style={{color: "black", marginBottom: "2vh"}}>Select what you need</h4>
                    
                    {this.state.specialties.map((spec, i) => 
                        <div key={i} className="card" style={{width: "95vw", backgroundColor: "black"}}>
                        <div className="card-header" id={`especiality${i}`}>
                        <span  className="spaner" style={{color: "black"}}><li>{spec.especialidad}</li></span>    
                        </div>                        
                    
                        <UncontrolledCollapse color="secondary" toggler={`especiality${i}`}>
                        {spec.subespecialidades.map((sub, z) => 
                                <li key={z} className="list-group-item" style={{color: "black"}}>
                                <Link to={`/quotes/${spec._id}`}>
                                    {sub}
                                </Link>                                
                                </li>    
                                )}
                        </UncontrolledCollapse>    
                                                    
                        </div> 
                    )}

                    {this.state.specialties.map((sp, y) => {
                        {/* <div  id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            </ol>
                            <div className="carousel-item">                                
                                <img src="..." className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5></h5>
                                    <p></p>
                                </div>                                
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div> */}
                    })}
                  </div>
                <Footer/>
            </div>
        )
    }
}

Services.propTypes = {
    getServices: PropTypes.func.isRequired,
    service: PropTypes.array.isRequired //represents the state
}

const mapStateToProps = (state) => ({
    //called like in the rootReducer
    service: state.service.services
}) 

export default connect(mapStateToProps, {getServices})(Services);

