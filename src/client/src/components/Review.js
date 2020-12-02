import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ScrollUpButton from "react-scroll-up-button";
import { Popup, Card, Image, Rating, Grid } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import "./style-component.css";


class Review extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      list: []
    };
  }

  componentDidMount() {
    fetch('/restaurantData')
      .then(res => res.json())
      .then(data => this.setState({ list: data })
      );
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }
  getRenderedItems() {
    let restaurant = this.state.list;
    if (this.state.isOpen) {
      return restaurant;
    }
    return restaurant.slice(0, 8);
  }

  render() {
    return (
      <div>
        <div class="custom-padding">
          <nav>
            <div class="review-name">รีวิวร้านอาหาร</div>
            <ul class="menu-area">
              <li><a onClick={this.toggle}>{this.state.isOpen ? 'แสดงน้อยลง' : 'ดูทั้งหมด'}</a></li>
            </ul>
          </nav>
        </div>
        <Grid columns={4} style={{ width: "1500px", marginLeft: "250px", marginTop: "20px" }}>
          <Grid.Row>
            {this.getRenderedItems().map((item, index) => (
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
        <ScrollUpButton
          StopPosition={0}
          ShowAtPosition={150}
          EasingType='easeOutCubic'
          AnimationDuration={500}
          ContainerClassName='ScrollUpButton__Container'
          TransitionClassName='ScrollUpButton__Toggled'
          style={{}}
          ToggledStyle={{}}
        />
      </div>
    )
  };
}

export default Review;