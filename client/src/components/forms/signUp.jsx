import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, CustomInput, } from 'reactstrap';
import './signUp.css';
import {Link, withRouter} from 'react-router-dom';
import  PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from "../../redux/actions/authActions";

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            pic: '',
            rol: false,
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/");
        }
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    handleInputChange(evt) {
        const value =
    evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;    
        this.setState({
          ...this.state,
          [evt.target.name] : value
        });
      }

      handleSubmit(event){
        event.preventDefault();
        if(this.state.userName.length <= 5 || this.state.password.length <= 6){
            console.log('escribi ura')
        }else{
            const newUser = {
                userName: this.state.userName,
                email: this.state.email,
                password: this.state.password,
              };
              this.props.registerUser(newUser, this.props.history); 
            }
        }

    render(){
        return(
            <div className="componentContent">       >
                {/* -----------ENCABEZADO--------------------- */}
                <div>
                    <h4 className="hsu">Create your account</h4>
                    {/* -------SIGN UP FORM--------- */}
                    <div className='container-fluid border my-1 mr-2 py-1 pr2 px-2'>
                    
                    <Form onSubmit={this.handleSubmit}>

                        <FormGroup> 
                            <Label for="userName">User name</Label>
                            <Input type="text" name="userName"  value={this.state.userName} onChange={this.handleInputChange}/>
                        </FormGroup>

                        <FormGroup> 
                            <Label for="email">Email</Label>
                            <Input type="email" name="email"  value={this.state.email} onChange={this.handleInputChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" value={this.state.password}
                            onChange={this.handleInputChange} />
                        </FormGroup>    
                        
                        <div style={{textAlign: "center"}}>
                        <FormGroup>
                            <Label for="rol">¿Are you looking for a job too?</Label>
                              <CustomInput type="switch" id="rol" name="rol"/>
                        </FormGroup>
                        </div>
                        
                        
                        <div className="buthold">
                            <Button type="submit" id="bs">Submit</Button>
                        </div>                        
                    </Form>

                    <p style={{color:"black"}}> Already have an account? 
                      <Link to="/sign-in">
                          <span style={{color:"blue"}}> Login </span>
                      </Link>
                    </p>
                    </div>
                </div>
            </div>
        )
    }
}

SignUp.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(mapStateToProps, { registerUser })(withRouter(SignUp));