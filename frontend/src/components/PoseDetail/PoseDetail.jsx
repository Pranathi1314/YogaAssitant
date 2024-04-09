import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PoseDetail.css';
import posesData from '../PoseDetail/poses.json'; // Import pose data from poses.json


const PoseDetail = () => {
    const { poseId } = useParams();
    const [pose, setPose] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false); // State to track text-to-speech status

    useEffect(() => {
        const foundPose = posesData.find(item => item.id === parseInt(poseId));
        setPose(foundPose);
    }, [poseId]);

    const importImage = (imageName) => {
        try {
            return require(`../../images/${imageName}`);
        } catch (error) {
            console.error('Error importing image:', error);
            return null; // Return a placeholder or default image
        }
    };

    
    const toggleSpeech = () => {
        if (!window.speechSynthesis) {
            console.error('Speech synthesis not supported.');
            return;
        }
    
        if (!isSpeaking) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = pose.steps.join(' '); // Concatenate steps into a single string
            utterance.onend = () => setIsSpeaking(false); // Update state when speech ends
            window.speechSynthesis.speak(utterance);
        } else {
            window.speechSynthesis.cancel(); // Stop speech synthesis
            setIsSpeaking(false); // Update state to not speaking
        }
    
        setIsSpeaking(!isSpeaking); // Toggle speech state
    };    

    if (!pose) return <div>Loading...</div>;

  return (
    <div >
        <section className='backg'>
        <div className='heading'>
            <div><h1><strong>{pose.name}</strong></h1> </div>
        </div>
        <br></br>
        <div className='heading'>
            <h4>{pose.asana}</h4> 
        </div>
        <div className='instructions'>
            <div className='details'>
            <div className='stepwiseGuide'>
                <h3 className='stepwiseGuideHeading'>
                    Step by Step  &nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={toggleSpeech}>
                        {isSpeaking ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
                        {isSpeaking ? '⏸️ Pause' : '▶️ Play Instructions'}
                    </button> {/* Add button for text-to-speech */}
                </h3>
                <ol>
                    {pose.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                    ))}
                </ol>
                </div>
                {/* <hr className='hori'></hr> */}
                
                <div className='tips'>
                <h3 className='tipsHeading'>Beginner's Tip</h3>
                <p>{pose.tip}</p>
                </div>
                {/* <hr className='hori'></hr> */}
                <div className='benefits'>
                    <h3 className='benefitsHeading'>Benefits</h3>
                    <ul>
                        {pose.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                </div>
                </div>
            
            <div className='poseImg'>
                <img src={importImage(pose.image)} alt={pose.name} />
                <div className='info'>
                <p className='difficulty'>Difficulty - {pose.difficulty}</p>
                <p className='category'>Category - {pose.category}</p>
                </div>
            </div>

        </div>
        </section>
    </div>
  )
}

export default PoseDetail
