import React from 'react';


class Fetcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }

  componentDidMount() {
    fetch('/restaurantData')
      .then(res => res.json())
      .then(data => this.setState({ list: data })
      );
  }

  render() {
    return this.state.list;
  }
}

export default Fetcher;