import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component } from 'react';
import WorkFooter from '../footer/workFooter';
import './budgets.css';
import {  FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { getServices } from '../../redux/actions/serviceActions';
import  PropTypes from 'prop-types';
import SubQuotes from './subquotes';

class Budgets extends Component {
    constructor(props){
        super(props);
        this.state = {
            specialties : [],
            value: '',
            selectedId: '',
            count: 1, 
            bool: false 
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
            <div className="">
                <div className="cc">
                <FormGroup>
                    <Label id="label" for="especialidad">
                        <h5>Choose a type of job!</h5>
                    </Label>
                    <Input direction="down" type="select" value={this.state.value} onChange={this.handleInputChange} name="especialidad" id="especialidad">
                    {this.props.service.map((spec, i) =>                     
                        <option key={i} className="opt">{spec.especialidad}</option>                    
                    )}
                    </Input>
                    {this.props.service.map((e,z) => {
                            if (e.especialidad === this.state.value) return <div>
                            <SubQuotes key={{z}} id={e._id}/> 
                            </div>                         
                        })
                    }
                </FormGroup>
                </div>
                <WorkFooter/>
            </div>
        )
    }
}

Budgets.propTypes = {
    getServices: PropTypes.func.isRequired,
    service: PropTypes.array.isRequired, //represents the state
}

const mapStateToProps = (state) => ({
    //called like in the rootReducer
    service: state.service.services,
})

export default connect(mapStateToProps, {getServices})(Budgets);