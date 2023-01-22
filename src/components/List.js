import { Component } from "react";
import './List.css';
import { Button, Card, Col, Container, Pagination, Row } from "react-bootstrap";
import CocktailService from "../services/CocktailService";

const cocktails = new CocktailService()

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            cocktarr: []
        }
        this.getCocktailList = this.getCocktailList.bind(this)
    }
    componentDidMount(){
        this.getCocktailList(0, 'a');
    }
    getCocktailList(n, letter) {
        cocktails.getCocktailByLetter(letter)
            .then( result => {
                this.setState( {
                    active: n,
                    cocktarr: result
                } )
            } );
    }

    render() {
        let {cocktailShow} = this.props;
        let {active, cocktarr} = this.state;
        let abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let letters = [];
        for (let n = 0; n < abc.length; n++) {
            letters.push(
                <Pagination.Item key={n} 
                    onClick={() => { this.getCocktailList(n, abc[n].toLowerCase() ) }} 
                    active={n === active}> {abc[n]} 
                </Pagination.Item>
            );
        }
        return (
            <Container className="py-5">
                <h2>Cocktails By First Letter</h2>
                <div id='pagin'><Pagination>{letters}</Pagination></div>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {cocktarr.map((c, idx) => (
                        <Col key={idx}>
                            <Card className="h-100">
                                <Card.Img variant="top" src={c.img} alt={c.name} />
                                <Card.Body>
                                <Card.Title>{c.name} (<i>{c.cat} - {c.isAlc}</i>)</Card.Title>
                                <Card.Text className="ellipsis2"><b>Ingredients: </b> <i>{c.ings.join(', ')}</i></Card.Text>
                                <Card.Text >{c.desc.slice(0, 100) + (c.desc.length < 100 ? '' : '...')}</Card.Text>
                                </Card.Body>
                                <Button onClick={ () => { cocktailShow(c.id) } } 
                                        variant="danger" size="sm">Read more...</Button>
                            </Card>
                        </Col>
                    ))}
                    </Row>
            </Container>
        );
    }
}
  
  export default List;