import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Button, Form, Message, Container, Label, FormField } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { userActions, alertActions } from '../actions';
import { connect } from 'react-redux';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
async function showResults(values) {
    await sleep(500) 
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
}

let register = (values, dispatch, props) => {
    const { email, password, firstName, lastName } = values;
    const typeUser = "User";
    dispatch(userActions.register({ firstName, lastName, email, password, typeUser }))
}


const validate = values => {
    const errors = {}
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'retypePassword', 'acceptTerm']
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'โปรดกรอกข้อมูล'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'อีเมลล์ไม่ถูกต้อง'
    }
    if (values.password && values.password.length < 8) {
        errors.password = 'ต้องมี 8 ตัวอักษรหรือมากกว่า'
    }
    if (values.retypePassword && values.retypePassword.length < 8) {
        errors.retypePassword = 'ต้องมี 8 ตัวอักษรหรือมากกว่า'
    } else if (values.password !== values.retypePassword) {
        errors.retypePassword = 'รหัสไม่แมช'
    }
    return errors
}

const RenderField = ({ input, label, meta, required, as: As = Form.Input, ...props }) => {
    let handleChange = (e, { value }) => input.onChange(value)
    let debug = false;
    return (
        <FormField required={required}>
            {debug && meta.touched && <pre>{JSON.stringify(meta)}</pre>}
            <label>{label}</label>
            <As {...input} value={input.value} {...props} onChange={handleChange}
                error={meta.touched && meta.error} placeholder={label} />
            {meta.touched && (meta.error && <Label basic color='red'>{meta.error}</Label>)}
        </FormField>
    )
}
const RenderCheckbox = ({ input, label, meta, required, as: As = Form.Checkbox, ...props }) => {
    return (
        <FormField required={required}>
            <As {...input} {...props} checked={input.checked}
                defaultChecked={input.checked}
                onChange={(e, data) => input.onChange(data.checked)} label={label}
            />
            {meta.touched && (meta.error && <Label basic color='red'>{meta.error}</Label>)}
        </FormField>
    )
}

class RegisterForm extends React.Component {
    componentWillUnmount() {
        const { alert, ...props } = this.props;
        if (alert && alert.type) {
            props.dispatch(alertActions.clear());
        }
    }
    render() {
        const { handleSubmit, submitting, pristine, invalid, alert } = this.props;
        return (
            <Container text className="ui raised very padded text container segment">
                <Message
                    attached
                    color="blue"
                    header='สมัครสมาชิก'
                    content='สร้างบัญชีของท่าน กรุณากรอกแบบฟอร์มด้านล่างให้ครบถ้วน'
                />

                <p />
                {alert && alert.message &&
                    <Message className={`ui ${alert.type}`}>{alert.message}</Message>}
                <Form fluid onSubmit={handleSubmit(register)}>
                    <Field component={RenderField} as={Form.Input} name='firstName' label='ชื่อจริง' />
                    <Field component={RenderField} as={Form.Input} name='lastName' label='นามสกุล' />
                    <Field component={RenderField} icon='envelope outline' iconPosition='left' name='email' label='อีเมลล์' />
                    <Field component={RenderField} icon='lock' iconPosition='left' name='password' type='password' label='พาสเวิร์ด' />
                    <Field component={RenderField} icon='lock' iconPosition='left' name='retypePassword' type='password' label='ยืนยันพาสเวิร์ด' />
                    <Field component={RenderCheckbox} as={Form.Checkbox} defaultChecked={false} name='acceptTerm'
                        label='ฉันยอมรับข้อกำหนดและเงื่อนไขของการใช้งาน' />
                    <Button type="submit" disabled={submitting || pristine || invalid}>
                        สมัครสมาชิก
                    </Button>
                    <p />
                </Form>
                <Form.Field>
                    <Message >
                        <Message.Header>มีบัญชีอยู่แล้ว</Message.Header>
                        <Link to="/login">เข้าสู่ระบบที่นี่</Link>
                    </Message>
                </Form.Field>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    const { alert } = state.rootReducer;
    return {
        alert,
    };
}

let reduxRegisterForm = reduxForm({
    form: 'registerForm',
    validate,
    onChange: (values, dispatch, props) => {
        if (props.alert.message) {
            dispatch(alertActions.clear());
        }
    }
})(RegisterForm);

reduxRegisterForm = connect(mapStateToProps, { userActions, alertActions })(reduxRegisterForm);

export default reduxRegisterForm