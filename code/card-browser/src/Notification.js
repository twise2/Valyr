import React, {Component} from 'react';
import './css/Notification.css';


class Notification extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.text) return null;
    return (
      <div className="notifyBox">
        <div>
          {this.props.text}
        </div>
      </div>
    )
  }
}

export default Notification;
