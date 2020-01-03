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
        // this.mapping = this.mapping.bind(this);
    }

    //  mapping(index){
    //     var array = Array.from(this.props.service[index].subespecialidades);
    //     const listItems = array.map((aux) => 
    //         <li>{aux}</li>
    //     );
    //     console.log(listItems);
    //     return(
    //         <ul>
    //             {listItems}
    //         </ul>
    //     )
    //    }

    async componentDidMount(){
        await axios.get('http://localhost:5000/api/services/all')
        .then( res => {
            const specialties = res.data;
            this.setState({specialties}) 
        })
        
       await this.props.getServices(); 

    //    this.mapping(0);
    }


    render() {
        console.log(this.props.service)
        return (
            <div>
                <Nav2/>
                <div className="componentContent">
                
                <h4 style={{color: "black"}}>Select what you need</h4>
                    
                    {this.state.specialties.map((spec, i) => 
                        <div key={i} className="card" style={{width: "95vw", backgroundColor: "black"}}>
                        <div className="card-header text-center" id={`especiality${i}`}>
                        <span  style={{color: "black"}}><strong>{spec.especialidad}</strong></span>    
                        </div>                        
                    
                        <UncontrolledCollapse toggler={`especiality${i}`}>
                        {spec.subespecialidades.map((sub, z) => 
                                <li key={z} className="list-group-item" style={{color: "black"}}>
                                <Link to={`/quotes/${sub}`}>
                                    {sub}
                                </Link>
                                
                                </li>
                                )}
                                <li className="list-group-item" style={{color: "black"}}>
                                <Link to={`/quotes/`}>
                                    other
                                </Link>
                                </li>
                        
                         

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
    service: PropTypes.array.isRequired //represents the state
}

const mapStateToProps = (state) => ({
    //called like in the rootReducer
    service: state.service.services
}) 

export default connect(mapStateToProps, {getServices})(Services);

