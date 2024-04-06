import React from 'react';
import './PoseCard.css';
import { Link } from 'react-router-dom';


const PoseCard = ({ pose }) => {
  const importImage = (imageName) => {
    try {
        return require(`../../images/${imageName}`);
    } catch (error) {
        console.error('Error importing image:', error);
        return null; // Return a placeholder or default image
    }
};
  return (
    <div className="pose-card">
      <img src={importImage(pose.image)} alt={pose.name} className="pose-image" />
      <h3 className="pose-name">{pose.name}</h3>
      <p className="pose-description">{pose.description}</p>
      <div className="pose-details">
        <span className="pose-difficulty">Difficulty: {pose.difficulty}</span>
        <span className="pose-category">Category: {pose.category}</span>
      </div>
      <Link to={`/posedetail/${pose.id}`} className="read-more-button">Read More</Link>
    </div>
  );
}

export default PoseCard;
