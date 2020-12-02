import React from 'react';
import { NavLink } from 'react-router-dom';
import "./style-component.css";

const inforUser = () => {
    return (
        <div>
            <NavLink exact to="/logout">ออกจากระบบ</NavLink>
        </div>
    );
};

export default inforUser;