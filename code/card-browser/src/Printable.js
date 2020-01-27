import React, {Component} from 'react';
import Card from './Card.js';
import './css/Printable.css';

class Printable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentWillMount() {
    const {cardName} = this.props.match.params;
    console.log('card',cardName)
    fetch(`/unit/${cardName}`)
      .then(response => response.json())
      .then(data => this.setState({data}));
  }

  render() {
    if (!this.state.data) return null;
    return <Card data={this.state.data}></Card>
  }
}

export default Printable;
