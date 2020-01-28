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
    fetch(`/unit/${cardName}`)
      .then(response => response.json())
      .then(data => this.setState({data}));
  }

  renderCard() {
    return (
      <div className="PrintableSheet">
        <Card data={this.state.data}></Card>;
      </div>
    );
  }

  getTemplates(unit) {
    let templates = [];
    unit.Abilities.forEach(ability => {
      if (ability.Template) {
        //if we need to split rules text out
        if (ability.Template.includes('(')) {
          ability.Template = ability.Template.split('(')[0];
        }

        console.log(ability.Template);
        templates.push(
          ability.Template.trim()
            .replace(' ', '_')
            .toLowerCase(),
        );
      }
    });
    //return only distinct templates
    return [...new Set(templates)]
  }

  renderTemplates() {
    const templates = this.getTemplates(this.state.data);
    console.log('templates', templates);
    return templates.map(template => {
      let img_src = `/templates/${template}.svg`;
      return (
        <div className="PrintableSheet">
          <img  src={img_src} />
        </div>
      );
    });
  }

  render() {
    if (!this.state.data) return null;
    return (
      <div>
        {this.renderCard()} {this.renderTemplates()}
      </div>
    );
  }
}

export default Printable;
