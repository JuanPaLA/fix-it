import React, {Component} from 'react';
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
         
      <Navbar color="dark" light expand="md">
      
      <UncontrolledDropdown style={{color: "#ed4747"}}>   
        <DropdownToggle nav caret>
          <span style={{fontSize: "1.2em", color: "white"}}>Options</span>
          {/* <img id="litUser" src="http://www.iconarchive.com/download/i94391/bokehlicia/captiva/user.ico" alt="lticon"/> */}
        </DropdownToggle>
        
          <DropdownMenu>
            <DropdownItem>
              Option 1
            </DropdownItem>
            <DropdownItem>
              Option 2
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.setIsOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem style={{color: "white"}}>
            {/* <Link to="/c-account"> */}
                Create Account
              {/* </Link> */}
            </NavItem>            
            <NavItem style={{color: "white"}}>
            {/* <Link to="/login"> */}
                Login
            {/* </Link> */}
            </NavItem>            
          </Nav>
        </Collapse>
       
      </Navbar>
    
        )
    }
}

export default Nav2;