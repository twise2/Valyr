import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './css/Conflict.css';

class Conflict extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  //TODO render each faction here with their information
  //on press of that faction, take them to the viewer showing all cards usable under that faction
  render() {
    return <div className='Conflict'>'some text'</div>;
  }
}
export default Conflict;
