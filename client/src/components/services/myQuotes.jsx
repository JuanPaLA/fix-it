import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuotesByUser, deleteQuote } from "../../redux/actions/quoteActions";
import  PropTypes from 'prop-types';
import jwt from 'jwt-decode' // import dependency
import { Card, Button, Form, CardText, Row, Col,  CardHeader, CardFooter } from 'reactstrap';
import Nav2 from './../nav/nav';
import Footer from './../footer/footer';
import './myQuotes.css';
import { Link } from 'react-router-dom';

class MyQuotes extends Component {
    constructor(props){
        super(props);
        this.state = {
            quotes: [],
            userId: '',
            count: 0       
        }
        this.toggle = this.toggle.bind(this);
    }

    async componentDidMount(){
        const token = localStorage.getItem('jwtToken');
        const user = jwt(token);
        const id = user.id;
        await this.props.getQuotesByUser(id);
        console.log(this.props.quote)
        this.setState ({
            quotes: this.props.quote
        })
        console.log(this.state.quotes)
    }

     toggle(id){
        this.props.deleteQuote(id);
        window.location.reload();
    }

    render(){
        const newTo = { 
            pathname: "/category/595212758daa6810cbba4104", 
            param1: "Par1" 
          };

        return(
            <div>
                <div>
                    <Nav2/>
                </div>
                <div className="contenido">
                {this.state.quotes.map((elem, i) => (
                    <Row>
                    <Col>
                    <Card outline color="secondary">
                        <CardHeader>{elem.descripcion}</CardHeader>
                        <Card body>                        
                        <CardText>
                            {elem.data}
                        </CardText>
                        <Row>
                            <Col>
                         
                            </Col>    
                            <Col>
                            <Form> 
                                    <Button className="boton" 
                                    color="warning" 
                                    style={{position: "right"}}
                                    onClick={this.toggle.bind(this, `${elem._id}`)}>
                                        Delete
                                </Button>
                            </Form>
                            </Col>    
                        </Row>                                                
                        </Card>
                        </Card>
                    </Col>
                    </Row>
                ))}            
                </div>
                <div>
                    <Footer/>
                </div>                    
            </div>   
            
        )
    }
}

MyQuotes.propTypes = {
    getQuoteByUser: PropTypes.func.isRequired,
    deleteQuote: PropTypes.func.isRequired,
    quote: PropTypes.array.isRequired, //represents the state
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    //called like in the rootReducer
    quote: state.quote.quotes,
    auth: state.auth
}) 

export default connect(mapStateToProps, {getQuotesByUser, deleteQuote})(MyQuotes);