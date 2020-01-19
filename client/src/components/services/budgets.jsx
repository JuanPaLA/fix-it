import 'bootstrap/dist/css/bootstrap.min.css';  
import React, { Component } from 'react';
import Nav2 from '../nav/nav';
import Footer from '../footer/footer';
import './budgets.css';
import { connect } from 'react-redux';
import { getServices } from '../../redux/actions/serviceActions';
import  PropTypes from 'prop-types';
import SubQuotes from './subquotes';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

class Budgets extends Component {
    constructor(props){
        super(props);
        this.state = {
            specialties : [],
            value: '',
            selectedId: '',
            count: 1,
            activeTab: 1, 
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    handleInputChange(evt) {
        this.setState({value: evt.target.value});   
    }  

    async componentDidMount(){
        await this.props.getServices();
    }

    toggle = tab => {
        if(this.state.activeTab !== tab){
          this.setState({
              activeTab: tab
          })  
        } 
    }

    render(){
        return(
            <div className="encloser">
                <Nav2/>
                <div className="cc">
                <Form inline>
                    <FormGroup className="mb-2  mb-sm-0">
                        <Label for="especialidad" id="label" className="mr-sm-2">
                            <h4>
                                Select a type of job!
                            </h4>
                        </Label>
                    
                        <Input type="select" value={this.state.value} onChange={this.handleInputChange} name="especialidad" id="especialidad">
                            {this.props.service.map((spec, i) =>                     
                                <option key={i} className="opt">{spec.especialidad}</option>                    
                            )}
                    
                        </Input>

                        <hr style={{
                            border: "thin inset !important black", 
                            width: "88vw",
                            marginTop: "2vh",
                            borderBlockStartStyle: "inset !important"
                            }}>
                        </hr>

                    </FormGroup>                    
                    
                        {this.props.service.map((e,z) => {
                                if (e.especialidad === this.state.value) return <div>
                                <SubQuotes key={{z}} id={e._id}/> 
                                </div>
                            })
                        }
                 </Form>      


                 <hr style={{
                            border: "thin inset !important black", 
                            width: "88vw",
                            marginTop: "2vh",
                            borderBlockStartStyle: "inset !important"
                            }}>
                </hr>

                {/* -----------TABS TEMPLATE-----------             */}
                <div>

                
                <Nav tabs>
                    <NavItem>
                    <NavLink className="naver"
                        style={{color:"black"}}
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); 
                    }}
                    >
                        Tab1
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink className="naver"
                        style={{color:"black"}}
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); 
                    }}
                    >
                        Moar Tabs
                    </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                <Row>
                    <Col sm="12">
                    <h4>Tab 1 Contents</h4>
                    </Col>
                </Row>
                </TabPane>
                <TabPane tabId="2">
                <Row>
                    <Col sm="6">
                    <Card body>
                        <CardTitle
                        style={{color:"black"}}
                        >
                            Special Title Treatment</CardTitle>
                        <CardText
                        style={{color:"black"}}
                        >
                            With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                    </Card>
                    </Col>
                    <Col sm="6">
                    <Card body>
                        <CardTitle
                        style={{color:"black"}}
                        >
                            Special Title Treatment</CardTitle>
                        <CardText
                        style={{color:"black"}}
                        >
                            >With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                    </Card>
                    </Col>
                </Row>
                </TabPane>
            </TabContent>
            </div>

            </div>                   
                <Footer/>
            </div>
        )
    }
}

Budgets.propTypes = {
    getServices: PropTypes.func.isRequired,
    service: PropTypes.array.isRequired, //represents the state
}

const mapStateToProps = (state) => ({
    //called like in the rootReducer
    service: state.service.services,
})

export default connect(mapStateToProps, {getServices})(Budgets);