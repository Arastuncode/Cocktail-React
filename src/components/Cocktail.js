import { Component } from "react";
import { Card, Offcanvas } from "react-bootstrap";
import CocktailService from "../services/CocktailService";

const cocktails = new CocktailService();

class Cocktail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            cocktail: {}
        }
    }
    
    componentDidUpdate() {
        if (this.props.id !== this.state.id && this.props.show === true) {
            cocktails.getCocktailById(this.props.id)
            .then( result => {
                console.log("State Update")
                this.setState( {
                    id: this.props.id, 
                    cocktail: result
                } );
            } );
        }
    }

    render(){
        const {show, cocktailShow} = this.props
        const {name, img, isAlc, cat, desc, ings} = this.state.cocktail;
        return(
            <Offcanvas show={show} onHide={() => {
                this.setState( { id: null } )
                cocktailShow()
            }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{name}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Card>
                        <Card.Img variant="top" src={img} alt={name} />
                        <Card.Body>
                            <Card.Title>
                                <small>{isAlc} - {cat}</small>
                            </Card.Title>
                            <h4>Ingredients: </h4>
                                <ul>
                                    { ings?.map( (ing, i) => ( <li key={i}>{ing}</li> ) ) }
                                </ul>
                            <Card.Text>{desc}</Card.Text>
                        </Card.Body>  
                    </Card>
                </Offcanvas.Body>
            </Offcanvas>
        );
    }
}

export default Cocktail;