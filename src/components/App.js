import { Component } from "react";
import Cocktail from "./Cocktail";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      offcanvas: false
    }
    this.cocktailShow = this.cocktailShow.bind(this);
  } 

  cocktailShow(id) {
    this.setState(state => ({ 
      id: id,
      offcanvas: !state.offcanvas }
    ));
  }

  render() {
    let {id, offcanvas} = this.state;
    return (
      <>
        <Header />
        <Main cocktailShow={this.cocktailShow} />
        <Footer />
        <Cocktail id={id} show={offcanvas} cocktailShow={this.cocktailShow} />
      </>
    );
  }
}

export default App;
