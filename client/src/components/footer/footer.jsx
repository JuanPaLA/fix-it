import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

class Footer extends Component {
    constructor(props){
        super(props);

    }

    render(){
        var URLactual = window.location;
        console.log(window.history.length);
        return(
            <div>
            <Nav tabs>
                <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => { toggle('1'); }}
                >
                    Tab1
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => { toggle('2'); }}
                >
                    Moar Tabs
                </NavLink>
                </NavItem>
            </Nav>                    
            </div>
            
        )
    }
}

export default Footer;


//var URLactual = window.location;
//console.log(window.history.length);
//return( 
//URLactual == 'http://localhost:3000/' ?
//             <div className="p-2 bg">
//                     <footer className="row text-center">
//                         <Link className="col text-muted" to="/"></Link>
//                         <Link className="col text-white" to="/"><i className="fas fa-home fa-2x"></i></Link>
//                         {(window.history.length == 1) ? 
//                         <div className="col"></div>
//                         :
//                         <div onClick={() => { window.history.go(1);}} className="col text-white"><i className="fas fa-chevron-right fa-2x"></i></div>
//                         }
                        
//                     </footer>
//             </div>
//             :
//             <div className="p-2 bg">
//                     <footer className = "row text-center mt-1">
//                         <div onClick={() => { window.history.go(-1);}} className="col text-white"><i className="fas fa-chevron-left fa-2x"></i></div>
//                         <Link className="col text-white" to="/"><i className="fas fa-home fa-2x"></i></Link>
//                         <div onClick={() => { window.history.go(1);}} className="col text-white"><i className="fas fa-chevron-right fa-2x"></i></div>
//                     </footer>
//             </div>