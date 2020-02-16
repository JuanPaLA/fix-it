import React, {useState, useEffect, Component} from 'react'
import io from 'socket.io-client';
import { Form, Input, Button } from 'reactstrap';
import '../../services/userJobs.css';
import { connect } from 'react-redux';
import { getJobById } from "../../../redux/actions/jobActions";
import  PropTypes from 'prop-types';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';

class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            jobId: '',
            job: [],
            doc: [],
            input: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    ROOT_CSS = css({
        height: 600,
        width: 400
      });

    async componentDidMount(){
        await this.props.getJobById(this.props.jobId)        
        this.setState({
            jobId: this.props.jobId,
            job: this.props.job,
            userId: this.props.user,
            doc: this.props.job.messages            
        })
        console.log(this.state)
        let server = "http://localhost:5000";
        this.socket = io(server);

        this.socket.on("output", mensaje => {
            console.log(mensaje)
            //estaria piola poder agregarlo orgánicamente al state
            //así no lo traemos por redux
        })
    }

   async handleSubmit(event){
        event.preventDefault();
        var emiter = this.props.user; 
        var message = this.state.input;
        var job = this.state.jobId;

        this.socket.emit('input', ({message, emiter, job}))

        this.setState({
            input: ''  
        })

        await this.props.getJobById(this.props.jobId)        
        this.setState({
            doc: this.props.job.messages            
        })

    }

    handleInputChange(evt) {
        const value =
        evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;    
        this.setState({
            ...this.state,
            [evt.target.name] : value
        });
        }

    componentWillUnmount(){
        this.socket.emit('disconnect')
        this.socket.off();
    }

    render(){
        return(
            <div>
                <div>
                <Form>
                        <div id="inputer">   
                            <ScrollToBottom>
                                
                                    {this.state.doc.length}

                                    {this.state.doc.map((m,z)=>(
                                        <span style={{paddingLeft: "1px"}}>
                                            {m.message}
                                            <br></br>
                                        </span>
                                    ))}
                                
                                    </ScrollToBottom>                            
                        </div>
                    </Form>
                    <Form onSubmit={this.handleSubmit}>
                        <Input 
                            id="input" 
                            type="textarea"
                            value={this.state.input} 
                            onChange={this.handleInputChange} 
                            name="input" 
                            />
                        
                        <div 
                            style={{
                                textAlign: "center"
                                }}>
                        <Button                                                                         
                            type="submit"
                            onSubmit={this.handleSubmit}
                            style={{
                                width: "95%",
                                textAlign: "center"
                            }}>
                            Send
                        </Button>
                        </div>
                    </Form>
                </div>  
            </div>
        )
    }
}

Chat.propTypes = {
    job: PropTypes.array.isRequired, //represents the state
    getJobById: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    //called like in the rootReducer
    job: state.job.jobs,
}) 

export default connect(mapStateToProps, 
    { getJobById})
    (Chat);

    