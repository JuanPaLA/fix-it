import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import './signUp.css';
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom';
import axios from "axios";

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            pic: '',
            rol: '',
            redirect: 'https://dev.to/projectescape/programmatic-navigation-in-react-3p1l'
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
        //   alert('complete required fields')    
        return <Redirect to='http://localhost:3000/services' />
        }else{
            
            }
        }

    render(){
        return(
            <div className="componentContent">       >
                {/* -----------ENCABEZADO--------------------- */}
                <div>
                    <h4 className="hsu">Create your account</h4>
                    {/* -------SIGN UP FORM--------- */}
                    <div className='container-fluid border my-1 mr-2 py-1 pr2 px-2'>
                    
                    <Form onSubmit={this.handleSubmit}>

                        <FormGroup> 
                            <Label for="userName">User name</Label>
                            <Input type="text" name="userName"  value={this.state.userName} onChange={this.handleInputChange}/>
                        </FormGroup>

                        <FormGroup> 
                            <Label for="email">Email</Label>
                            <Input type="email" name="email"  value={this.state.email} onChange={this.handleInputChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" value={this.state.password}
                            onChange={this.handleInputChange} />
                        </FormGroup>    
                        
                        <div className="buthold">
                            <Button type="submit" id="bs">Submit</Button>
                        </div>                        
                    </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;