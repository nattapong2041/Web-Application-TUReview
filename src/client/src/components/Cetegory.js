import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import { Popup, Card, Image, Rating, Grid } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import "./style-component.css";
class Cetegory extends Component {
  state = {
    category: "แซลม่อน",
    noCategory: '1',
    list: []
  };

  componentDidMount() {
    fetch('/restaurantData')
      .then(res => res.json())
      .then(data => this.setState({ list: data })
      );
  }

  onclickSalmon = e => {
    this.setState({ category: "แซลม่อน", noCategory: '1' });
  }

  onclickJapan = e => {
    this.setState({ category: "อาหารญี่ปุ่น", noCategory: '2' });
  }

  onclickBuffet = e => {
    this.setState({ category: "บุฟเฟต์", noCategory: '3' });
  }

  onclickShabu = e => {
    this.setState({ category: "ชาบู", noCategory: '4' });
  }

  onclickpingyang = e => {
    this.setState({ category: "ปิ้งย่าง", noCategory: '5' });
  }

  onclicktarmsang = e => {
    this.setState({ category: "อาหารตามสั่ง", noCategory: '6' });
  }

  onclickPattacarn = e => {
    this.setState({ category: "ภัตตาคาร", noCategory: '7' });
  }

  onclickCake = e => {
    this.setState({ category: "ของหวาน&คาเฟต์", noCategory: '8' });
  }

  onclickAnother = e => {
    this.setState({ category: "อื่นๆ", noCategory: '9' });
  }

  clearFilter = e => {

    this.setState({ category: "", noCategory: null });
  }

  render() {
    const filterRecommend = this.state.list.filter(Review => {
      return Review.category === this.state.noCategory || this.state.noCategory === null;
    });
    return (
      <div>
        <div class="custom-padding">
          <nav>
            <div class="review-name">หมวดหมู่ : {this.state.category}</div>
            <ul class="menu-area">
              <li><a onClick={this.clearFilter}>ล้างฟีลเตอร์</a></li>
            </ul>
          </nav>
        </div>
        <div class="button-Cetegory">
          <input class="edit-button" type="image" onClick={this.onclickSalmon} src="https://uppic.cc/d/KDjT" />
          <input class="edit-button" type="image" onClick={this.onclickJapan} src="https://uppic.cc/d/KDFc" />
          <input class="edit-button" type="image" onClick={this.onclickBuffet} src="https://uppic.cc/d/KDFA" />
          <input class="edit-button" type="image" onClick={this.onclickShabu} src="https://uppic.cc/d/KDF8" />
          <input class="edit-button" type="image" onClick={this.onclickpingyang} src="https://uppic.cc/d/KDFB" />
          <input class="edit-button" type="image" onClick={this.onclicktarmsang} src="https://uppic.cc/d/KDF7" />
          <input class="edit-button" type="image" onClick={this.onclickPattacarn} src="https://uppic.cc/d/KDFC" />
          <input class="edit-button" type="image" onClick={this.onclickCake} src="https://uppic.cc/d/KDFz" />
          <input class="edit-button" type="image" onClick={this.onclickAnother} src="https://uppic.cc/d/KDFL" />
        </div>
        <Grid columns={4} style={{ width: "1500px", marginLeft: "250px", marginTop: "20px" }}>
          <Grid.Row>
            {filterRecommend.map((item, index) => (
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

export default Cetegory;