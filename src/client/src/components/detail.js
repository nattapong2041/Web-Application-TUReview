import React from 'react';
import "./style-component.css";
import ScrollUpButton from "react-scroll-up-button";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class Detail extends React.Component {
  state = {
    list: [],
    comment: [],
    login: false

  };
  componentDidMount() {
    const { id } = this.props.match.params;
    const { loggedIn, ...props } = this.props;
    this.setState({ login: loggedIn });
    fetch('/restaurantData')
      .then(res => res.json())
      .then(data => this.setState({ list: data })
      );

    fetch('/commentData')
      .then(res => res.json())
      .then(data => this.setState({ comment: data })
      );

    // axios({
    //   method:'PUT',
    //   url:'/updateScoreRes',
    //   headers:{'Content-Type': 'application/json'},
    //   data: JSON.stringify({
    //     title:id
    //   })       
    // })

  }

  render() {
    const { id } = this.props.match.params;
    const filterCommend = this.state.comment.filter(comment => {
      return comment.restaurant === id;
    });
    const renderRating = (score) => {
      switch (score) {
        case 0:
          return (
            <div class="star-ratings-css">
              <div class="star-ratings-css-top" style={{ width: '0%' }}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <div class="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            </div>
          );
        case 1:
          return (
            <div class="star-ratings-css">
              <div class="star-ratings-css-top" style={{ width: '23%' }}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <div class="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            </div>
          );
        case 2:
          return (
            <div class="star-ratings-css">
              <div class="star-ratings-css-top" style={{ width: '43%' }}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <div class="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            </div>
          );
        case 3:
          return (
            <div class="star-ratings-css">
              <div class="star-ratings-css-top" style={{ width: '63%' }}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <div class="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            </div>
          );
        case 4:
          return (
            <div class="star-ratings-css">
              <div class="star-ratings-css-top" style={{ width: '83%' }}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <div class="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            </div>
          );
        case 5:
          return (
            <div class="star-ratings-css">
              <div class="star-ratings-css-top" style={{ width: '200%' }}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              <div class="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            </div>
          );
      }
    }
    const result = filterCommend.reduce((sum, item) => {
      return sum + item.score / filterCommend.length
    }, 0)
    return (
      <div>
        {this.state.list.map((item, index) => (
          <div key={index}>
            {item.title === id ?
              <div className="component-detail">
                <div className="head-detail">
                  <img className="img-head" src={item.image} alt="Snow"></img>
                  <h1 className="centered">{item.title}</h1>
                  {/* <p>{item.description}</p> */}
                </div>
                <div class="topnav">
                  {this.state.login ? <Link to={`/writeComment/${id}`} style={{ fontSize:'20px',float: 'right' }}>เขียนรีวิว <span style={{ "color": "#ffaa3b" }}>★</span></Link> 
                  : 
                  <Link to="/login" style={{ fontSize:'20px',float: 'right' }}>เขียนรีวิว <span style={{ "color": "#ffaa3b" }}>★</span></Link>}
                </div>
                <div class="row">
                  <div class="leftcolumn">
                    {filterCommend.map((item, index) => (
                      <div class="card" key={index}>
                        <h2>{item.title}<span style={{ float: 'right' }}>{renderRating(item.score)}</span></h2>
                        <h5>{item.user} , {item.date}</h5>
                        <img src={item.image} class="img-Comment"></img>
                        <div style={{fontSize:'16px'}}>{item.discription}</div>
                      </div>
                    ))}
                  </div>
                  <div class="rightcolumn">
                    <div class="card" align="center">
                      {/* <h2>อันดับที่ 1 จาก {this.state.list.length}</h2> */}
                      <h1 align="center" style={{
                        "border-radius": "25px",
                        "background": "#b71c1c",
                        "padding": "5px",
                        "color": "white",
                        "width": "100px",
                        "font-size": "35px"
                      }}>{result.toFixed(1)} <span style={{ "color": "yellow" }}> ★</span></h1>
                      <h3>{filterCommend.length} รีวิว</h3>
                    </div>
                    <div class="card">
                      <h3>รายละเอียด</h3>
                      <h4>
                        <div>{item.carPark ? <span><img src="https://uppic.cc/d/KEUw" style={{ height: '20px', width: '20px' }}></img></span> : <span><img src="https://uppic.cc/d/KETC" style={{ height: '19px', width: '19px' }}></img></span>} ที่จอดรถ</div>
                        <div>{item.Wi_Fi ? <span><img src="https://uppic.cc/d/KEUw" style={{ height: '20px', width: '20px' }}></img></span> : <span><img src="https://uppic.cc/d/KETC" style={{ height: '19px', width: '19px' }}></img></span>} Wi-Fi</div>
                        <div>{item.CreditCard ? <span><img src="https://uppic.cc/d/KEUw" style={{ height: '20px', width: '20px' }}></img></span> : <span><img src="https://uppic.cc/d/KETC" style={{ height: '19px', width: '19px' }}></img></span>} บัตรเครดิต</div>
                      </h4>
                      <h4> เวลาเปิดร้าน :
                  <div>{item.timeOpen} - {item.timeClose}
                          <span> {item.day}</span>
                        </div>
                      </h4>
                      <h4>ช่วงราคา
                  <div>{item.price}</div>
                      </h4>
                      <h4>พิกัดร้าน
                  <div>{item.location}</div>
                      </h4>
                      <h4>ข้อมูลเพิ่มเติมอื่นๆ
                  <div>{item.other}</div>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              : ''}
          </div>
        ))}
        <ScrollUpButton
          StopPosition={0}
          ShowAtPosition={150}
          EasingType='easeOutCubic'
          AnimationDuration={1200}
          ContainerClassName='ScrollUpButton__Container'
          TransitionClassName='ScrollUpButton__Toggled'
          style={{}}
          ToggledStyle={{}}
        />
      </div>
    )
  }
}
const mapStateToProps = (state, props) => {
  let { loggedIn, user } = state.rootReducer.authentication;
  user = typeof (user) === 'undefined' ? {} : user;
  return {
    initialValues: user.user,
    loggedIn,
    user
  }
}



export default connect(mapStateToProps)(Detail);