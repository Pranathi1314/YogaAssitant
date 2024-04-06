import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PoseDetail.css';
import posesData from '../PoseDetail/poses.json'; // Import pose data from poses.json


const PoseDetail = () => {
    const { poseId } = useParams();
    const [pose, setPose] = useState(null);

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
                <h3 className='stepwiseGuideHeading'>Step by Step</h3>
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

//     // {   "id" : "1",
//     //     "name" : "Mountain Pose",
//     //     "otherName" : "Tadasana",
//     //     "stepwise": {
//     //         "1": "Stand with your feet hip distance apart.",
//     //         "2": "Feel your feet, lift and spread the toes then lower them back down and connect with the ground.",
//     //         "3": "Lift knee caps, without locking the knees back.",
//     //         "4": "Lift the thigh muscles up and back. Inner thighs slightly turn in",
//     //         "5":"Draw the pelvic floor muscles together and draw your abdomen slightly in and up to engage Mula Bandha (the pelvic floor muscles) and Uddiyana Bandha (the abdominals up to the diaphragm).",
//     //         "6":"Open your chest, top of sternum lifts towards the ceiling. Keep ribs soft.",
//     //         "7":"Broaden your collarbones, firm your shoulder blades onto your back.",
//     //         "8":"Ears over the shoulders, crown of the head lifting up.",
//     //         "9":"Soften the face, especially the eyes and the jaw."
//     //     },

//     //     "tips":{
//     //         "1":"If you find it difficult to get your pelvis in a neutral position, try bending your knees slightly. Drop the tailbone, then once you feel you have it, straighten the knees again without changing the position of the pelvis.",
//     //         "2":"Take a block between the thighs. Squeeze the block and roll it slightly backward to feel the engagement and rotation of the thighs."
//     //     },

//     //     "benefits":{
//     //         "1" : "Prepares the body for all other standing poses.",
//     //         "2" : "Helps to identify imbalances in the body.",
//     //         "3" : "Improves posture.",
//     //         "4" : "Calms the body and mind."
//     //     },

//     //     "image" : "../../images/mountain.jpg"
//     // },