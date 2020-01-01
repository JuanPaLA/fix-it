import 'bootstrap/dist/css/bootstrap.min.css';  
import React, {Component} from 'react';
import Nav2 from './../nav/nav';
import Footer from './../footer/footer';

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