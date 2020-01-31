import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { getQuoteByField } from '../../redux/actions/quoteActions';
import  PropTypes from 'prop-types';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import {  Row, Col } from 'reactstrap';
import './subquotes.css';
import ModalForm from './../forms/modal';
import jwt from 'jwt-decode' // import dependency

class SubQuotes extends Component {
    constructor(props){
        super(props);
        this.state = {
            id : this.props.id,
            esp: this.props.esp
        }
    }

    async componentDidMount(){
        const token = localStorage.getItem('jwtToken');
        const user = jwt(token)
        const userId = user.id;
        await this.props.getQuoteByField(this.props.id);
    }
    
    render(){
        return(
            <div className="container">
                {this.props.quote != 0?(
                    this.props.quote.map((q, y) =>                     
                    <div className="cont" key={{y}}>
                    <Toast>
                        <ToastHeader icon="secondary" className="th">
                            <strong>JOB: </strong>{q.descripcion} 
                        </ToastHeader>
                        <ToastBody className="tb">
                            <strong>Description: </strong>{q.data}            
                            <Row style={{marginTop:"0.5vh"}}>
                                <Col xs="6">
                                <span><strong>Location:</strong></span> {q.barrio}
                                </Col>
                                <Col xs="6">
                                    <strong>Term: </strong>Format Time
                                </Col>                        
                            </Row>                            
                            <br/>
                            
                            <ModalForm quoteId={q._id} desc={q.descripcion} esp={q.data} userId={q.userId}/>

                        </ToastBody>
                    </Toast>
                </div>
                )):(
                    <div>
                        <h6 style={{color:"black"}}>No quotes available for selected field</h6>                    
                    </div>
                )}                 
            </div>
        )
    }
}

SubQuotes.proptType = {
    getQuoteByField: PropTypes.func.isRequired,
    quote: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    //called like in the rootReducer
    quote: state.quote.quotes
})

export default connect(mapStateToProps, {getQuoteByField})(SubQuotes)