import React, { useState } from 'react';
import './PosePage.css';
import PoseCard from '../PoseCard/PoseCard';
import posesData from '../PoseDetail/poses.json'; // Import pose data from poses.json

function PosePage() {
  const [difficulty, setDifficulty] = useState('');
  const [focusArea, setFocusArea] = useState('');

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleFocusAreaChange = (e) => {
    setFocusArea(e.target.value);
  };

  const filteredPoses = posesData.filter((pose) => {
    if (difficulty && focusArea) {
      return pose.difficulty.toLowerCase() === difficulty && pose.category.toLowerCase() === focusArea;
    } else if (difficulty) {
      return pose.difficulty.toLowerCase() === difficulty;
    } else if (focusArea) {
      return pose.category.toLowerCase() === focusArea;
    }
    return true;
  });

  return (
    <div>
      <section className='backg'>
        <div className='mContainer'>
          <div className='header-container'>
            <h2>Discover the Art of Yoga Poses</h2>
            <div className='dropdowns'>
              <select className='difficulty-dropdown' onChange={handleDifficultyChange}>
                <option value='beginner'>Beginner</option>
                <option value='intermediate'>Intermediate</option>
                <option value='advanced'>Advanced</option>
              </select>
              <select className='focus-dropdown' onChange={handleFocusAreaChange}>
                <option value='standing'>Standing</option>
                <option value='seated'>Seated</option>
                <option value='balancing'>Balancing</option>
                <option value='restorative'>Restorative</option>
              </select>
            </div>
          </div>
          <div className='pose-cards-container'>
            {filteredPoses.map((pose) => (
              <PoseCard key={pose.id} pose={pose} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PosePage;

