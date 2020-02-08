import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';  
import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import './signIn.css';
import {Link, withRouter} from 'react-router-dom';
import  PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from "../../redux/actions/authActions";
import classnames from "classnames";


class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            login: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          console.log("AUTENTICADO")
          this.setState ({
              login: true
          })
        }
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
        if(this.state.password.length <= 6){
          alert('complete required fields')    
            }else{
                const newUser = {
                    email: this.state.email,
                    password: this.state.password,
                };
                this.props.loginUser(newUser); 
                };
            }
        

        

    render(){
        if (this.state.login === true) {
            return <Redirect to='/' />
          }
        return(            
                <div className="componentContent">                    
                {/* -----------ENCABEZADO--------------------- */}
                <div>
                    <h4>Login </h4>
                    {/* -------LOGIN FORM--------- */}
                    <div className='container-fluid border my-1 mr-2 py-1 pr2 px-2'>           
                        
                    <Form onSubmit={this.handleSubmit}>
                        
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email"  value={this.state.email} onChange={this.handleInputChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" value={this.state.password}
                            onChange={this.handleInputChange} />
                        </FormGroup>

                        <FormGroup check>
                            <Label check>
                            <Input type="checkbox" />{' '}
                            Remember me.
                            </Label>
                        </FormGroup>
                        
                        <div className="bh">
                            <Row>
                                <Col>
                                    <div className="buttonHoldera">
                                        <Button>Sign In</Button>                                        
                                    </div>        
                                </Col>
                            </Row>
                        </div>
                    </Form>
                    <p style={{color:"black"}}> Don't have an account? <Link to="/sign-up">Register</Link></p>
                </div>
            </div>
        </div>
    
        );
    };
}

SignIn.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { loginUser })(SignIn);