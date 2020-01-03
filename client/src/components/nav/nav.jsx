import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class Nav2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            setIsOpen: false
        };
        this.toggle = this.toggle.bind(this)
    }

    toggle () {
        this.setState({
          setIsOpen: !this.state.setIsOpen
        })
    }

    render(){
        return(
         
      <Navbar color="danger" light expand="md" fixed="true">
      
      <UncontrolledDropdown>   
        <DropdownToggle nav caret>
          <span style={{fontSize: "1.2em", color: "white"}}>Options</span>
        </DropdownToggle>
        
          <DropdownMenu>
            <DropdownItem>
              <Link to="/sign-in">
                My quotes
              </Link>
            </DropdownItem>
            <DropdownItem>
              Option 2
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <NavbarToggler onClick={this.toggle} />
        <Collapse  isOpen={this.state.setIsOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem style={{color: "white"}}>
            <Link to="/sign-up">
              <span style={{color:"white", fontSize:"0.9em"}}>Create Account</span>
            </Link>
            </NavItem>            
            <NavItem style={{color: "white"}}>
            <Link to="/sign-in">
                <span style={{color:"white", fontSize:"0.9em"}}>Login</span>
            </Link>
            </NavItem>            
          </Nav>
        </Collapse>
       
      </Navbar>
    
        )
    }
}

export default Nav2;