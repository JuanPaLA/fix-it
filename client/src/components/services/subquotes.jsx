import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component, useState  } from 'react';
import { connect } from 'react-redux';
import { getServices } from '../../redux/actions/serviceActions';
import { getQuoteByField } from '../../redux/actions/quoteActions';
import  PropTypes from 'prop-types';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

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
                    <div key={{y}} className="p-3 bg-secondary my-2 rounded">
                    <Toast>
                        <ToastHeader>
                            {q.descripcion}
                        </ToastHeader>
                        <ToastBody>
                            {q.data}
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