import React from 'react'
import { FormField, Label, Button, Container, Message, Form } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { userActions, alertActions } from '../actions';

let login = (values, dispatch, props) => {
    const { email, password } = values;
    dispatch(userActions.login(email, password))
}

const required = value => value ? undefined : 'โปรดกรอกข้อมูล'
const minLength = min => value =>
    value && value.length < min ? `ต้องมี ${min} ตัวอักษรหรือมากกว่า` : undefined
const minLength8 = minLength(8)
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'อีเมลล์ไม่ถูกต้อง' : undefined;

const RenderField = ({ input, label, meta, required, as: As = Form.Input, ...props }) => {
    let handleChange = (e, { value }) => input.onChange(value)
    let debug = false;
    return (
        <FormField required={required}>
            {debug && meta.touched && <pre>{JSON.stringify(meta)}</pre>}
            <label>{label}</label>
            <As {...input} value={input.value} {...props} onChange={handleChange}
                error={meta.touched && meta.error ? true : false} placeholder={label} />
            {meta.touched && (meta.error && <Label basic color='red'>{meta.error}</Label>)}
        </FormField>
    )
}

class LoginForm extends React.Component {
    componentWillUnmount() {
        const { alert, ...props } = this.props;
        if (alert && alert.type) {
            props.dispatch(alertActions.clear());
        }
    }
    render() {
        const { handleSubmit, submitting, history, alert, ...props } = this.props;
        const debug = false;
        return (
            <Container className="ui raised very padded text container segment">
                {alert && alert.message &&
                    <Message className={`ui ${alert.type}`}>{alert.message}</Message>}
                <Form fluid='fluid' onSubmit={handleSubmit(login)}>
                    <Field component={RenderField} icon='user' iconPosition='left' name='email' label='อีเมลล์' validate={[required, email]} />
                    <Field component={RenderField} icon='lock' iconPosition='left' name='password' type='password' label='พาสเวิร์ด' validate={[required, minLength8]} />
                    <Button primary type='submit' disabled={submitting}>เข้าสู่ระบบ</Button>
                    <Link to="/register"><Button primary type='submit'>สมัครสมาชิก</Button></Link>
                    <p />
                </Form>
                {debug && <div>
                    <pre>Props {JSON.stringify(props, null, 2)}</pre>
                </div>}
            </Container>
        )
    }
}

function mapStateToProps(state) {
    const { loggedIn, user } = state.rootReducer.authentication;
    const { alert } = state.rootReducer;
    return {
        loggedIn,
        alert,
        user
    };
}

let reduxLoginForm = reduxForm({
    form: 'loginForm',
    destroyOnUnmount: false,
    onChange: (values, dispatch, props) => {
        if (props.alert.message) {
            dispatch(alertActions.clear());
        }
    }
})(LoginForm);

reduxLoginForm = connect(mapStateToProps, { userActions, alertActions })(reduxLoginForm);

export default reduxLoginForm
