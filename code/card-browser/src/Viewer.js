import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Card from './Card.js';
import {AppBar, Select, MenuItem, Toolbar} from '@material-ui/core';
import './css/Viewer.css';

//import chevron_up from './icons/up-chevron.svg';

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: null,
      originalUnits: null,
      searchType: 'Dynasty',
      searchValue: '',
    };
  }

  componentDidMount() {
    fetch('/units')
      .then(response => response.json())
      .then(units => this.setState({units, originalUnits: units}));
  }

  filter() {
    //link to parameters to change so entire screen rerenders
    console.log('filter', this.state.searchType, this.state.searchValue);
    if (this.state.searchType.length > 1 && this.state.searchValue.length > 1) {
      let newUnits = {};
      Object.keys(this.state.originalUnits).forEach(unitName => {
        if (
          this.state.originalUnits[unitName].Identity[this.state.searchType] ===
          this.state.searchValue
        ) {
          newUnits[unitName] = this.state.originalUnits[unitName];
        }
      });
      console.log(newUnits)
      this.setState({units: newUnits});
    } else {
      this.setState({units: this.state.originalUnits});
    }
  }

  SearchTypeFilter(searchType) {
    let menuItems = Object.keys(this.state.originalUnits).map(
      item => this.state.originalUnits[item].Identity[searchType],
    );
    menuItems = [...new Set(menuItems)];
    return (
      <Select
        id="SearchFilter"
        value={this.state.searchValue}
        onChange={event => {
          this.setState({searchValue: event.target.value}, () => this.filter());
        }}>
        {menuItems.map(item => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    );
  }

  SearchTypeSelect() {
    return (
      <Select
        id="SearchType"
        value={this.state.searchType}
        onChange={event => {
          this.setState({searchType: event.target.value, searchValue: ''});
        }}>
        <MenuItem value={'Dynasty'}>Dynasty</MenuItem>
        <MenuItem value={'Type'}>Type</MenuItem>
        <MenuItem value={'Class'}>Class</MenuItem>
        <MenuItem value={'Species'}>Species</MenuItem>
        <MenuItem value={'Size'}>Size</MenuItem>
      </Select>
    );
  }

  render() {
    if (!this.state.units) return null;
    return (
      <div className="CardViewer">
        <AppBar position="sticky" className="SearchBar">
          <Toolbar className="SearchBar">
            <div className="SearchBarText">
              Choose an characteristic to Filter By
            </div>
            {this.SearchTypeSelect()}
            <div className="SearchBarText">Choose a fact to Filter By</div>
            {this.SearchTypeFilter(this.state.searchType)}
          </Toolbar>
        </AppBar>
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
