import React from 'react';
import './css/Notification.css';

function Notification({ text }) {
  if (!text) return null;
  return (
    <div className="notifyBox">
      <div>{text}</div>
    </div>
  );
}

export default Notification;
