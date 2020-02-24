import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuotesByUser, deleteQuote } from "../../redux/actions/quoteActions";
import { deleteBudgetByQuote } from "../../redux/actions/budgetActions";
import  PropTypes from 'prop-types';
import jwt from 'jwt-decode' // import dependency
import { Card, Button, Form, CardText, UncontrolledCollapse, CardTitle, Row, Col,  CardHeader, CardFooter } from 'reactstrap';
// import Nav2 from './../nav/nav';
import Footer from './../footer/footer';
import UserModalBudget from '../forms/userModalBudget';
import './myQuotes.css';

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
        this.setState ({
            quotes: this.props.quote,
            userId: id
        })
    }

     toggle(id){
        this.props.deleteQuote(id);
        this.props.deleteBudgetByQuote(id);
        window.location.reload();
    }

    render(){
        return(
            <div>                                
                <div className="contenido">
                <h4 style={{marginBottom: "2vh"}}>Your Quotes!</h4>
                {this.state.quotes.map((elem, i) => (
                    <Row>
                    
                    <Card className="divcarder">
                        <CardHeader className="cardhead">
                            {elem.descripcion}                            
                        </CardHeader>
                        
                        <CardText>
                            {elem.data}
                        </CardText>
                        <Row style={{
                            textAlign: "center"
                        }}>
                            <Col style={{
                                width: "50%",                    
                            }}>                         
                            {elem.budgets != 0 ?(
                                
                                <div>
                                    <UserModalBudget quoteId={elem._id} userId={this.state.userId}/>
                                </div>
                        
                            ):(
                                <div  style={{
                                        textAlign: "center",
                                        paddingLeft: "3vw"  
                                    }}>
                                    <span>
                                    No budgtes yet!</span>
                                </div>
                            )}

                            </Col>    
                            <Col style={{
                                width: "50%",                    
                            }}>                            
                                <Button 
                                    color="danger"                                           
                                    onClick={this.toggle.bind(this, `${elem._id}`)}>
                                        Delete
                                </Button>                            
                            
                            </Col>    
                        </Row>                                                
                        
                        </Card>
                    
                    </Row>
                ))}            
                </div>                                                    
                <Footer/>                
            </div>   
            
        )
    }
}

MyQuotes.propTypes = {
    getQuoteByUser: PropTypes.func.isRequired,
    deleteQuote: PropTypes.func.isRequired,
    deleteBudgetByQuote: PropTypes.func.isRequired,
    quote: PropTypes.array.isRequired, //represents the state
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getQuotesByUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    //called like in the rootReducer
    quote: state.quote.quotes,
    auth: state.auth
}) 

export default 
connect(mapStateToProps, 
    {getQuotesByUser, deleteQuote, deleteBudgetByQuote})
    (MyQuotes);