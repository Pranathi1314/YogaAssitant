import React , { useState } from 'react'

import './PosePage.css'
import PoseCard from '../PoseCard/PoseCard'
import Mountain from '../../images/mountain.jpg'
import treep from '../../images/treep.jpg'
import downwardDog from '../../images/dog.jpg'
import warriorTwo from '../../images/warrior.jpg'
import childsPose from '../../images/childspose.jpg'
import crowPose from '../../images/crow.jpg'
import corpsePose from '../../images/corpose.jpg'
import butterflyPoseImage from '../../images/butterfly.jpg'

function PosePage() {
  const poses = [
    {
      id: 1,
      name: 'Mountain Pose',
      image: Mountain,
      description: 'Stand tall with feet together...',
      difficulty: 'Beginner',
      category: 'Standing',
    },
    {
      id: 2,
      name: 'Downward Facing Dog',
      image: downwardDog,
      description: 'Start on your hands and knees...',
      difficulty: 'Beginner',
      category: 'Balancing',
    },
    
    {
      id: 3,
      name: 'Tree Pose',
      image: treep,
      description: 'Balance on one foot ...',
      difficulty: 'Intermediate',
      category: 'Balancing',
    },
    {
      id: 4,
      name: 'Warrior II Pose',
      image: warriorTwo,
      description: 'Stand with your feet wide apart...',
      difficulty: 'Intermediate',
      category: 'Standing',
    },
    {
      id: 5,
      name: 'Child’s Pose',
      image: childsPose,
      description: 'Kneel on the floor...',
      difficulty: 'Beginner',
      category: 'Restorative',
    },
    {
      id: 6,
      name: 'Crow Pose',
      image: crowPose,
      description: 'Start in a squatting position...',
      difficulty: 'Advanced',
      category: 'Balancing',
    },
    {
      id: 7,
      name: 'Corpse Pose',
      image: corpsePose,
      description: 'Lie flat on your back...',
      difficulty: 'Beginner',
      category: 'Restorative',
    },
    {
      id: 5,
      name: 'Butterfly Pose',
      image: butterflyPoseImage, // Make sure to import the image for the Butterfly Pose
      description: 'Sit with your legs extended...',
      difficulty: 'Beginner',
      category: 'Seated',
    }
     

    
    // Add more pose data as needed
  ];
  const [difficulty, setDifficulty] = useState(''); // Initialize state for difficulty
  const [focusArea, setFocusArea] = useState(''); // Initialize state for focus area

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleFocusAreaChange = (e) => {
    setFocusArea(e.target.value);
  };

  const filteredPoses = poses.filter((pose) => {
    if (difficulty && focusArea) {
      return pose.difficulty.toLowerCase() === difficulty && pose.category.toLowerCase() === focusArea;
    } else if (difficulty) {
      return pose.difficulty.toLowerCase() === difficulty;
    } else if (focusArea) {
      return pose.category.toLowerCase() === focusArea;
    }
    return true; // If no filters are applied, return all poses
  });
  
  
  return (
    <div>
     <section className='backg'>
     {/* <Navbar/> */}
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
      {/* Add more components or content here */}
      <div className='pose-cards-container'>
      {filteredPoses.map((pose) => (
          <PoseCard key={pose.id} pose={pose} />
        ))}
      </div>
    </div>
     </section>
    </div>
  )
}

export default PosePage
