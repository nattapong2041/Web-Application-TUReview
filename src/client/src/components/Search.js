import React from 'react';
import { NavLink } from 'react-router-dom';
import { Popup, Card, Image, Rating, Grid } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import "./style-component.css";


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      search: ""
    };
  }

  componentDidMount() {
    fetch('/restaurantData')
      .then(res => res.json())
      .then(data => this.setState({ list: data })
      );
    console.log(this.state.list)
  }

  onchange = e => {
    this.setState({ search: e.target.value });
  }


  render() {
    const filteredName = this.state.list.filter(review => {
      return review.title.indexOf(this.state.search) !== -1;
    });
    return (
      <div>
        <div class="custom-padding">
          <nav>
            <div class="review-name">ผลการค้นหา : {this.state.search}</div>
            <ul class="menu-area"></ul>
          </nav>
        </div>
        <div class="ui fluid icon input" style={{ marginTop: '10px', marginLeft: '310px', width: '70%' }}>
          <input type="text" onChange={this.onchange} placeholder="ค้นหารายการอาหาร"></input>
          <i class="search icon"></i>
        </div>
        <Grid columns={4} style={{ width: "1500px", marginLeft: "250px", marginTop: "20px" }}>
          <Grid.Row>
            {filteredName.map((item, index) => (
              <Grid.Column key={index}>
                <NavLink exact to={`detail/${item.title}`}>
                  <Popup
                    trigger={
                      <Card style={{ margin: "10px" }}>
                        <Image style={{ height: "200px" }} src={item.image} />
                        <Card.Content>
                          <Card.Header>{item.title}</Card.Header>
                          <Card.Description>
                            {item.description}
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    }
                  >
                    <Popup.Header>คะแนนเฉลี่ย : {item.score}</Popup.Header>
                    <Popup.Content>
                      <Rating icon="star" defaultRating={item.score} maxRating={5} />
                    </Popup.Content>
                  </Popup>
                </NavLink>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default Search;