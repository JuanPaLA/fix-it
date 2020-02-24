import React, {useState, useEffect, Component} from 'react'
import { Form, Input, Button, Container, Col, Row } from 'reactstrap';
import '../../services/userJobs.css';
import { connect } from 'react-redux';
import { getJobsByUser } from "../../../redux/actions/jobActions";
import { getJobById } from "../../../redux/actions/jobActions";
import  PropTypes from 'prop-types';
import Footer from '../../footer/footer';
import jwt from 'jwt-decode' // import dependency
import './workerJob.css';
import io from 'socket.io-client';

class UserJob extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedJobId: '',
            selectedChatMessages: [],
            selectedJob: [],
            jobs: [],
            input: '',
            userId: '',
            lastMessage: ''
        }
        this.selectingJobId = this.selectingJobId.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount(){
        const token = localStorage.getItem('jwtToken');
        const user = jwt(token)
        const userId = user.id; 
        await this.props.getJobsByUser(userId)
        this.setState({
            userId: userId,
            jobs: this.props.job
        })
        let server = "http://localhost:5000";
        this.socket = io(server);

        if(this.state.selectedChatMessages.length > 0){
            this.setState({
                lastMessage: this.selectedChatMessages[this.state.selectedChatMessages.length-1].message
            })    
        }
    }

    async selectingJobId(jobId){        
        await this.props.getJobById(jobId)
        this.setState({
            selectedJobId: jobId,
            selectedJob: this.props.job,
            selectedChatMessages: this.props.job.messages  
        })
        this.socket.on('salida', mensaje =>{
            if(mensaje.message != this.state.lastMessage){
                var joined = this.state.selectedChatMessages.concat([mensaje])
                console.log(mensaje)
                this.setState({
                    lastMessage: mensaje.message,
                    selectedChatMessages: joined
                })
            }else{

            }
         
        })
    }

    async handleSubmit(event){
        event.preventDefault();
        var jobId = this.state.selectedJobId;
        var message = this.state.input;
        var emiter = this.state.userId;
        this.socket.emit('mandar', ({jobId, emiter, message}))
        this.setState({
            input: ''
        })
        await this.props.getJobById(this.state.selectedJobId)
        this.setState({
            selectedChatMessages: this.props.job.messages
        })
        this.socket.on('salida', mensaje =>{
            if(mensaje.message != this.state.lastMessage){
                var joined = this.state.selectedChatMessages.concat([mensaje])
                console.log(mensaje)
                this.setState({
                    lastMessage: mensaje,
                    selectedChatMessages: joined
                })
            }else{

            }
         
        })
        
    }

    handleInputChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    render(){
        return(
            <div>
                <div className="content">
                <h4>Your Fixies!</h4>   
                <Container fluid id="chatswrapper">

                <Row >
                    <Col id="leftCol" xs="3.5">
                    {this.state.jobs.map((elem, i)=> (
                        <div className="selecter">
                            <Button action className="chatPicker"
                            onClick={this.selectingJobId.bind(this,`${elem._id}`)}>
                            {elem.titulo}                            
                            </Button>
                        </div>
                    ))}
                    </Col>
                    <Col fluid id="rightCol" xs="6.5">
                        <Container fluid>                        
                        <Row fluid id="bodyChat">
                        
                        <div fluid id="messagesContainer">
                        {this.state.selectedChatMessages.map((mes, i)=>(
                            mes.emiter === this.state.userId ? 
                            (
                                <div className="userMes">
                                    <span>{mes.message} </span><br></br> 
                                </div>  
                            ):(
                                <div className="workerMes">
                                    <span>{mes.message} </span><br></br> 
                                </div> 
                            )
                        ))}                                                
                        </div>                    
                        </Row>
                        <Row fluid id="textArea">
                            <Input type="textarea" 
                            value={this.state.input}
                            onChange={this.handleInputChange}>
                            </Input>
                        </Row>
                        <Row fluid id="submiter">
                            <Button 
                            onClick={this.handleSubmit}>
                            SEND
                            </Button>
                        </Row>
                </Container>
                    </Col>
                </Row>
                </Container>
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        )
    }
}

UserJob.propTypes = {
    job: PropTypes.array.isRequired,
    getJobsByUser: PropTypes.func.isRequired,
    getJobById: PropTypes.func.isRequired 
}

const mapStateToProps = (state) => ({
    job: state.job.jobs
})

export default connect(mapStateToProps,
    {getJobsByUser, getJobById})(UserJob);