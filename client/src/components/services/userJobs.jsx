import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component } from 'react';
import Footer from './../footer/footer';
import Chat from './../ChahtBox/Chat/Chat'
import './userJobs.css';
import jwt from 'jwt-decode' // import dependency
import { connect } from 'react-redux';
import { getJobsByUser } from "../../redux/actions/jobActions";
import { getBudgetById } from "../../redux/actions/budgetActions";
import { getChatByJobId } from "../../redux/actions/chatActions"
import { postMessage } from "../../redux/actions/messageActions";
import { Container, Row, Col, ListGroupItem } from 'reactstrap';
import  PropTypes from 'prop-types';

class Jobs extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: '',
            jobs: [],
            jobId: '',
        }
    this.selectingJobChat = this.selectingJobChat.bind(this);
    }
      
    async componentDidMount(){
        const token = localStorage.getItem('jwtToken');
        const user = jwt(token);
        const id = user.id;
        await this.props.getJobsByUser(id);
        this.setState({
            userId: id,
            jobs: this.props.job,            
        })
    }

    async selectingJobChat(jobId){        
        if(jobId != this.state.jobId)
        this.setState({
            jobId: jobId
        })
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
                        <div key={{y}} className="spander">

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
                    <div 
                    id="chatboxcontainer" 
                    className="border border-dark"
                    style={{width: "40vw", height: "70vh"}}>
                    
                    {this.state.jobId !=0 ? (
                        <div style={{color:"black"}}>
                            <Chat jobId={this.state.jobId} user={this.state.userId}/>
                        </div>
                    ):(
                        <div style={{color:"black"}}>
                            
                        </div>
                    )}
                    
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