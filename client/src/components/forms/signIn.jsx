import 'bootstrap/dist/css/bootstrap.min.css';  
import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import './signIn.css';
import {Link} from 'react-router-dom';
import axios from "axios";

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            login: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(evt) {
        const value =
    evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;    
        this.setState({
          ...this.state,
          [evt.target.name] : value
        });
      }

      handleSubmit(event){
        if(this.state.email.length == 0 || this.state.password.length == 0){
          alert('complete required fields')    
        }else{
            console.log("en cosntrucción")
            }
        }

    render(){
        return(            
                <div className="componentContent">                    
                {/* -----------ENCABEZADO--------------------- */}
                <div>
                    <h4>Login </h4>
                    {/* -------LOGIN FORM--------- */}
                    <div className='container-fluid border my-1 mr-2 py-1 pr2 px-2'>           
                        
                    <Form onSubmit={this.handleSubmit}>
                        
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email"  value={this.state.email} onChange={this.handleInputChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" value={this.state.password}
                            onChange={this.handleInputChange} />
                        </FormGroup>

                        <FormGroup check>
                            <Label check>
                            <Input type="checkbox" />{' '}
                            Remember me.
                            </Label>
                        </FormGroup>
                        
                        <div className="bh">
                            <Row>
                                <Col>
                                    <div className="buttonHoldera">
                                        <Button>Sign In</Button>

                                        {/* <div style={{color: "black", marginTop: "1vh"}}>
                                            <a>Don't have an account? Create one <u >here.</u></a>
                                        </div> */}
                                    </div>        
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    
        );
    };
}

export default SignIn; 