import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';

class Footer extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <footer className="customFoot" style={{backgroundColor: "#353a40",  borderRadius: "1%"}}>
                <div className="footer text-center py-3" style={{backgroundColor: "#353a40", borderRadius: "1%"}}>
                  <a href="http://localhost:3000/" style={{backgroundColor: "#353a40", borderRadius: "1%"}}><span style={{fontSize: "1.1em", color: "white"}}> Home </span></a>
                </div>
            </footer>
        )
    }
}

export default Footer;