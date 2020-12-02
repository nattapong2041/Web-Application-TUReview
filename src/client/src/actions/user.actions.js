import React from 'react'
import { userService } from '../services/usersServices';
import { alertActions } from './alert.actions';
import { history } from '../helpers/history';
import { withRouter, Redirect } from 'react-router-dom'

export const userActions = withRouter({
    login,
    logout,
    register,
    getAll,
    delete: _delete
});

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success('เข้าสู่ระบบเรียบร้อย'));
                    return (<Redirect to='/all-Review' />);

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: 'USERS_LOGIN_REQUEST', user } }
    function success(user) { return { type: 'USERS_LOGIN_SUCCESS', user } }
    function failure(error) { return { type: 'USERS_LOGIN_FAILURE', error } }
}

function logout() {
    userService.logout();
    return { type: 'USERS_LOGOUT' };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('สมัครสมาชิกเสร็จเรียบร้อย กรุณาเข้าสู่ระบบ'));
                    return (<Redirect to='/login' />);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: 'REGISTER_REQUEST', user } }
    function success(user) { return { type: 'REGISTER_SUCCESS', user } }
    function failure(error) { return { type: 'REGISTER_FAILURE', error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: 'USERS_GETALL_REQUEST' } }
    function success(users) { return { type: 'USERS_GETALL_SUCCESS', users } }
    function failure(error) { return { type: 'USERS_GETALL_FAILURE', error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: 'USERS_DELETE_REQUEST', id } }
    function success(id) { return { type: 'USERS_DELETE_SUCCESS', id } }
    function failure(id, error) { return { type: 'USERS_DELETE_FAILURE', id, error } }
}