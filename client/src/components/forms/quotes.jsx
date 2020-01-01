import React, {Component} from 'react';
import Nav2 from './../nav/nav';
import Footer from './../footer/footer';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import './form.css';

class Quotes extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            login: false
        };
    }
    render(){
        return(
            <div>
                <Nav2/>
                    <div className="componentContent">

                            {/* --------------- TYPE FORM  ------------- */}

                        <Form>
                            <FormGroup style={{width: "95vw"}}>
                                <Label for="description" style={{color:"black"}}>Short Description</Label>
                                <Input type="text" name="description" id="description" placeholder="shortly name yor fix"/>
                            </FormGroup>
                            <FormGroup row style={{marginTop:"-3vh"}}>
                                <Label style={{color:"black"}} for="addData" sm={2}>Aditional Data</Label>
                                <Col sm={10}>
                                <Input type="textarea" name="addData" id="addData" />
                                </Col>
                            </FormGroup>

                            <hr></hr>    
                            {/* --------------- ADDRESS FORM  -------------*/}
                            
                            <div className="addressForm">
                            <FormGroup style={{width: "95vw", marginTop: "-2vh"}}>
                                <Label for="city" style={{color:"black"}}>City</Label>
                                <Input type="text" name="city" id="city"/>
                            </FormGroup>
                            <FormGroup style={{width: "95vw", marginTop: "-2vh"}}>
                                <Label for="address" style={{color:"black"}}>Street</Label>
                                <Input type="text" name="address" id="address"/>
                            </FormGroup>
                            <Row Form>
                                <Col xs="6">
                                    <FormGroup style={{marginTop:"-2vh"}}>
                                        <Label for="address" style={{color:"black"}}>Number</Label>
                                        <Input type="text" name="address" id="address"/>
                                    </FormGroup>        
                                </Col>

                                <Col xs="6">
                                    <FormGroup style={{marginTop:"-2vh"}}>
                                        <Label for="address" style={{color:"black"}}>Flat</Label>
                                        <Input type="text" name="address" id="address"/>
                                    </FormGroup>        
                                </Col>
                            </Row>
                            </div>
                            
                            <hr style={{marginTop: "-1vh"}}></hr>    
                            { /* --------------- CONTACT FORM  -------------*/}

                            

                        </Form>
                    </div>
                <Footer/>
            </div>
        )
    }
}

export default Quotes;