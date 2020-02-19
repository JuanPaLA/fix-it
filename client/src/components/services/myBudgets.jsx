import 'bootstrap/dist/css/bootstrap.min.css';  
import React, {Component} from 'react';
import WorkFooter from '../footer/workFooter';
import './myBudget.css'
import { connect } from 'react-redux';
import { getBudgetByWorkerId } from '../../redux/actions/budgetActions';
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
    }

    async componentDidMount(){
        const token = localStorage.getItem('jwtToken');
        const worker = jwt(token)
        const workerId = worker.id; 
        await this.props.getBudgetByWorkerId(workerId)
        console.log(workerId)
        console.log(this.props)
        this.setState({
            budget: this.props.budget
        })
    }
    

    render(){
        console.log(this.props)
        return(
            <div>
            <div className="mybudgetContent">
                {this.state.budget.map((elem, i) => (
                    <Row>
                        <Card className="divcarder">
                            <CardHeader className="cardhead">
                                {elem.titulo}
                            </CardHeader>
                            <Row>
                                <Col>
                            <CardText>
                                Budget: {elem.precio}
                            </CardText>
                            </Col>
                            <Col>
                            <CardText>
                                State: {String(!elem.estado)}
                            </CardText>
                            </Col>
                            </Row>
                            <Row>
                                <Col>
                                
                                </Col>
                                <Col>
                                <Button 
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
}

const mapStateToProps = (state) => ({
    budget: state.budget.budgets
})
export default connect(mapStateToProps, {getBudgetByWorkerId}) (MyBudgets);