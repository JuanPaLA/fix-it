import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component } from 'react';
import axios from 'axios';
import Nav2 from './../nav/nav';
import Footer from './../footer/footer';
import './services.css';
import { Link } from 'react-router-dom';
import {  FormGroup, Label, Input } from 'reactstrap';
import { UncontrolledCollapse } from 'reactstrap';
import { connect } from 'react-redux';
import { getServices } from '../../redux/actions/serviceActions';
import { logoutUser } from "../../redux/actions/authActions";
import  PropTypes from 'prop-types';
import jwt from 'jwt-decode' // import dependency

class Services extends Component {
    constructor(props){
        super(props);
        this.state = {
            specialties : [],
            id: '',
            email: ''
        };
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(evt) {
        this.setState({value: evt.target.value});   
    }  

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

    async componentDidMount(){
        const token = localStorage.getItem('jwtToken');
        const user = jwt(token)
        const id = user.id;
        const email = user.email;

        this.setState ({
            id: id,
            email: email
        })

        console.log(id);
        console.log(email);

        await axios.get('http://localhost:5000/api/services/all')
        .then( res => {
            const specialties = res.data;
            this.setState({specialties}) 
        })
        
       await this.props.getServices(); 
       console.log(this.props)
    }

    render() {
        const { user } = this.props.auth;
        console.log(this.props.service)
        return (
            <div>
                <Nav2/>
                <div className="componentContent">

                <Label style={{color: "black", marginBottom: "2vh"}}>What kind of service do you need?</Label>
                    
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
                    {/* <Input type="select" value={this.state.value} onChange={this.handleInputChange} name="especialidad" id="especialidad">
                    {this.props.service.map((spec, i) =>                                                 
                        <option  className="spaner" style={{color: "black"}}>{spec.especialidad}</option>                                                    
                    )}
                    </Input>
                    <Input type="select" value={this.state.value} onChange={this.handleInputChange} name="especialidad" id="especialidad">
                    
                    </Input> */}
                  </div>
                <Footer/>
            </div>
        )
    }
}

Services.propTypes = {
    getServices: PropTypes.func.isRequired,
    service: PropTypes.array.isRequired, //represents the state
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    //called like in the rootReducer
    service: state.service.services,
    auth: state.auth
}) 

export default connect(mapStateToProps, {getServices})(Services);

