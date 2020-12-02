import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import "./style-component.css";
import addItem from './addItem';
import updateItem from './updateItem';
import editItem from './editItem';

const inforAdmin = () => {
    return (
        <div>
            <BrowserRouter>
                <div class="custom-padding">
                    <nav>
                        <div class="review-name">จัดการ</div>
                        <ul class="menu-area">
                            <li><NavLink exact to="/additem">เพิ่มร้านอาหาร</NavLink></li>
                            <li><NavLink exact to="/updateitem">อัพเดตร้านอาหาร</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <Switch>
                    <Route exact path="/additem" component={addItem} />
                    <Route path="/updateitem" component={updateItem} />
                    <Route path="/edit/:id" component={editItem} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default inforAdmin;