import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import {  Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeTab: '1'
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle = (tab) => {
        this.setState({
            activeTab: tab
        })
    }

    render(){
        return(
            <div id="footCont">

            <Nav tabs>

                <Row style={{
                    paddingLeft: "2vw",
                    paddingRight: "2vw",
                    textAlign: "center",
                    
                }}>
                <Col style={{
                    width: "20%",                    
                }}>
                <NavItem>
                <NavLink>                    
                    <Link to="/">
                        Home
                    </Link>
                </NavLink>
                </NavItem>
                </Col>
                
                <Col style={{
                    width: "27%"
                }}>
                <NavItem>
                <NavLink>
                    <Link to="/services">
                        Services
                    </Link>
                </NavLink>
                </NavItem>
                </Col>

                <Col style={{
                    width: "27%",
                    
                }}>
                <NavItem>
                <NavLink>
                    <Link to="/myquotes">
                        Quotes
                    </Link>
                </NavLink>
                </NavItem>
                </Col>

                <Col style={{
                    width: "26%",
                }}>
                <NavItem>
                <NavLink>
                    <Link to="/userjobs">
                        Jobs
                    </Link>
                </NavLink>
                </NavItem>
                </Col>
                </Row>

            </Nav>      

            </div>
            
        )
    }
}

export default Footer;

/*
    var URLactual = window.location;
        return(
            URLactual == 'http://localhost:3000/' ?
    URLactual == 'http://localhost:3000/' ?
            <div className="p-2 bg">
                    <footer className="row text-center">
                        <Link className="col text-muted" to="/"></Link>
                        <Link className="col text-white" to="/"><i className="fas fa-home fa-2x"></i></Link>
                        {(window.history.length == 1) ? 
                        <div className="col"></div>
                        :
                        <div onClick={() => { window.history.go(1);}} className="col text-white"><i className="fas fa-chevron-right fa-2x"></i></div>
                        }
                        
                    </footer>
            </div>
            :
            <div className="p-2 bg">
                    <footer className = "row text-center mt-1">
                        <div onClick={() => { window.history.go(-1);}} className="col text-white"><i className="fas fa-chevron-left fa-2x"></i></div>
                        <Link className="col text-white" to="/"><i className="fas fa-home fa-2x"></i></Link>
                        <div onClick={() => { window.history.go(1);}} className="col text-white"><i className="fas fa-chevron-right fa-2x"></i></div>
                    </footer>

*/

/* -------------------SECOND ------- BUTTON LAYOUT*-----------/


/*
<div id="footCont" color="secondary" >
                <Row>
                    <Col>
                        <Button color="link">
                            <Link to="/">
                                Home
                            </Link>
                        </Button>
                    </Col>
                    <Col>
                    <Button color="link">
                            <Link to="/services">
                                Services
                            </Link>
                        </Button>
                    </Col>
                    <Col>
                        <Button color="link">
                            <Link to="/myquotes">
                                Quotes
                            </Link>
                        </Button>
                    </Col>
                </Row>                    
            </div>
*/