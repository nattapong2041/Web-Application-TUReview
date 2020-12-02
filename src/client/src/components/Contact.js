import React from 'react';
import "./style-component.css";

const Contact = () => {
    return (
        <div>
            <div class="custom-padding">
                <nav>
                    <div class="review-name">Contact</div>
                    <ul class="menu-area">
                    </ul>
                </nav>
            </div>
            <div align="center" >
                <div class="container"
                    style={
                        { marginTop: '40px', marginBottom: "0px" }
                    } >
                    <div class="row" >
                        <div class="col-sm-8" >
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11431.001596195081!2d100.59984102874714!3d14.069825285157016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e27fecb1e8d73f%3A0xe114a07c97a9a674!2sThammasat+University+Rangsit+Center!5e0!3m2!1sen!2sth!4v1558968881209!5m2!1sen!2sth"
                                width="800"
                                height="400"
                                frameborder="0"
                                style={
                                    { border: "0" }
                                }
                                allowfullscreen > </iframe>
                        </div>

                        <div class="card border-primary mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", maxWidth: "50rem" }} >
                            <div class="card-header text-dark" > <b> Contact Information </b></div>
                            <div class="card-body text-dark" >
                                <p class="card-text" > นายฐิติกร กมลพรรณพร 5909610031 </p>
                                <p class="card-text" > นายพีรวีส บดีพงศ์ 5909610247</p>
                                <p class="card-text" > นายชนภัทร รักพงศ์นาถ 5909610734</p>
                                <p class="card-text" > นายกานต์กวิน ประไฟศิลป์ 5909680026</p>
                                <p class="card-text" > นายณัฐพงษ์ สวัสดิ์รักษา 5909680125</p>
                            </div>
                        </div>


                    </div>
                </div>

                <div>
                    <p style={{ color: "Gray" }}>Copyright ? 2019 All rights reserved | All review was created by TU Review.</p>
                </div>

            </div>
        </div>




    );
};

export default Contact;