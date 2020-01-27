import React, {Component} from 'react';
import './Printable.css';

class Printable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currentIndex: 0,
      mouseMoving: true,
    };
  }

  componentWillMount() {
    return 1;
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Printable;
