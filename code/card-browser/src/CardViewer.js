import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Card from './Card.js';
import './Card.css';

import chevron_up from './icons/up-chevron.svg';

class CardViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: null,
      currentUnit: null,
      currentIndex: 0,
    };
  }

  componentWillMount() {
    fetch('/units')
      .then(response => response.json())
      .then(units =>
        this.setState({units}, () => {
          const cardName = this.state.units[this.state.currentIndex];
          fetch(`/unit/${cardName}`)
            .then(response => response.json())
            .then(currentUnit => this.setState({currentUnit}));
        }),
      );
  }

  nextCard() {
    let newIndex = this.state.currentIndex + 1;
    if (newIndex >= this.state.units.length) {
      newIndex = 0;
    }
    this.setState({currentIndex: newIndex}, () => {
      const cardName = this.state.units[this.state.currentIndex];
      fetch(`/unit/${cardName}`)
        .then(response => response.json())
        .then(currentUnit => this.setState({currentUnit}));
    });
  }

  lastCard() {
    let newIndex = this.state.currentIndex - 1;
    if (newIndex <= 0) {
      newIndex = this.state.units.length - 1;
    }
    this.setState({currentIndex: newIndex}, () => {
      const cardName = this.state.units[this.state.currentIndex];
      fetch(`/unit/${cardName}`)
        .then(response => response.json())
        .then(currentUnit => this.setState({currentUnit}));
    });
  }

  render() {
    if (!this.state.currentUnit) return null;
    return (
      <div className="CardViewer">
        <div className="HorizontalFlex">
          <img
            src={chevron_up}
            className="StatIcon"
            style={{transform: 'rotate(270deg)', flex: 1}}
            onClick={() => this.lastCard()}
          />
          <Link
            style={{textDecoration: 'none'}}
            to={`/card/${this.state.units[this.state.currentIndex]}`}>
            <Card data={this.state.currentUnit}></Card>
          </Link>
          <img
            src={chevron_up}
            className="StatIcon"
            style={{transform: 'rotate(90deg)', flex: 1}}
            onClick={() => this.nextCard()}
          />
        </div>
      </div>
    );
  }
}

export default CardViewer;
