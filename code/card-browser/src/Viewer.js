import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Card from './Card.js';
import './css/Viewer.css';

//import chevron_up from './icons/up-chevron.svg';

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: null,
    };
  }

  componentDidMount() {
    fetch('/units')
      .then(response => response.json())
      .then(units => this.setState({units}));
  }

  render() {
    if (!this.state.units) return null;
    return (
      <div className="CardViewer">
        {Object.keys(this.state.units).map((cardName, index) => {
          return (
            <div key={index} className="HorizontalFlex">
              <Card data={cardName}></Card>
              <div className="VerticalFlex">
                <div>
                {this.state.units[cardName].Identity.Basic_Description}
                {this.state.units[cardName].Identity.Description}
                </div>
                <Link
                  className="PrintButton"
                  style={{textDecoration: 'none'}}
                  to={`/card/${cardName}`}>
                  {'Click Here To Print Me'}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Viewer;
