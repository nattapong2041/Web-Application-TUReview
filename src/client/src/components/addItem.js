import React from 'react';
import {NavLink} from 'react-router-dom';
import { Button, Form, Dropdown, TextArea, Input, Grid, Checkbox } from 'semantic-ui-react'
import "./style-component.css";
import axios from 'axios';

const Options = [
    { key: 'sal', value: '1', text: 'แซลม่อน' },
    { key: 'jpn', value: '2', text: 'อาหารญี่ปุ่น' },
    { key: 'buf', value: '3', text: 'บุฟเฟต์' },
    { key: 'sha', value: '4', text: 'ชาบู' },
    { key: 'bbq', value: '5', text: 'ปิ้งย่าง' },
    { key: 'ord', value: '6', text: 'ตามสั่ง' },
    { key: 'res', value: '7', text: 'ภัตตาคาร' },
    { key: 'des', value: '8', text: 'ของหวาน' },
    { key: 'oth', value: '9', text: 'อื่นๆ' },
]

class additem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            image: "http://bukittinggikota.go.id/backend/img/placeholder-400x300.png",
            category: "",
            carPark: false,
            Wi_Fi: false,
            CreditCard: false,
            timeOpen: 0,
            timeClose: 0,
            day: "",
            price: "",
            location: "",
            other: "",
            recommend: false,
            score: "0",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handletitleChange = e => {
        this.setState({ title: e.target.value });
    }
    handlediscriptionChange = e => {
        this.setState({ description: e.target.value });
    }
    handleimageChange = e => {
        this.setState({ image: e.target.value });
    }
    handleCategoryChange = (e, { value }) => {
        this.setState({ category: value });
    }
    handlecarParkChange = (e, { checked }) => {
        this.setState({ carPark: checked });
    }
    handlewifiChange = (e, { checked }) => {
        this.setState({ Wi_Fi: checked });
    }
    handlecreditCardChange = (e, { checked }) => {
        this.setState({ CreditCard: checked });
    }
    handletimeOpenChange = e => {
        this.setState({ timeOpen: e.target.value });
    }
    handletimeCloseChange = e => {
        this.setState({ timeClose: e.target.value });
    }
    handledayChange = e => {
        this.setState({ day: e.target.value });
    }
    handlepriceChange = e => {
        this.setState({ price: e.target.value });
    }
    handlelocationChange = e => {
        this.setState({ location: e.target.value });
    }
    handleotherChange = e => {
        this.setState({ other: e.target.value });
    }
    handlerecommendChange = (e, { checked }) => {
        this.setState({ recommend: checked });
    }
    handlerescoreChange = e => {
        this.setState({ score: e.target.value });
    }
    handleSubmit(event) {
        axios({
            method: 'POST',
            url: '/addRes',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(this.state)

        }).then((res) => { })
            .then((res) => { window.alert("เพิ่มร้านค้าเสร็จสิ้น") })
            .then(() => { this.props.history.push('/updateitem') })
            .catch((err) => { });
    }
    render() {
        return (
            <div align="center">
                <div class="custom-padding">
                    <div style={{ width: "50%", "padding-left": "2%" }}>
                        <Form fluid='fluid' onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label align="left" style={{ "font-size": "20px", "paddingTop": "20px" }}>ชื่อร้านอาหาร</label>
                                <Input name="name" placeholder="ชื่อร้านอาหาร" onChange={this.handletitleChange} />
                                <div style={{ "paddingTop": "20px" }}>
                                    <Grid columns={4} divided>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <div align="left">
                                                    <label style={{ "font-size": "20px", "paddingTop": "20px" }}>รายละเอียดร้าน</label>
                                                    <br />
                                                    <Checkbox label='ที่จอดรถ' name="parking" checked={this.state.carPark} style={{ "font-size": "20px", "paddingTop": "20px" }} onClick={this.handlecarParkChange} />
                                                    <br />
                                                    <Checkbox label='Wi-Fi' name="wifi" checked={this.state.Wi_Fi} style={{ "font-size": "20px", "paddingTop": "20px" }} onClick={this.handlewifiChange} />
                                                    <br />
                                                    <Checkbox label='บัตรเครดิต' name="credit" checked={this.state.CreditCard} style={{ "font-size": "20px", "paddingTop": "20px" }} onClick={this.handlecreditCardChange} />
                                                    <br />
                                                    <Checkbox label='แนะนำ' name="parking" checked={this.state.recommend} style={{ "font-size": "20px", "paddingTop": "20px" }} onClick={this.handlerecommendChange} />
                                                </div>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <div align="left">
                                                    <label style={{ "font-size": "20px", "paddingTop": "20px" }}>เวลาเปิด-ปิด</label>
                                                    <br />
                                                    <Input name="time1" placeholder="00.00" style={{ width: "35%", "paddingTop": "20px" }} onChange={this.handletimeOpenChange} /> - <Input name="time2" placeholder="00.00" style={{ width: "35%", "paddingTop": "20px" }} onChange={this.handletimeCloseChange} />
                                                    <br />
                                                    <br />
                                                    <label style={{ "font-size": "20px", "paddingTop": "20px" }}>เปิดวัน</label>
                                                    <br />
                                                    <Input name="day" placeholder="ทุกวัน" style={{ "paddingTop": "20px" }} onChange={this.handledayChange} />
                                                </div>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <div align="left">
                                                    <label style={{ "font-size": "20px", "paddingTop": "20px" }}>ช่วงราคา</label>
                                                    <Input name="price" placeholder="0-10000" style={{ "paddingTop": "20px" }} onChange={this.handlepriceChange} />
                                                    <br />
                                                    <br />
                                                    <label style={{ "font-size": "20px", "paddingTop": "20px" }}>หมวดหมู่</label>
                                                    <br />
                                                    <br />
                                                    <Dropdown
                                                        placeholder='เลือกรายการที่ชอบ'
                                                        fluid
                                                        search
                                                        selection
                                                        options={Options}
                                                        onChange={this.handleCategoryChange}
                                                        value={this.state.category}
                                                    />
                                                </div>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <div align="left">
                                                    <label style={{ "font-size": "20px", "paddingTop": "20px" }}>พิกัดร้าน</label>
                                                    <TextArea name="location" placeholder="พิกัดร้าน" style={{ "height": "200px", "paddingTop": "20px" }} onChange={this.handlelocationChange} />
                                                </div>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </div>

                                <label align="left" style={{ "font-size": "20px", "paddingTop": "20px" }}>รายละเอียด</label>
                                <TextArea name="detail" placeholder="รายละเอียดเพิ่มเติม" onChange={this.handlediscriptionChange} />
                                <label align="left" style={{ "font-size": "20px", "paddingTop": "20px" }}>คำอธิบายเพิ่มเติม</label>
                                <TextArea name="detail" placeholder="คำอธิบายเพิ่มเติม" onChange={this.handleotherChange} />
                                <img name="iframe" src={this.state.image} width="400" height="300" frameborder="0" style={{ border: "0" }} allowfullscreen></img>
                                <br></br>
                                <input type="text" name="url" placeholder="Enter Image URL" onChange={this.handleimageChange}></input>
                            </Form.Field>
                            <div align="right">
                                <Button type='submit' name="save" style={{ "background": "#b71c1c", "color": "white" }}>บันทึกร้านอาหาร</Button>
                                <NavLink to="/updateitem"><Button type='submit' name="cancle">ยกเลิก</Button></NavLink>
                            </div>
                        </Form>
                        
                           
                        
                    </div>
                </div>
            </div>
        );
    }

};
export default additem;