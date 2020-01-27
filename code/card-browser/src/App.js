import React, {Component} from 'react';
import './App.css';

//Icons
import attack_icon from './icons/attack_icon.svg';
import defense_icon from './icons/defense_icon.svg';
import energy_icon from './icons/energy_icon.svg';
import move_icon from './icons/move_icon.svg';
import range_icon from './icons/range_icon.svg';
import appraisal_icon from './icons/appraisal_icon.svg';
//import chevron_up from './icons/up-chevron.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currentIndex: 0,
      mouseMoving: true,
    };
  }

  componentWillMount() {
    fetch('/units')
      .then(response => response.json())
      .then(data => this.setState({data}));
  }

  nextCard() {
    let newIndex = this.state.currentIndex + 1;
    if (newIndex >= this.state.data.length) {
      newIndex = 0;
    }
    this.setState({currentIndex: newIndex});
  }

  lastCard() {
    let newIndex = this.state.currentIndex - 1;
    if (newIndex <= 0) {
      newIndex = this.state.data.length - 1;
    }
    this.setState({currentIndex: newIndex});
  }

  AttackModifier(rangeModifier, cardIndex) {
    let attackStat = this.state.data[cardIndex].Combat.Attack
    let [strengthStat,skillStat] = attackStat.split('-')
    let [strengthModifier,skillModifier] = rangeModifier .split('/')

    strengthStat = parseInt(strengthStat)+parseInt(strengthModifier) || 'X'
    skillStat = parseInt(skillStat)+parseInt(skillModifier) || 'X'
    return (
      <div className="RangeItem">
        <div className="AttackModifier">{strengthStat}-{skillStat}</div>
      </div>
    );
  }

  RangeModifier(ranges, cardIndex) {
    return ranges.reverse().map((range, index) => {
      //print the range modifier
      if (index % 2 !== 0) {
        return this.AttackModifier(range, cardIndex);
      }
      //print the range number
      else {
        return <div className="RangeNumber">{range}</div>;
      }
    });
  }

  RangeStats(index) {
    let ranges = this.state.data[index].Combat.Range.split(/\(|\)/);
    return (
      <div
        className="Stat"
        style={{
          alignItems: 'flex-end',
        }}>
        <div className="RangeStats">{this.RangeModifier(ranges, index)}</div>
        <div className="RangeIcons">
          <img src={range_icon} className="StatIcon" />
          <img src={attack_icon} className="StatIcon" />
        </div>
      </div>
    );
  }

  Card(index) {
    return (
      <div className="HorizontalFlex">
        {/*
              {this.state.mouseMoving ? (
                <img
                  src={chevron_up}
                  resizeMode="contain"
                  className="StatIcon"
                  style={{transform: 'rotate(270deg)', flex: 1}}
                  onClick={() => this.lastCard()}
                />
              ) : null}
          */}
        <div className="Card">
          <header className="CardHeader">
            <text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              className="CardName">
              {this.state.data[index].Identity.Name}
            </text>
            <div className="HealthContainer">
              {this.state.data[index].Combat.Health}
            </div>
          </header>
          <header className="ContentBody">
            <header className="Content">
              <div className="CharacterIdentity">
                {this.state.data[index].Identity.Size}-
                {this.state.data[index].Identity.Type}
                {'\n'}
                {this.state.data[index].Identity.Dynasty} -{' '}
                {this.state.data[index].Identity.Species} -{' '}
                {this.state.data[index].Identity.Class}
              </div>
              <div className="Abilities">
                {this.state.data[index].Abilities.map(ability => {
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
            </header>
            <header className="Stats">
              {this.RangeStats(index)}
              <div className="Stat">
                <div className="StatNumber">
                  {this.state.data[index].Combat.Defense}
                </div>
                <img src={defense_icon} className="StatIcon" />
              </div>
              <div className="Stat">
                <div className="StatNumber">
                  {this.state.data[index].Combat.Energy}
                </div>
                <img src={energy_icon} className="StatIcon" />
              </div>
              <div className="Stat">
                <div className="StatNumber">
                  {this.state.data[index].Combat.Movement}
                </div>
                <img src={move_icon} className="StatIcon" />
              </div>
              <div className="Stat">
                <div className="StatNumber">
                  {this.state.data[index].Combat.Appraisal}
                </div>
                <img src={appraisal_icon} className="StatIcon" />
              </div>
            </header>
          </header>
        </div>
        {/*
                {this.state.mouseMoving ? (
                <img
                  src={chevron_up}
                  resizeMode="contain"
                  className="StatIcon"
                  style={{transform: 'rotate(90deg)', flex: 1}}
                  onClick={() => this.nextCard()}
                />
              ) : null}
              */}
      </div>
    );
  }

  render() {
    if (!this.state.data) return null;
    return (
      <div className="App">
        {this.state.data.map((card, index) => {
          //if (this.state.data[index].Identity.Type == 'Conscript') {
          return this.Card(index);
          //}
        })}
      </div>
    );
  }
}

export default App;
