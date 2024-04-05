import React from 'react'
import './PoseDetail.css'
import MountainPose from '../../images/mountain.jpg'

const PoseDetail = () => {
  return (
    <div >
        <section className='backg'>
        <div className='heading'>
            <h1>Bharadvaja’s Twist</h1>
            <h4>Bharadvajasana</h4>
        </div>
        <div className='instructions'>
            <div className='details'>
            <div className='stepwiseGuide'>
                <h3 className='stepwiseGuideHeading'>Step by Step</h3>
                <ul>
                    <li>From a sitting position, bend your knees to the right and shift your feet to the left – so that your left ankle ends up resting in the arch of your right foot</li>
                    <li>Press your sitting bones to the mat to lengthen the spine as you inhale. Then with the support of your arms twist towards the right on an exhalation – your left hip may raise a little
                    <li>Turn your head and neck last, firmly pressing the fingertips of your right hand into the floor</li>
                    <li>Keep lengthening your spine as you inhale and explore the depth of your twist as you exhale, stay for a few breaths</li>
                    <li>To come out of this pose, release your hands, bring your torso to the front and straighten your legs</li>
                    <li>Repeat on the other side</li>
                    </li>
                </ul>
                </div>
                <hr className='hori'></hr>
                
                <div className='tips'>
                <h3 className='tipsHeading'>Beginner's Tip</h3>
                <p>
                If your sitting bones are not firmly grounded, i.e. you are tilting onto the twisting side, try sitting up on a thickly folded blanket
                </p>
                </div>
                <hr className='hori'></hr>
                <div className='benefits'>
                    <h3 className='benefitsHeading'>Benefits</h3>
                    <ul>
                        <li>Keeps your spine mobile</li>
                        <li>Massages the abdominal organs and improves digestion</li>
                    </ul>
                </div>
                </div>
            
            <div className='poseImg'>
                <img src={MountainPose}></img>
                <div className='info'>
                <p className='difficulty'>Difficulty - Beginner</p>
                <p className='category'>Category - Standing</p>
                </div>
            </div>

        </div>
        </section>
    </div>
  )
}

export default PoseDetail