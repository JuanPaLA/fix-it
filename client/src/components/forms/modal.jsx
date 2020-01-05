import React, { useState, Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form, Row, Col, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';
import { postJob } from '../../redux/actions/jobActions';
import  PropTypes from 'prop-types';

class ModalForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      id: this.props.id,
      esp: this.props.esp,
      desc: this.props.desc,
      user: this.props.user,
      price: null,
      mensaje: '',
      plazo: null
    }
    this.toggle = this.toggle.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount(){
    
  }

  toggle(){
    if(this.state.modal){
      this.setState({
        modal: false
      })
    }else{
      this.setState({
        modal: true
      })
    }
  }

  handleInputChange(evt) {
    const value =
    evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;    
    this.setState({
      ...this.state,
      [evt.target.name] : value
    });
  }

  handleSubmit(event){
    // this.props.postJob(this.state.price, this.state.plazo, this.state.quoteId) 
    alert(this.state.price, this.state.plazo, this.state.quoteId)
  }

render(){
  return (      
        <div>
          <Button color="danger" onClick={this.toggle}>Budget!</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Apply your budget!</ModalHeader>
            <ModalBody>
            
            {/* --------INNER FORM-------- */}

            <Form onSubmit={this.handleSubmit}>            
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="price" style={{color:"black"}}>Estimated Budget</Label>
                    <Input type="number" value={this.state.price} onChange={this.handleInputChange} name="price" id="price" style={{maxWidth: "45vw"}}/>
                  </FormGroup>
                </Col>     
                <Col>
                    <Label for="material" style={{color:"black"}}>Include material?</Label>
                    <CustomInput type="switch" id="material" name="material" style={{maxWidth: "35vw"}}/>              
                </Col>           
              </Row>        
              
              <FormGroup style={{width: "85vw"}}>
                <Label for="plazo">Visit Date</Label>
                <Input type="date" name="plazo" id="plazo"/>
              </FormGroup>

              <FormGroup style={{width: "85vw"}}>
                <Label for="mensaje" style={{color:"black"}}>Add a comment if necessary</Label>
                <Input type="textarea" value={this.state.mensaje} onChange={this.handleInputChange} name="mensaje" id="mensaje"/>
              </FormGroup>
            </Form>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleSubmit}>Confirm Budget</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
  );
}
}

export default ModalForm;