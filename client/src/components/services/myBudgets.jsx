import 'bootstrap/dist/css/bootstrap.min.css';  
import React, {Component} from 'react';
import WorkFooter from '../footer/workFooter';
import './myBudget.css'
import { connect } from 'react-redux';
import { getBudgetByWorkerId, deleteBudget } from '../../redux/actions/budgetActions';
import  PropTypes from 'prop-types';
import jwt from 'jwt-decode' // import dependency
import { Card, Button, CardText,  Row, Col, CardHeader } from 'reactstrap';

class MyBudgets extends Component {
    constructor(props){
        super(props);
        this.state = {
            workerId : '',
            budget: []
        }
        this.toggle = this.toggle.bind(this);
    }

    async componentDidMount(){
        const token = localStorage.getItem('jwtToken');
        const worker = jwt(token)
        const workerId = worker.id; 
        await this.props.getBudgetByWorkerId(worker.id)
        console.log(workerId)
        console.log(this.props)
        this.setState({
            budget: this.props.budget
        })
    }
    
    toggle(id){
        this.props.deleteBudget(id);
        window.location.reload();
    }

    render(){
        console.log(this.props)
        return(
            <div>                
            <div className="mybudgetContent">
            <h4 style={{marginBottom: "2vh"}}>Your Budgets!</h4>
                {this.props.budget.map((elem, i) => (
                    <Row>
                        <Card className="divcarder">
                            <CardHeader className="cardhead">
                                {elem.titulo}
                            </CardHeader>
                            <Row>
                                <Col>
                            <CardText>
                                <span style={{fontWeight: 600}}>
                                Budget: 
                                </span>
                                <span style={{color: "red"}}>
                                {elem.precio}
                                </span>
                            </CardText>
                            </Col>
                            <Col>
                            <CardText>
                            <span style={{fontWeight: 600}}>
                            State: 
                                </span>
                                  {String(!elem.estado)}
                            </CardText>
                            </Col>
                            </Row>
                            <Row>
                                <Col>
                                
                                </Col>
                                <Col style={{width: "50%", textAlign: "center"}}>
                                <Button style={{margin: "1vh 5vw 1vh 0 "}}
                                    onClick={this.toggle.bind(this, `${elem._id}`)}
                                    color="danger">
                                        Delete
                                </Button>              
                                </Col>
                            </Row>
                        </Card>
                    </Row>
                ))}
            </div>
            <div>
                <WorkFooter/>
            </div>
            </div>
        )
    }

}

MyBudgets.propTypes = {
    getBudgetByWorkerId: PropTypes.func.isRequired,
    budget: PropTypes.array.isRequired,
    deleteBudget: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    budget: state.budget.budgets
})
export default connect(mapStateToProps, {getBudgetByWorkerId, deleteBudget}) (MyBudgets);