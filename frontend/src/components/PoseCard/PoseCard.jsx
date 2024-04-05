// PoseCard.js
import React from 'react';
import './PoseCard.css';

const PoseCard = ({ pose }) => {
  return (
    <div className="pose-card">
      <img src={pose.image} alt={pose.name} className="pose-image" />
      <h3 className="pose-name">{pose.name}</h3>
      <p className="pose-description">{pose.description}</p>
      <div className="pose-details">
        <span className="pose-difficulty">Difficulty: {pose.difficulty}</span>
        <span className="pose-category">Category: {pose.category}</span>
      </div>
    </div>
  );
}

export default PoseCard;