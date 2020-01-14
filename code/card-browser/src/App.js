import React, {Component} from 'react';
import './App.css';

//Icons
import attack_icon from './icons/attack_icon.svg';
import defense_icon from './icons/defense_icon.svg';
import energy_icon from './icons/energy_icon.svg';
import move_icon from './icons/move_icon.svg';
import range_icon from './icons/range_icon.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currentIndex: 0,
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

  RangeModifier(ranges) {
    return ranges.map((range, index) => {
      //print the range modifier
      if (index % 2 !== 0) {
        return (
          <div className="RangeItem">
            <div className="RangeModifier">{range}</div>
          </div>
        );
      }
      //print the range number
      else {
        return <div className="RangeNumber">{range}</div>;
      }
    });
  }

  RangeStats() {
    let ranges = this.state.data[this.state.currentIndex].Combat.Range.split(
      /\(|\)/,
    );
    return (
      <div
        className="Stat"
        style={{height: '1this.state.currentIndexcurrentIndex%'}}>
        <div className="RangeStats">{this.RangeModifier(ranges)}</div>
        <img src={range_icon} className="StatIcon" />
      </div>
    );
  }

  render() {
    if (!this.state.data) return null;
    let Identity = this.state.data[this.state.currentIndex].Identity;
    console.log(Identity)
    return (
      <div className="App">
        <div className="Card" onClick={() => this.nextCard()}>
          <header className="CardHeader">
            <text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              className="CardName">
              {this.state.data[this.state.currentIndex].Identity.Name}
            </text>
            <div className="HealthContainer">
              {this.state.data[this.state.currentIndex].Combat.Health}
            </div>
          </header>
          <header className="ContentBody">
            <header className="Content">
              <div className="CharacterIdentity">
              {Identity.Size}-{Identity.Type}{'\n'}
              {Identity.Dynasty} - {Identity.Species} - {Identity.Class}
              </div>
              <div className="Abilities">
                {this.state.data[this.state.currentIndex].Abilities.map(
                  ability => {
                    return (
                      <div>
                        <div className="AbilityHeader">
                          {ability.Name} - {ability.Type}
                        </div>
                        <div className="AbilityText">{ability.Ability}</div>
                      </div>
                    );
                  },
                )}
              </div>
            </header>
            <header className="Stats">
              <div className="Stat">
                <div className="StatNumber">
                  {this.state.data[this.state.currentIndex].Combat.Attack}
                </div>
                <img src={attack_icon} className="StatIcon" />
              </div>
              <div className="Stat">
                <div className="StatNumber">
                  {this.state.data[this.state.currentIndex].Combat.Defense}
                </div>
                <img src={defense_icon} className="StatIcon" />
              </div>
              <div className="Stat">
                <div className="StatNumber">
                  {this.state.data[this.state.currentIndex].Combat.Energy}
                </div>
                <img src={energy_icon} className="StatIcon" />
              </div>
              <div className="Stat">
                <div className="StatNumber">
                  {this.state.data[this.state.currentIndex].Combat.Movement}
                </div>
                <img src={move_icon} className="StatIcon" />
              </div>
              {this.RangeStats()}
            </header>
          </header>
        </div>
      </div>
    );
  }
}

export default App;
