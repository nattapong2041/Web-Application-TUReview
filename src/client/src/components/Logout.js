import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions';
import { Redirect } from 'react-router-dom';

let Logout = (props) => {
    props.logout();
    return (<Redirect to='/' />);
}
const mapDispatchToProps = (dispatch, id) => {
    return {
        logout: () => { dispatch(userActions.logout()) }
    }
}

export default connect(null, mapDispatchToProps)(Logout);