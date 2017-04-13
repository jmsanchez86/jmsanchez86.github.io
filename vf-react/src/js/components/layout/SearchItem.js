  import React from "react";
import { IndexLink, Link } from "react-router";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default class SearchItem extends React.Component {
  getLink(id) {
    return this.props.path + "/" + id;
  }
  render() {
    const item  = this.props.item;
    const image = item.image;
    const name  = item.name;
    var blurb = item.blurb;

    var id = item.id;
    if (this.props.path == 'tags'){
      id = name;
    }
    if (this.props.path == 'recipes'){
      blurb = blurb.replace(/<(?:.|\n)*?>/gm, '');
    }
    const search_index = blurb.indexOf("recipe");

    return (
      <div>
      <ListGroupItem class="row">
        <Link to={this.getLink(id)}>
        <div class="thumbnail col-md-3 col-sm-6 col-xs-12">
          <div class="image">
              <img class="img img-rounded img-responsive thumb" src={image} />
          </div>
        </div>
        <div class="caption col-md-9 col-sm-6 col-xs-12">

            <h5 id="search_item_name" class="search">
            {name && name.length > 50 ? name.substr(0,100) + "..." : name}
            </h5>
            <p>
            {blurb ? 
                (search_index > 0 && search_index < 500 ?
                    blurb.substr(0,search_index) : (blurb.substr(0, 330)) + "...") :
                 ""}
            {blurb && search_index > 0 ? (<b>recipe</b>) : ""}
            {blurb && search_index > 0 ? blurb.substring(search_index + 6, 330) + "...": ""}
            </p>

        </div>
        
        </Link>
      </ListGroupItem>
      </div>
    );
  }
}
