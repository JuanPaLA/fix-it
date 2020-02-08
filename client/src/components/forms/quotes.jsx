import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
// import Nav2 from './../nav/nav';
import Footer from './../footer/footer';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import './form.css';
import { connect } from 'react-redux';
import { postQuote } from '../../redux/actions/quoteActions';
import  PropTypes from 'prop-types';
import jwt from 'jwt-decode' // import dependency

class Quotes extends Component {
    constructor(props){
        super(props);
        this.state = {
            description: '',
            addData: '',
            city: '',
            street: '',
            number: '',
            flat: '',
            email: '',
            telefono: '',
            plazo: '',
            number: '',
            flat: '', 
            email: '',
            especialidadId: '',
            userId: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        //DECODE USER-ID
        console.log(this.props);
        const token = localStorage.getItem('jwtToken');
        const user = jwt(token)
        const id = user.id;

        this.setState({
            description: this.props.match.params.subespecialidad,
            especialidadId: this.props.match.params.id,
            userId: id
        })
        console.log(this.props.match.params.id)
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
        var descripcion = this.state.description;
        var data = this.state.addData;
        var direccion = {
            city : this.state.city,
            street : this.state.street,
            number : this.state.number,
            flat : this.state.flat
        }

        this.props.postQuote(descripcion, data, 
            this.state.plazo, direccion, 
            this.state.telefono, this.state.email, this.state.especialidadId, this.state.userId)              
            this.setState ({
                addData: '',
                city: '',
                street: '',
                number: '',
                flat: '',
                email: '',
                telefono: '',
                plazo: '',
                number: '',
                flat: '', 
                email: ''
            })
            this.props.history.push("/myquotes")
      }

    render(){
        return(
            <div>
                {/* <Nav2/> */}
                    <div className="componentContentForm">

                            {/* --------------- TYPE FORM  ------------- */}
                        <Form onSubmit={this.handleSubmit}>                    
                            <FormGroup style={{width: "95vw"}}>
                                <Label for="description" style={{color:"black"}}>Short Description</Label>
                                <Input type="text" value={this.state.description} onChange={this.handleInputChange} name="description" id="description" placeholder="shortly name yor fix"/>
                            </FormGroup>
                            <FormGroup row style={{marginTop:"-3vh"}}>
                                <Label style={{color:"black"}} for="addData" sm={2}>Aditional Data</Label>
                                <Col sm={10}>
                                <Input type="textarea" value={this.state.addData} onChange={this.handleInputChange} name="addData" id="addData" />
                                </Col>
                            </FormGroup>
                            <FormGroup style={{marginTop:"-2vh"}}>
                                <Label for="plazo" style={{color:"black"}}>Term</Label>
                                <Input type="date" name="plazo" id="plazo" placeholder="choose a convenient term"/>
                            </FormGroup>
                    
                            <hr></hr>    

                            {/* --------------- ADDRESS FORM  -------------*/}
                            
                            <div className="addressForm">
                            <FormGroup style={{width: "95vw", marginTop: "-2vh"}}>
                                <Label for="city" style={{color:"black"}}>City</Label>
                                <Input type="text" value={this.state.city} onChange={this.handleInputChange} name="city" id="city"/>
                            </FormGroup>
                            <FormGroup style={{width: "95vw", marginTop: "-2vh"}}>
                                <Label for="street" style={{color:"black"}}>Street</Label>
                                <Input type="text" value={this.state.street} onChange={this.handleInputChange} name="street" id="street"/>
                            </FormGroup>
                            <Row Form>
                                <Col xs="6">
                                    <FormGroup style={{marginTop:"-2vh"}}>
                                        <Label for="number" style={{color:"black"}}>Number</Label>
                                        <Input type="text" value={this.state.number} onChange={this.handleInputChange} name="number" id="number"/>
                                    </FormGroup>        
                                </Col>

                                <Col xs="6">
                                    <FormGroup style={{marginTop:"-2vh"}}>
                                        <Label for="flat" style={{color:"black"}}>Flat</Label>
                                        <Input type="text" value={this.state.flat} onChange={this.handleInputChange} name="flat" id="flat"/>
                                    </FormGroup>        
                                </Col>
                            </Row>
                            </div>
                            
                            <hr style={{marginTop: "-1vh"}}></hr>    
                            { /* --------------- CONTACT FORM  -------------*/}
                            <FormGroup style={{marginTop: "-2vh"}}>
                                <Label style={{color:"black"}} for="email">Email</Label>
                                <Input type="email" value={this.state.email} onChange={this.handleInputChange} name="email" id="email"/>
                            </FormGroup>

                            <FormGroup style={{marginTop: "-2vh"}}>
                                <Label style={{color:"black"}} for="telefono">Teléfono</Label>
                                <Input type="tel" value={this.state.telefono} onChange={this.handleInputChange} name="telefono" id="telefono"/>
                            </FormGroup>
                            
                            <div style={{textAlign: "center", marginBottom: "2vh"}}>
                                <Button style={{
                                    width: "80vw",
                                    fontSize: "1.2em",
                                    fontWeight: "500"
                                    }}>
                                    Quoting
                                </Button>
                            </div>                            

                        </Form>
                    </div>
                <Footer/>
            </div>
        )
    }
}

Quotes.PropType = {
    postQuote: PropTypes.func.isRequired,
    quote: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    quote: state.quote.quotes
})

export default connect(mapStateToProps, {postQuote})(Quotes)