import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './CardViewer.css';

//Icons
import attack_icon from './icons/attack_icon.svg';
import defense_icon from './icons/defense_icon.svg';
import energy_icon from './icons/energy_icon.svg';
import move_icon from './icons/move_icon.svg';
import range_icon from './icons/range_icon.svg';
import appraisal_icon from './icons/appraisal_icon.svg';
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

  AttackModifier(rangeModifier, cardData) {
    let attackStat = cardData.Combat.Attack;
    let [strengthStat, skillStat] = attackStat.split('-');
    let [strengthModifier, skillModifier] = rangeModifier.split('/');

    strengthStat = parseInt(strengthStat) + parseInt(strengthModifier) || 'X';
    skillStat = parseInt(skillStat) + parseInt(skillModifier) || 'X';
    return (
      <div className="RangeItem">
        <div className="AttackModifier">
          {strengthStat}-{skillStat}
        </div>
      </div>
    );
  }

  RangeModifier(ranges, cardData) {
    return ranges.reverse().map((range, index) => {
      //print the range modifier
      if (index % 2 !== 0) {
        return this.AttackModifier(range, cardData);
      }
      //print the range number
      else {
        return <div className="RangeNumber">{range}</div>;
      }
    });
  }

  RangeStats(cardData) {
    let ranges = cardData.Combat.Range.split(/\(|\)/);
    return (
      <div
        className="Stat"
        style={{
          alignItems: 'flex-end',
        }}>
        <div className="RangeStats">{this.RangeModifier(ranges, cardData)}</div>
        <div className="RangeIcons">
          <img src={range_icon} className="StatIcon" />
          <img src={attack_icon} className="StatIcon" />
        </div>
      </div>
    );
  }

  Card(cardData) {
    if (!cardData) {
      return 'loading';
    }

    return (
      <div className="Card">
        <div className="CardHeader">
          <text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            className="CardName">
            {cardData.Identity.Name}
          </text>
          <div className="HealthContainer">{cardData.Combat.Health}</div>
        </div>
        <div className="ContentBody">
          <div className="Content">
            <div className="CharacterIdentity">
              {cardData.Identity.Size}-{cardData.Identity.Type}
              {'\n'}
              {cardData.Identity.Dynasty} - {cardData.Identity.Species} -{' '}
              {cardData.Identity.Class}
            </div>
            <div className="Abilities">
              {cardData.Abilities.map(ability => {
                return (
                  <div>
                    <div className="AbilityHeader">
                      {ability.Name} - {ability.Type}
                    </div>
                    <div className="AbilityText">{ability.Ability}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Stats">
            {this.RangeStats(cardData)}
            <div className="Stat">
              <div className="StatNumber">{cardData.Combat.Defense}</div>
              <img src={defense_icon} className="StatIcon" />
            </div>
            <div className="Stat">
              <div className="StatNumber">{cardData.Combat.Energy}</div>
              <img src={energy_icon} className="StatIcon" />
            </div>
            <div className="Stat">
              <div className="StatNumber">{cardData.Combat.Movement}</div>
              <img src={move_icon} className="StatIcon" />
            </div>
            <div className="Stat">
              <div className="StatNumber">{cardData.Combat.Appraisal}</div>
              <img src={appraisal_icon} className="StatIcon" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.currentUnit) return null;
    return (
      <div className="CardViewer">
        <div className="HorizontalFlex">
          <img
            src={chevron_up}
            resizeMode="contain"
            className="StatIcon"
            style={{transform: 'rotate(270deg)', flex: 1}}
            onClick={() => this.lastCard()}
          />
          <Link style={{textDecoration: 'none'}} to={`/card?${this.state.units[this.state.currentIndex]}`}>
            {this.Card(this.state.currentUnit)}
          </Link>
          <img
            src={chevron_up}
            resizeMode="contain"
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
