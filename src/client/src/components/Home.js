import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import Slider from 'react-animated-slider';
import ScrollUpButton from "react-scroll-up-button";
import 'react-animated-slider/build/horizontal.css';
import 'normalize.css/normalize.css';
import "./style-component.css";
import Review from "./Review";
import Cetegory from "./Cetegory";
import Contact from "./Contact";
// import Detail from "./detail";


class Home extends Component {
	state = {
		list: []
	};
	componentDidMount() {
		fetch('/restaurantData')
			.then(res => res.json())
			.then(data => this.setState({ list: data })
			);

	}

	render() {
		const filterRecommend = this.state.list.filter(Review => {
			return Review.recommend === true;
		});
		return (
			<div>
				<Slider className="slider-wrapper">
					{filterRecommend.map((item, index) => (
						<div key={index}
							className="slider-content"
							style={{ background: `url('${item.image}') no-repeat center center` }}
						>
							<div className="inner">
								<h1>{item.title}</h1>
								<p>{item.description}</p>
								<NavLink exact to={`detail/${item.title}`}><button className="button-contain">อ่านเพิ่มเติม</button></NavLink>
							</div>
							<section>
								<h1 align="center" style={{
									"border-radius": "25px",
									"background": "#b71c1c",
									"padding": "5px",
									"color": "white",
									"width": "100px",
									"font-size": "35px"
								}}>{item.score} <span style={{ "color": "yellow" }}> ★</span></h1>
							</section>
						</div>
					))}
				</Slider>
				<Review />
				<Cetegory />
				<Contact />
				<ScrollUpButton
					StopPosition={0}
					ShowAtPosition={150}
					EasingType='easeOutCubic'
					AnimationDuration={500}
					ContainerClassName='ScrollUpButton__Container'
					TransitionClassName='ScrollUpButton__Toggled'
					style={{}}
					ToggledStyle={{}}
				/>
			</div>
		);
	}
}

export default Home;