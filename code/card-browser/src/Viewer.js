import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Card from './Card.js';
import Notification from './Notification.js';
import {AppBar, Select, MenuItem, Toolbar} from '@material-ui/core';
import {parse} from 'query-string';
import './css/Viewer.css';

class Viewer extends Component {
  constructor(props) {
    super(props);
    const qs = parse(this.props.location.search);
    this.state = {
      units: null,
      originalUnits: null,
      searchType: qs.searchType || '',
      searchValue: qs.searchValue || '',
      notification: null,
    };
  }

  componentDidMount() {
    fetch('/units')
      .then(response => response.json())
      .then(units =>
        this.setState({originalUnits: units}, () => this.filter()),
      );
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.history.location.query !== prevProps.history.location.query
    ) {
      const qs = parse(this.props.location.search);
      this.setState(
        {
          searchType: qs.searchType || '',
          searchValue: qs.searchValue || '',
        },
        () => this.filter(),
      );
    }
  }

  copyToClipboard(text) {
    var dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    this.setState({notification: 'Session Saved to Clipboard'});

    setTimeout(() => {
      this.setState({notification: null});
    }, 3000);
  }

  shareSearch() {
    const sharableLink = `${window.location.origin.toString()}?searchType=${
      this.state.searchType
    }&searchValue=${this.state.searchValue}`;
    this.copyToClipboard(sharableLink);
    this.popupConfirmation('copied to clipboard');
  }

  popupConfirmation(text) {}

  resetSearch() {
    this.props.location.search = '';
    this.setState(
      {
        units: this.state.originalUnits,
        searchType: '',
        searchValue: '',
        savedDeck: [],
      },
      () => this.updateQS(),
    );
  }

  updateQS() {
    const pathname =
      this.state.searchType || this.state.searchValue
        ? `?searchType=${this.state.searchType}&searchValue=${this.state.searchValue}`
        : ` `;
    this.props.history.push({
      pathname,
    });
  }

  filter() {
    this.updateQS();
    //link to parameters to change so entire screen rerenders
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
      return this.setState({units: newUnits});
    } else {
      return this.setState({units: this.state.originalUnits});
    }
  }

  SearchTypeFilter(searchType) {
    let menuItems = Object.keys(this.state.originalUnits).map(
      item => this.state.originalUnits[item].Identity[searchType],
    );
    menuItems = [...new Set(menuItems)];
    return (
      <Select
        style={{margin: '10px'}}
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
        style={{margin: '10px'}}
        id="SearchType"
        value={this.state.searchType}
        onChange={event => {
          this.setState({searchType: event.target.value, searchValue: ''}, () =>
            this.filter(),
          );
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
        {this.state.notification ? (
          <Notification text={this.state.notification}></Notification>
        ) : null}

        <AppBar position="sticky" className="SearchBar">
          <Toolbar className="SearchBar">
            <div className="Search">
              <div className="Button" onClick={() => this.resetSearch()}>
                Reset Filters
              </div>
              <div className="SearchBarText">Choose the filter type</div>
              {this.SearchTypeSelect()}
              {this.state.searchType.length ? (
                <div className="SearchBarText">Choose a value to Filter By</div>
              ) : null}
              {this.state.searchType.length
                ? this.SearchTypeFilter(this.state.searchType)
                : null}
            </div>
            <div className="Button" onClick={() => this.shareSearch()}>
              Save Session
            </div>
          </Toolbar>
        </AppBar>

        <div className="FilterHeader">
          {`showing ${Object.keys(this.state.units).length} ${
            this.state.searchValue
          } units`}
        </div>
        {Object.keys(this.state.units).map((cardName, index) => {
          return (
            <div
              key={cardName}
              className="HorizontalFlex"
              style={{borderTop: '1px solid black'}}>
              <Link
                className="Hoverable"
                style={{textDecoration: 'none'}}
                target="_blank"
                to={`/card/${cardName}`}>
                <Card data={cardName}></Card>
              </Link>
              <div className="VerticalFlex">
                <div>{/*Button that adds it to the current 'deck'*/}</div>
                <div>
                  {this.state.units[cardName].Identity.Basic_Description}
                  {this.state.units[cardName].Identity.Description}
                </div>
                <Link
                  className="Button"
                  style={{textDecoration: 'none'}}
                  target="_blank"
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
