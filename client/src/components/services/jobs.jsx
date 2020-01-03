import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component } from 'react';
import Nav2 from './../nav/nav';
import Footer from './../footer/footer';
import './jobs.css';
import {  FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { getServices } from '../../redux/actions/serviceActions';
import { getQuoteByField } from '../../redux/actions/quoteActions';
import  PropTypes from 'prop-types';
import SubQuotes from './subquotes';

class Jobs extends Component {
    constructor(props){
        super(props);
        this.state = {
            specialties : [],
            value: '',
            selectedId: '',
            count: 1 
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(evt) {
        this.setState({value: evt.target.value});   
    }  

    async componentDidMount(){
        await this.props.getServices();
    }

    render(){
        return(
            <div className="encloser">
                <Nav2/>
                <div className="cc">
                <FormGroup>
                    <Label id="label" for="especialidad">Choose a type of job!</Label>
                    <Input type="select" value={this.state.value} onChange={this.handleInputChange} name="especialidad" id="especialidad">
                    {this.props.service.map((spec, i) =>                     
                        <option key={i} className="opt">{spec.especialidad}</option>                    
                    )}
                    </Input>
                    {this.props.service.map((e,z) => {
                            if (e.especialidad === this.state.value) return <div>
                            <SubQuotes key={{z}} id={e._id} esp={e.especialidad}/> 
                            </div>
                        })
                    }
                </FormGroup>
                </div>
                <Footer/>
            </div>
        )
    }
}

Jobs.propTypes = {
    getServices: PropTypes.func.isRequired,
    service: PropTypes.array.isRequired, //represents the state
}

const mapStateToProps = (state) => ({
    //called like in the rootReducer
    service: state.service.services,
})

export default connect(mapStateToProps, {getServices})(Jobs);