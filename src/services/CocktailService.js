class CocktailService {
    constructor() {
        this.path = 'https://www.thecocktaildb.com/api/json/v1/1';
    }
    
    getRes(url) {
        return fetch(url)
            .then(
                res => res.json(),
                error => error
            )
            .then(
                result => result
            )
    }
    getCocktailById(id) {
        return this.getRes(`${this.path}/lookup.php?i=${id}`)
            .then ( 
                result => this._transform( result.drinks[0] )
            )
    }
    getRandomCocktail() {
        return this.getRes(`${this.path}/random.php`)
            .then ( 
                result => this._transform( result.drinks[0] )
            )
    }
    getCocktailByLetter(letter) {
        return this.getRes(`${this.path}/search.php?f=${letter}`)
            .then ( 
                result => result.drinks.map( c => this._transform( c ) )
            )
    }

    _transform(obj) {
        let newobj = {
            id: obj.idDrink,
            isAlc: obj.strAlcoholic,
            cat: obj.strCategory,
            name: obj.strDrink,
            img: obj.strDrinkThumb,
            glass: obj.strGlass,
            desc: obj.strInstructions,
            ings: Object.entries(obj)
                        .filter( e => e[0].includes('strIngredient') && e[1] != null )
                        .map( e => e[1] ) 
        }
        return newobj;
    }
}

export default CocktailService
