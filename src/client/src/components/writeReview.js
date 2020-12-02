import React from 'react';
import { Button, Form, Rating, TextArea, Input } from 'semantic-ui-react'
import "./style-component.css";
import { connect } from 'react-redux';
import axios from 'axios';



class writeReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: this.props.match.params.namee,
            title: "",
            user: "",
            image: "http://bukittinggikota.go.id/backend/img/placeholder-400x300.png",
            date: "",
            score: 0,
            discription: "",
        };
        this.onDrop = this.onDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
    componentDidMount() {
        const { loggedIn, ...props } = this.props;
        let { user } = props.user;
        this.setState({ user: user.firstName + " " + user.lastName })
        var that = this;
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();
        that.setState({
            date:
                date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
        });
    }

    handleResChange = e => {
        this.setState({ restaurant: e.target.value });
    }
    handletitleChange = e => {
        this.setState({ title: e.target.value });
    }
    handleUserChange = e => {
        this.setState({ user: e.target.value });
    }
    handleimageChange = e => {
        this.setState({ image: e.target.value });
    }
    handledateChange = e => {
        this.setState({ date: e.target.value });
    }
    handlescoreChange = e => {
        this.setState({ score: e.target.value });
    }
    handlediscriptionChange = e => {
        this.setState({ discription: e.target.value });
    }
    handleRate = (e, { rating }) => this.setState({ score: rating })

    handleSubmit(event) {
        axios({
            method: 'POST',
            url: '/addComment',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(this.state)

        }).then((res) => { })
            .then((res) => { window.alert("เขียนรีวิวเสร็จเรียบร้อยจ้าาา") })
            .then(() => { this.props.history.push('/all-Review') })
            .catch((err) => { });
    }
    render() {
        return (
            <div >
                <div class="custom-padding" >
                    <nav>
                        <div class="review-name" >เขียนรีวิว</div>
                        <ul class="menu-area">
                        </ul>
                    </nav>
                </div>
                <div align="center" style={{ width: "50%", "padding-left": "2%", marginLeft: "450px" }}>
                    <h1 style={{ "paddingTop": "5%" }}>ให้คะแนน {this.props.match.params.namee}</h1>
                    <Form fluid='fluid' onSubmit={this.handleSubmit}>
                        <Rating defaultRating={0} maxRating={5} icon='star' size='massive' onRate={this.handleRate}>
                        </Rating>
                        <Form.Field>
                            <label align="left" style={{ "font-size": "20px", "paddingTop": "20px" }}>หัวเรื่องรีวิว</label>
                            <Input name="head" onChange={this.handletitleChange} />
                            <label align="left" style={{ "font-size": "20px", "paddingTop": "20px" }}>รายละเอียดรีวิว</label>
                            <TextArea name="detail" onChange={this.handlediscriptionChange} />
                            <img name="iframe" src={this.state.image} width="400" height="300" frameborder="0" style={{ border: "0" }} allowfullscreen></img>
                            <br></br>
                            <input type="text" name="url" placeholder="Enter Image URL" onChange={this.handleimageChange}></input>
                        </Form.Field>
                        <div align="right">
                            <Button type='submit' name="save" style={{ "background": "#b71c1c", "color": "white" }}>บันทึกรีวิว</Button>
                            <Button type='submit' name="cancle">ยกเลิก</Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
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
export default connect(mapStateToProps)(writeReview);