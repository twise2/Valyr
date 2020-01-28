import React, {Component} from 'react';
import './css/Card.css';

//Icons
import attack_icon from './icons/attack_icon.svg';
import defense_icon from './icons/defense_icon.svg';
import energy_icon from './icons/energy_icon.svg';
import move_icon from './icons/move_icon.svg';
import range_icon from './icons/range_icon.svg';
import appraisal_icon from './icons/appraisal_icon.svg';

class Card extends Component {
  constructor(props) {
    super(props);
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
          <div
            className="CardName">
            {cardData.Identity.Name}
          </div>
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
              <div className="StatNumber">{cardData.Combat.Attack}</div>
              <img src={attack_icon} className="StatIcon" />
            </div>
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
      return this.Card(this.props.data);
  }
}

export default Card;
