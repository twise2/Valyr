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
    this.state = {
      currentUnit: null,
      prop: null,
    };
  }

  componentDidMount() {
    fetch(`/unit/${this.props.data}`)
      .then(response => response.json())
      .then(currentUnit => this.setState({currentUnit}));
  }

  //set background colors by unit type (no color should have over .5 opacity unless it is white)
  backgroundGradient(unit) {
    //Celintra colors
    if (unit.Identity.Dynasty === 'Celintra') {
      return {
        background:
          'linear-gradient(to right bottom, rgba(0, 0, 255, 0.2), rgba(218, 165, 132, 0.5))',
      };
    }
    //Akaedour colors
    if (unit.Identity.Dynasty === 'Akaedour') {
      return {
        background:
          'linear-gradient(to left, rgba(150, 40, 27, 0.5), rgba(0, 0, 0, .3))',
      };
    }
    //Olanta colors
    if (unit.Identity.Dynasty === 'Olanta') {
      return {
        background:
          'linear-gradient(to bottom right, rgba(190, 40, 27, .5), rgba(220, 140, 57, .5))',
      };
    }
    //Swazlid colors
    if (unit.Identity.Dynasty === 'Swazlid') {
      return {
        background:
          'linear-gradient(to bottom right, rgba(101, 67, 33, .5), rgba(67, 101, 33, .5))',
      };
    }
    //Neutral Colors
    else {
      return {
        background:
          'linear-gradient(to right top, rgb(210, 210, 210, .5), rgba(70, 70, 70, .5))',
      };
    }
  }
  AttackModifier(index, rangeModifier, cardData) {
    //let attackStat = cardData.Combat.Attack;
    //let [strengthStat, skillStat] = attackStat.split('-');
    let [strengthModifier, skillModifier] = rangeModifier.split('/');

    //strengthStat = parseInt(strengthStat) + parseInt(strengthModifier) || 'X';
    //skillStat = parseInt(skillStat) + parseInt(skillModifier) || 'X';
    return (
      <div key={index} className="RangeItem">
        <div className="AttackModifier">
          {strengthModifier !== '0' ? strengthModifier : '-'}/
          {skillModifier !== '0' ? skillModifier : '-'}
        </div>
      </div>
    );
  }

  RangeModifier(ranges, cardData) {
    return ranges.reverse().map((range, index) => {
      //print the range modifier
      if (index % 2 !== 0) {
        return this.AttackModifier(index, range, cardData);
      }
      //print the range number
      else {
        return (
          <div key={index} className="RangeNumber">
            {range}
          </div>
        );
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
          <img alt="range icon" src={range_icon} className="StatIcon" />
        </div>
      </div>
    );
  }

  Card(cardData) {
    if (!cardData) {
      return 'loading';
    }

    return (
      <div className="Card" style={this.backgroundGradient(cardData)}>
        <div className="CardHeader">
          <div className="CardName">{cardData.Identity.Name}</div>
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

            {cardData.Abilities.length ? (
              <div className="Abilities">
                {cardData.Abilities.map((ability, index) => {
                  return (
                    <div key={index}>
                      <div className="AbilityHeader">
                        {ability.Name} - {ability.Type}
                      </div>
                      <div className="AbilityText">{ability.Ability}</div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className="Stats">
            {this.RangeStats(cardData)}
            <div className="Stat">
              <div className="StatNumber">{cardData.Combat.Attack}</div>
              <img alt="attack icon" src={attack_icon} className="StatIcon" />
            </div>
            <div className="Stat">
              <div className="StatNumber">{cardData.Combat.Defense}</div>
              <img alt="defense icon" src={defense_icon} className="StatIcon" />
            </div>
            <div className="Stat">
              <div className="StatNumber">{cardData.Combat.Energy}</div>
              <img alt="energy icon" src={energy_icon} className="StatIcon" />
            </div>
            <div className="Stat">
              <div className="StatNumber">{cardData.Combat.Movement}</div>
              <img alt="move icon" src={move_icon} className="StatIcon" />
            </div>
            <div className="Stat">
              <div className="StatNumber">{cardData.Combat.Appraisal}</div>
              <img alt="cost icon" src={appraisal_icon} className="StatIcon" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.currentUnit) return null;
    return this.Card(this.state.currentUnit);
  }
}

export default Card;
