import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './style.css';
import { connect } from 'react-redux';



const NavMenu = ({ loggedIn, ...props }) => {
  let { user } = props.user;
  return (
    <div>
      <div className="menu">
        <h1 style={{
          backgroundImage: 'url(https://uppic.cc/d/KET7)'
        }} className="menu__logo">
        </h1>
        <div className="menu__right">
          <div className="menu__right">
            <NavLink exact className="menu__link" activeClassName="menu__link--active" to="/">หน้าแรก</NavLink>
            <NavLink exact className="menu__link" activeClassName="menu__link--active" to="/all-Review">รีวิวร้านอาหาร</NavLink>
            <NavLink exact className="menu__link" activeClassName="menu__link--active" to="/cetegory">หมวดหมู่ร้านอาหาร</NavLink>
            <NavLink exact className="menu__link" activeClassName="menu__link--active" to="/contact">ติดต่อเรา</NavLink>
          </div>
          <Link exact to={`/Search`}><img className="search__img" src="https://uppic.cc/d/KTvM"></img></Link>
          {loggedIn ? [
            (user.typeUser === "Admin" ?
              <div className="menu__right">
                <Link exact className="menu__link" to={`Admin/${user.firstName}`}>{user.firstName} {user.lastName}</Link>
                <Link exact className="menu__link" to="/logout">ออกจากระบบ</Link>
              </div>
              :
              <div className="menu__right">
                <div className="menu__link" >{user.firstName} {user.lastName}</div>
                <Link exact className="menu__link" to="/logout">ออกจากระบบ</Link>
              </div>
            )]
            :
            <Link exact className="menu__link" to="/login">เข้าสู่ระบบ</Link>
          }
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state, props) => {
  let { loggedIn, user } = state.rootReducer.authentication;
  user = typeof (user) === 'undefined' ? {} : user;
  return {
    initialValues: user.user,
    loggedIn,
    user
  }
}
export default connect(mapStateToProps)(NavMenu);
