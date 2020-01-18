import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component } from 'react';
import Nav2 from '../nav/nav';
import Footer from '../footer/footer';
import './budgets.css';
import { connect } from 'react-redux';
import { getServices } from '../../redux/actions/serviceActions';
import  PropTypes from 'prop-types';
import SubQuotes from './subquotes';
import {Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Budgets extends Component {
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
                <Form inline>
                    <FormGroup className="mb-2  mb-sm-0">
                        <Label for="especialidad" id="label" className="mr-sm-2">
                            <h4>
                                Select a type of job!
                            </h4>
                        </Label>
                    
                        <Input type="select" value={this.state.value} onChange={this.handleInputChange} name="especialidad" id="especialidad">
                            {this.props.service.map((spec, i) =>                     
                                <option key={i} className="opt">{spec.especialidad}</option>                    
                            )}
                    
                        </Input>

                        <hr style={{
                            border: "thin inset !important black", 
                            width: "88vw",
                            marginTop: "2vh",
                            borderBlockStartStyle: "inset !important"
                            }}>
                        </hr>

                    </FormGroup>                    
                    
                        {this.props.service.map((e,z) => {
                                if (e.especialidad === this.state.value) return <div>
                                <SubQuotes key={{z}} id={e._id}/> 
                                </div>
                            })
                        }
                 </Form>                 
                </div>
                <Footer/>
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