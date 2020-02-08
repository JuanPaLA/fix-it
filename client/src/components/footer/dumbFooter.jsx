import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import './dumbFooter.css';
import { Link } from 'react-router-dom';

class DumbFooter extends Component {
    constructor(props){
        super(props);
        
    }

    render(){
        return(
            <div className="dumbFott">
                <div className="homer">                    
                    
                    {/* <i className="fas fa-home fa-2x"></i> */}
                    <h4 style={{
                        color: "white",
                        fontWeight: "bold"
                    }}>Fix-It!</h4>
                    
                </div>
            </div>
        )
    }
}

export default DumbFooter; 