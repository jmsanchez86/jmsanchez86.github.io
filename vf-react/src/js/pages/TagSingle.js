import React from "react";
import { IndexLink, Link } from "react-router";

var apiRoot = '' + require('../scripts/Config.js');

export default class TagSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients  : [],
      grocery_items: [],
      recipes : [],

      blurb : '',
      image : '',
      name : '',
      id : this.props.params.id,

    };
    this.requestData();
  }

  requestData() {

    var _this = this;

    const requestString = 'http://' + apiRoot + '/tags/' + _this.state.id;

    // Fetch singleton's required data.
    fetch(requestString)
      .then(function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem loading vennfridge info. Status Code: ' +
              response.status);
        }
        response.json().then(function(responseData) {

            _this.setState({
                ingredients : responseData.related_ingredients,
                grocery_items : responseData.related_grocery_items,
                recipes : responseData.related_recipes,

                blurb : responseData.blurb,
                image : responseData.image,
                name : responseData.name,
            });

        });
      })
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
  }

  render() {

    const name = this.state.name;
    const blurb = this.state.blurb;
    const image = this.state.image;

    var ingredients = this.state.ingredients.map(function(ingredient){
      return(
        <div key={ingredient.id+"_"+ingredient.name} class="list-group-item">
          <p><Link to={"ingredients/" + ingredient.id}>{ingredient.name}</Link></p>
        </div>);
    });

    var recipes = this.state.recipes.map(function(recipe){
      return(
        <div key={recipe.id+"_"+recipe.name} class="list-group-item">
          <p><Link to={"/recipes/" + recipe.id}>{recipe.name}</Link></p>
        </div>);
    });

    var grocery_items = this.state.grocery_items.map(function(gi){
      return(
        <div key={gi.id+"_"+gi.name} class="list-group-item">
          <p><Link to={"/grocery_items/" + gi.id}>{gi.name}</Link></p>
        </div>);
    });

    return (
      <div class="single container-fluid">
        <div class="row">
          <div class="col-lg-offset-1 col-lg-11 col-md-12 col-sm-12 col-xs-12">
            <h2>
              {name}
            </h2>
          </div>
        </div>
        <div class="row">
          <div id="blurb" class="col-lg-offset-1 col-lg-11 col-md-12 col-sm-12 col-xs-12">
            <p>
            {blurb}
            </p>
          </div>
        </div>
        <div class="row gutter-20">
          <div class="col-lg-offset-1 col-lg-4 col-md-6 col-sm-6 col-xs-12">
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div class="row">
                <p>
                  <img class="img-rounded img-responsive" src={image} />
                </p>
              </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="row">
              <div class="col-lg-11 col-md-12 col-sm-12 col-xs-12">
                <h4 disabled={!ingredients.length}>Ingredients with this tag</h4>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-11 col-md-12 col-sm-12 col-xs-12">
                {ingredients}
              </div>
            </div>
            <div class="row">
              <div class="col-lg-11 col-md-12 col-sm-12 col-xs-12">
                <h4 disabled={!recipes.length}>Recipes with this tag</h4>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-11 col-md-12 col-sm-12 col-xs-12">
                {recipes}
              </div>
            </div>
            <div class="row">
              <div class="col-lg-11 col-md-12 col-sm-12 col-xs-12">
                <h4 disabled={!grocery_items.length}>Products with this tag</h4>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-11 col-md-12 col-sm-12 col-xs-12">
                {grocery_items}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
