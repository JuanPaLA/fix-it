import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form, Row, Col, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';
import { getBudgetsByQuote, rejectBudget } from '../../redux/actions/budgetActions';
import { deleteBudgetInQuote } from '../../redux/actions/quoteActions';
import { postJob } from '../../redux/actions/jobActions';
import  PropTypes from 'prop-types';
import './userModalBudget.css';

class UserModalBudget extends Component {
    constructor(props){
        super(props);
        this.state = {
            quoteId: '',
            userId: '',
            workerId: '',
            budgetsCollection: '',
            bool: false,
            modal: false,
            navigate: false
        }
        this.toggle = this.toggle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.rejectingBudget = this.rejectingBudget.bind(this);
        this.confirmingJob = this.confirmingJob.bind(this);
    }

    async componentDidMount(){
        
        await this.props.getBudgetsByQuote(this.props.quoteId)
        this.setState ({
            budgetsCollection: this.props.budget            
        })        
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
      
      confirmingJob(a, b, c, d){
          /*
            - 1) Change state of others budgets for the same quote
            - 2) Quit off the visibility of quoteId
            - 3) Create Job through POST
          */
         //3
        var budgetId = a;
        var titulo = b;
        var precio = c;
        var workerId = d;
        this.props.postJob(budgetId, this.props.quoteId, this.props.userId, titulo, precio, workerId);
        this.setState ({
            navigate: true
        }) 
      }
      
       rejectingBudget(a){
        this.props.rejectBudget(a); //this does two things: delete budgetId from quote collection
        var budgetId = a;
        this.props.deleteBudgetInQuote(this.props.quoteId, budgetId) //and set to false the state of specified budget
        this.setState ({
            budgetsCollection:  this.props.budget
        })
        window.location.reload();
      }

      handleInputChange(evt) {
        const value =
        evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;    
        this.setState({
          ...this.state,
          [evt.target.name] : value
        });
      }

    render(){
        if (this.state.navigate === true) {
            return <Redirect to='/userjobs' />
          }
        return(
            <div>
                <div>
                    <Button 
                        color="link"
                        onClick={this.toggle} >
                        See Budgets!
                    </Button>
                </div>  
                <Modal 
                    isOpen={this.state.modal} 
                    toggle={this.toggle}>

                <ModalHeader>
                    {this.props.budget.length} budgets
                </ModalHeader>

                <ModalBody>
                    {this.props.budget.map((bud, b) => 
                        <div>
                        <ModalBody className="modalBodier">
                            <div className="priceSpan">
                                <Row>
                                    <Col>
                                        <span className="priceSpan">
                                            Price: <br></br> 
                                            <span style={{
                                                color: "red", 
                                                fontSize: "1em",
                                                fontWeight: "500",
                                                marginTop: "-0.5vh",
                                                textAlign: "center"
                                                }}>
                                                    {bud.precio} 
                                            </span>
                                        </span>                        
                                    </Col>
                                    <Col style={{
                                        textAlign: "right"
                                    }}>
                                        <span className="priceSpan">
                                            Visit Term: {String(bud.estado)}
                                        </span>
                                    </Col>
                                </Row>     
                                <Row>
                                    <Label style={{
                                        fontSize: "0.8em", 
                                        paddingLeft: "3vw"                                       
                                    }}>
                                        Provider message:
                                    </Label>
                                    <Input 
                                        type="textarea" 
                                        value={bud.mensaje} 
                                        style={{
                                            marginTop: "-1vh",
                                            fontSize: "0.9em"
                                        }}    
                                        disabled>
                                    </Input>
                                
                                </Row>                           
                                
                            </div>
                            <ModalFooter>
                                <Row>
                                    <Col>
                                        <Button 
                                        id="acceptBudget"
                                        data-mssg={bud.precio}
                                        onClick={this.confirmingJob.bind(this,
                                        `${bud._id}`, 
                                        `${bud.titulo}`, 
                                        `${bud.precio}`,
                                        `${bud.workerId}` )}>
                                            Confirm!
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button 
                                        id="deleteBudget" 
                                        color="danger"                                        
                                        onClick={this.rejectingBudget.bind(this, `${bud._id}`)}
                                        >
                                            Reject!
                                        </Button>
                                    </Col>
                                </Row>                                
                            </ModalFooter>
                            <div>
                                <hr style={{
                                    borderWidth:"1px",
                                    marginTop: "-2.2vh",
                                    marginBottom:"-1vh",
                                    borderColor: "	#C0C0C0"
                                    }}></hr>
                            </div>
                        </ModalBody>
                        </div>
                    )}
                </ModalBody>
                
                </Modal>
            </div>
        )
    }
}

UserModalBudget. proptTypes = {
    getBudgetsByQuote: PropTypes.func.isRequired,
    budget: PropTypes.array.isRequired,
    rejectBudget: PropTypes.func.isRequired,
    deleteBudgetinQuote: PropTypes.func.isRequired,
    postJob: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    budget: state.budget.budgets
})

export default 
connect(mapStateToProps, 
    {getBudgetsByQuote, rejectBudget, deleteBudgetInQuote, postJob}) 
    (UserModalBudget);