import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Card from './Card.js';
import './css/CardViewer.css';

import chevron_up from './icons/up-chevron.svg';

class CardViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: null,
    };
  }

  componentWillMount() {
    fetch('/units')
      .then(response => response.json())
      .then(units => this.setState({units}));
  }

  render() {
    if (!this.state.units) return null;
    return (
      <div className="CardViewer">
        {this.state.units.map((cardName, index) => {
          return (
            <div className="HorizontalFlex">
              <Link
                style={{textDecoration: 'none'}}
                to={`/card/${this.state.units[index]}`}>
                <Card data={cardName}></Card>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default CardViewer;
