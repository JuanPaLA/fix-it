import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component, useState  } from 'react';
import { connect } from 'react-redux';
import { getQuoteByField } from '../../redux/actions/quoteActions';
import  PropTypes from 'prop-types';
import { Toast, ToastBody, ToastHeader, UncontrolledCollapse, Button, Col, Row, Modal } from 'reactstrap';
import './subquotes.css';
import Moment from 'react-moment';
import ModalForm from './../forms/modal';

class SubQuotes extends Component {
    constructor(props){
        super(props);
        this.state = {
            id : this.props.id,
            esp: this.props.esp
        }
    }

    async componentDidMount(){
        await this.props.getQuoteByField(this.props.id);
    }

    
    render(){
        return(
            <div className="container">
                {this.props.quote.map((q, y) =>                     
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
                                    <strong>Term: </strong><Moment format="YYYY/MM/DD"><span><strong>Term:</strong></span>{q.plazo}</Moment>
                                </Col>                        
                            </Row>                            
                            <br/>
                            
                            <ModalForm id={q._id} desc={q.descripcion} esp={q.data} user={q.userId}/>

                        </ToastBody>
                    </Toast>
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