import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component } from 'react';
import axios from 'axios';
import Footer from './../footer/footer';
import './services.css';
import { Link } from 'react-router-dom';
import { Label } from 'reactstrap';
import { UncontrolledCollapse } from 'reactstrap';
import { connect } from 'react-redux';
import { getServices } from '../../redux/actions/serviceActions';
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
        const name = user.name;

        this.setState ({
            id: id,
            email: email
        })

        console.log(id);
        console.log(email);
        console.log(name);

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
        return (
            <div>
                {/* <Nav2/> */}
                <div className="componentContent">

                <Label style={{color: "black", marginBottom: "2vh"}}>
                    <h4>What kind of service do you need?</h4>
                </Label>
                    
                    {this.state.specialties.map((spec, i) => 
                        <div key={i} className="carder">
                        <div className="card-header" id={`especiality${i}`}>
                        <span  className="spaner"><li>{spec.especialidad}</li></span>    
                        </div>                        
                    
                        <UncontrolledCollapse toggler={`especiality${i}`}>
                        {spec.subespecialidades.map((sub, z) => 
                                <li key={z} className="list-group-item">
                                <Link to={`/quotes/${spec._id}`}>
                                    {sub}
                                </Link>                                
                                </li>    
                                )}
                        </UncontrolledCollapse>    
                                                    
                        </div> 
                    )}
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

