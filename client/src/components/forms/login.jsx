import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component, useState } from 'react';
import Nav2 from './../nav/nav';
import Footer from './../footer/footer';
import { Link } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';    
import './login.css'
import SignIn from './signIn';
import SignUp from './signUp';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeTab: 1,            
            navigate: false
        }
        this.toggle = this.toggle.bind(this);
    }
    
    toggle = tab => {
        if(this.state.activeTab !== tab){
            this.setState ({
                activeTab: tab
            })
        } 
      }

      componentDidMount() {
          this.toggle('1');
      }

    render(){
        return(
            <div>
                <div>
                    {/* <Nav2/> */}
                </div>
                <div className="loginComponent">
                
                <Nav tabs>
                    <NavItem>
                    <NavLink 
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}
                    >
                        Sign In
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}>
                        Sing Up
                    </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <SignIn/>
                    </TabPane>
                    <TabPane tabId="2">
                        <SignUp/>
                    </TabPane>
                </TabContent>

                </div>                
                <div>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Login;