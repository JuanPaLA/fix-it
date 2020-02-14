import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component } from 'react';
import Footer from './../footer/footer';
import './userJobs.css';
import jwt from 'jwt-decode' // import dependency
import { connect } from 'react-redux';
import { getJobsByUser } from "../../redux/actions/jobActions";
import { getBudgetById } from "../../redux/actions/budgetActions";
import { getChatByJobId } from "../../redux/actions/chatActions"
import { postMessage } from "../../redux/actions/messageActions";
import { Form, Container, Row, Col, Input, Button, ListGroup, ListGroupItem } from 'reactstrap';
import io from 'socket.io-client';
import  PropTypes from 'prop-types';

let socket; 

class Jobs extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: '',
            jobs: [],
            budget:'',
            chats: [],
            inputer2: '',
            chatId: '',
            jobId: ''
        }
    this.selectingJobChat = this.selectingJobChat.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
      
    async componentDidMount(){
        const ENDPOINT = 'localhost:5000';
        const token = localStorage.getItem('jwtToken');
        const user = jwt(token);
        const id = user.id;
        await this.props.getJobsByUser(id);
        this.setState({
            userId: id,
            jobs: this.props.job,            
        })
        socket = io(ENDPOINT);
    }

    componentWillUnmount(){
        // socket.emit('disconnect')
        // socket.off();
    }
     
    handleInputChange(evt) {
        const value =
        evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;    
        this.setState({
            ...this.state,
            [evt.target.name] : value
        });
        }

    async handleSubmit(event){
        event.preventDefault();
        var emiter = this.state.userId; 
        var message = this.state.inputer2;
        var chatId = this.state.chatId;
        // REDUX FAILED OPTION
        // this.props.postMessage(this.state.chatId, emiter, message)
        /*BLANKING INPUT-AREA*/
        //SOCKET OPTION
        socket.emit('input', { message, emiter, chatId})
        socket.on('output', ({message}, callback ) => {
            console.log({message, emiter, chatId})
        })

        this.setState({
            inputer2: ''  
        })
    }

    async selectingJobChat(id){
        this.setState({
            jobId: id
        })
        await this.props.getChatByJobId(id);
        this.setState({
            chats: this.props.chat,
            chatId: this.props.chat[0]._id
        })  
        console.log(this.state.chatId)
        socket.emit('job', {id})
    }

render(){
    return(
        <div>
            <div className="fixerContainer">
                <h4>Your Fixies</h4>                
                <div className="sectioner">
                
                <Container>
                <Row id="rower">
                    <Col  className="border border-dark" id="coler1">
                    {this.state.jobs.map((aux, y) => (
                        <div className="spander">

                        <ListGroupItem  action
                        style={{
                            color: "black",
                            fontSize: "0.8em",
                            }}
                        onClick={this.selectingJobChat.bind(this,`${aux._id}`)}
                        >
                            {aux.titulo}
                        </ListGroupItem>                        
                        </div>
                        
                    )
                    )}
                    </Col>

                    <Col>
                    <div id="chatboxcontainer" className="border border-dark">
                            <Form>
                                <div id="inputer">                                    
                                        {this.state.chats.map((chat, y) =>(
                                            chat.messages.map((mes, z) => (
                                                
                                                    <span 
                                                    className="message-list"
                                                    key={{y}} 
                                                    style={{ color: "black"}}>
                                                        {mes.message}
                                                    <br></br>
                                                    </span>
                                            ))                                                                                        
                                        ))}
                                        
                                </div>
                            </Form>
                            <Form onSubmit={this.handleSubmit}>
                                <Input 
                                    id="inputer2" 
                                    type="textarea"
                                    value={this.state.inputer2} 
                                    onChange={this.handleInputChange} 
                                    name="inputer2" 
                                    />
                                
                                <div 
                                    style={{
                                        textAlign: "center"
                                        }}>
                                <Button                                                                         
                                    style={{
                                        width: "95%",
                                        textAlign: "center"
                                    }}>
                                    Send
                                </Button>
                                </div>
                            </Form>
                    </div>
                    </Col>
                </Row>
                </Container>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
}

Jobs.propTypes = {
    job: PropTypes.array.isRequired, //represents the state
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getJobsByUser: PropTypes.func.isRequired,
    getBudgetById: PropTypes.func.isRequired,
    getChatByJobId: PropTypes.func.isRequired,
    postMessage: PropTypes.func.isRequired,
    chat: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    //called like in the rootReducer
    job: state.job.jobs,
    budget: state.budget,
    chat: state.chat.chats,
    auth: state.auth
}) 

export default connect(mapStateToProps, 
    { getJobsByUser, getBudgetById, getChatByJobId, postMessage})
    (Jobs);