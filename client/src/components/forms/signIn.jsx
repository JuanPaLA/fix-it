import 'bootstrap/dist/css/bootstrap.min.css';  
import React, {Component} from 'react';
import Nav2 from './../nav/nav';
import Footer from './../footer/footer';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';

class SignIn extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div>
                <Nav2/>
                    <div className="componentContent">
                        hola
                    </div>
                <Footer/>
            </div>
        )
    }
}

export default SignIn; 