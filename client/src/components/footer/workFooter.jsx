import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
// import './footer.css';
import { Link } from 'react-router-dom';
import {  Nav, NavItem, NavLink, Row, Col } from 'reactstrap';


class WorkFooter extends Component {
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
                        textAlign: "center"                        
                    }}>
                    <Col style={{
                    width: "21%",
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
                    width: "24%",
                }}>
                    <NavItem>
                    <NavLink>
                        <Link to="/budgets">
                            Jobs!
                        </Link>
                        </NavLink>
                        </NavItem>
                    </Col>
                    <Col style={{
                    width: "26%", 
                }}>
                        <NavItem>
                        <NavLink>
                            <Link to="/mybudgets">
                                Budgets
                            </Link>
                        </NavLink>
                        </NavItem>
                        
                    </Col>
                    <Col style={{
                    width: "27%", 
                }}>
                        <NavItem>
                        <NavLink>
                            <Link to="/workerJOB">
                                Chat!
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

export default WorkFooter;