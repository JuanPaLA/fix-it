import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component } from 'react';
import Footer from './../footer/footer';
import './userJobs.css';
import jwt from 'jwt-decode' // import dependency
import { connect } from 'react-redux';
import { getJobsByUser } from "../../redux/actions/jobActions";

import  PropTypes from 'prop-types';

class Jobs extends Component {
    constructor(props){
        super(props);
        this.state = {
            jobId: '',
            jobs: []
        }
    }

     async componentDidMount(){
        const token = localStorage.getItem('jwtToken');
        const user = jwt(token);
        const id = user.id;
        console.log(id);
        await this.props.getJobsByUser(id);
        this.setState({
            jobs: this.props.job,            
        })
        console.log(this.props)
    }

render(){
    return(
        <div>
            <div className="fixerContainer">
                <h4>Your Fixies</h4>
            </div>
            <Footer/>
        </div>
    )
}
}

Jobs.propTypes = {
    job: PropTypes.array.isRequired, //represents the state
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getJobsByUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    //called like in the rootReducer
    job: state.job.jobs,
    auth: state.auth
}) 

export default connect(mapStateToProps, 
    { getJobsByUser})
    (Jobs);