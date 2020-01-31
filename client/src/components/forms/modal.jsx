import React, { useState, Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form, Row, Col, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';
import { postBudget } from '../../redux/actions/budgetActions';
import  PropTypes from 'prop-types';
import './modal.css';
import jwt from 'jwt-decode' // import dependency

class ModalForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      quoteId: this.props.id,
      esp: this.props.esp,
      desc: this.props.desc,
      user: this.props.user,
      precio: '',
      mensaje: '',
      plazo: ''
    }
    this.toggle = this.toggle.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount(){
    console.log(this.props)

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
    const token = localStorage.getItem('jwtToken');
    const user = jwt(token)
    const workerId = user.id;
    this.toggle();
    // alert(this.props.userId)
    // alert(this.state.precio, this.props.quoteId, this.state.mensaje, this.props.userId, workerId);
    this.props.postBudget(this.state.precio, this.props.quoteId, this.state.mensaje, this.props.userId, workerId)
  }

render(){
  return (      
        <div className="mod">
          <div style={{textAlign: "center"}}>
            <Button color="danger" onClick={this.toggle} style={{width: "70vw"}}>Budget!</Button>
          </div>          
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Apply your budget!</ModalHeader>
            <ModalBody>
            
            {/* --------INNER FORM-------- */}

            <Form onSubmit={this.handleSubmit}>            
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="precio" style={{color:"black"}}>Estimated Budget</Label>
                    <Input type="number" value={this.state.precio} onChange={this.handleInputChange} name="precio" id="precio" style={{maxWidth: "45vw"}}/>
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

ModalForm.PropType = {
  postBudget: PropTypes.func.isRequired,
  budget: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  budget: state.budget.budgets
})

export default connect(mapStateToProps, {postBudget})(ModalForm);