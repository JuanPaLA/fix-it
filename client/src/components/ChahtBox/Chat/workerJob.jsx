import React, {useState, useEffect, Component} from 'react'
import { Form, Input, Button, Container, Col, Row } from 'reactstrap';
import '../../services/userJobs.css';
import { connect } from 'react-redux';
import { getJobByWorkerId } from "../../../redux/actions/jobActions";
import { getJobById } from "../../../redux/actions/jobActions";
import  PropTypes from 'prop-types';
import WorkFooter from '../../footer/workFooter';
import jwt from 'jwt-decode' // import dependency
import './workerJob.css';
import io from 'socket.io-client';

class WorkerJob extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedJobId: '',
            selectedChatMessages: [],
            selectedJob: [],
            jobs: [],
            input: '',
            workerId: '',
            lastMessage: ''
        }
        this.selectingJobId = this.selectingJobId.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    async componentDidMount(){
        const token = localStorage.getItem('jwtToken');
        const worker = jwt(token)
        const workerId = worker.id; 
        await this.props.getJobByWorkerId(workerId)
        this.setState({
            workerId: workerId,
            jobs: this.props.job
        })
        let server = "http://localhost:5000";
        this.socket = io(server);
    }

    async selectingJobId(jobId){        
        await this.props.getJobById(jobId)
        this.setState({
            selectedJobId: jobId,
            selectedJob: this.props.job,
            selectedChatMessages: this.props.job.messages  
        })
    }

    async handleSubmit(event){
        event.preventDefault();
        var jobId = this.state.selectedJobId;
        var message = this.state.input;
        var emiter = this.state.workerId;
        this.socket.emit('mandar', ({jobId, emiter, message}))
        this.setState({
            input: ''
        })
        this.socket.on('salida', mensaje =>{
         var joined = this.state.selectedChatMessages.concat([mensaje])
            console.log(mensaje)
            this.setState({
                lastMessage: message,
                selectedChatMessages: joined
            })
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
                <h4>Your Jobs</h4>   
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
                        
                        <div>
                        {this.state.selectedChatMessages.map((mes, i)=>(
                            <div>
                                <span style={{color:"black"}}>
                                    {mes.message} <br></br>
                                </span>
                            </div>
                        ))}

                        <span>
                            {this.state.lastMessage}
                        </span>
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
                    <WorkFooter/>
                </div>
            </div>
        )
    }
}

WorkerJob.propTypes = {
    job: PropTypes.array.isRequired,
    getJobByWorkerId: PropTypes.func.isRequired,
    getJobById: PropTypes.func.isRequired 
}

const mapStateToProps = (state) => ({
    job: state.job.jobs
})

export default connect(mapStateToProps,
    {getJobByWorkerId, getJobById})(WorkerJob);