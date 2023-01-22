import { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import CocktailService from "../services/CocktailService";

const cocktails = new CocktailService()

class Random extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cocktail: {
                name: '', img: '', isAlc: '', cat: '', desc: '', ings: []
            }
        }
    }

    componentDidMount(){
        cocktails.getRandomCocktail()
            .then( result => {
                    this.setState( {cocktail: result} )
                }                
            );
    }

    render() {
        const {name, img, isAlc, cat, desc, ings} = this.state.cocktail;
        return (
            <Container className="my-3">
                <Card className="border-1">
                    <Row>
                        <Col lg={6}>
                            <Card.Img variant="top" src={img} alt={name} />
                        </Col>
                        <Col lg={6}>
                            <Card.Body>
                                <Card.Title>
                                    <h2>{name} </h2>
                                    <small>{isAlc} - {cat}</small>
                                </Card.Title>
                                <h4>Ingredients: </h4>
                                    <ul>
                                        { ings?.map( (ing, i) => ( <li key={i}>{ing}</li> ) ) }
                                    </ul>
                                <Card.Text>                                    
                                    {desc.length > 1000 ? (desc.slice(0, 1000)+'...') : desc}
                                </Card.Text>
                            </Card.Body>  
                        </Col>
                    </Row>
                </Card>
            </Container>
        )
    }
}
  
  export default Random;