import math
import cv2
from time import time
import mediapipe as mp

mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

def calculateAngle(landmark1, landmark2, landmark3):
    x1, y1, _ = landmark1
    x2, y2, _ = landmark2
    x3, y3, _ = landmark3
    angle = math.degrees(math.atan2(y3 - y2, x3 - x2) - math.atan2(y1 - y2, x1 - x2))
    if angle < 0:
        angle += 360
    return angle

def classifyPose(landmarks, output_image):
    '''
    This function classifies yoga poses depending upon the angles of various body joints.
    Args:
        landmarks: A list of detected landmarks of the person whose pose needs to be classified.
        output_image: A image of the person with the detected pose landmarks drawn.
        display: A boolean value that is if set to true the function displays the resultant image with the pose label
        written on it and returns nothing.
    Returns:
        output_image: The image with the detected pose landmarks drawn and pose label written.
        label: The classified pose label of the person in the output_image.
    '''
    
    # Initialize the label of the pose. It is not known at this stage.
    label = 'Unknown Pose'
 
    # Specify the color (Red) with which the label will be written on the image.
    color = (0, 0, 255)
    
    # Initialize a dictionary to store the calculated angles.
    angles = {}
    
    # Calculate the required angles.
    #----------------------------------------------------------------------------------------------------------------
    
    # Get the angle between the left shoulder, elbow and wrist points.
    left_elbow_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value],
                                      landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value],
                                      landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value])
    angles['left_elbow'] = left_elbow_angle
    
    # Get the angle between the right shoulder, elbow and wrist points.
    right_elbow_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value],
                                       landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value],
                                       landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value])
    angles['right_elbow'] = right_elbow_angle
    
    # Get the angle between the left elbow, shoulder and hip points.
    left_shoulder_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value],
                                         landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value],
                                         landmarks[mp_pose.PoseLandmark.LEFT_HIP.value])
    angles['left_shoulder'] = left_shoulder_angle
 
    # Get the angle between the right hip, shoulder and elbow points.
    right_shoulder_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value],
                                          landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value],
                                          landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value])
    angles['right_shoulder'] = right_shoulder_angle
 
    # Get the angle between the left hip, knee and ankle points.
    left_knee_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_HIP.value],
                                     landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value],
                                     landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value])
    angles['left_knee'] = left_knee_angle
 
    # Get the angle between the right hip, knee and ankle points
    right_knee_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value],
                                      landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value],
                                      landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value])
    angles['right_knee'] = right_knee_angle
    
    # Calculate the angle for the hips
    left_hip_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value],
                                landmarks[mp_pose.PoseLandmark.LEFT_HIP.value],
                                landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value])
    angles['left_hip'] = left_hip_angle

    right_hip_angle = calculateAngle(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value],
                                 landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value],
                                 landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value])
    angles['right_hip'] = right_hip_angle

    

    
    #----------------------------------------------------------------------------------------------------------------
    
    # Check if it is the warrior II pose or the T pose.
    # As for both of them, both arms should be straight and shoulders should be at the specific angle.
    #----------------------------------------------------------------------------------------------------------------
    
    # Check if the both arms are straight.
    if left_elbow_angle > 165 and left_elbow_angle < 195 and right_elbow_angle > 165 and right_elbow_angle < 195:
 
        # Check if shoulders are at the required angle.
        if left_shoulder_angle > 80 and left_shoulder_angle < 110 and right_shoulder_angle > 80 and right_shoulder_angle < 110:
 
            # Check if it is the warrior II pose.
            #----------------------------------------------------------------------------------------------------------------
 
            # Check if one leg is straight.
            if left_knee_angle > 165 and left_knee_angle < 195 or right_knee_angle > 165 and right_knee_angle < 195:
 
                # Check if the other leg is bended at the required angle.
                if left_knee_angle > 90 and left_knee_angle < 120 or right_knee_angle > 90 and right_knee_angle < 120:
 
                    # Specify the label of the pose that is Warrior II pose.
                    label = 'Warrior II Pose'
                        
    #----------------------------------------------------------------------------------------------------------------
    
    # Check if it is the T pose.
    #----------------------------------------------------------------------------------------------------------------
    
            # Check if both legs are straight
            if left_knee_angle > 160 and left_knee_angle < 195 and right_knee_angle > 160 and right_knee_angle < 195:
 
                # Specify the label of the pose that is tree pose.
                label = 'T Pose'
 
    #----------------------------------------------------------------------------------------------------------------
    # Check if it is the Chair Pose (Utkatasana).
#----------------------------------------------------------------------------------------------------------------

# Check if both knees are bent at the required angle.
            if (160 < left_knee_angle < 190) and (160 < right_knee_angle < 190):
    # Check if both elbows are bent at the required angle.
                if (130 < left_elbow_angle < 150) and (130 < right_elbow_angle < 150):
        # Check if both hips are at the required angle.
                    if (230 < left_hip_angle < 250) or (230 < right_hip_angle < 250):
            # Specify the label of the pose as Cobra Pose.
                        label = 'Cobra Pose'
        
#----------------------------------------------------------------------------------------------------------------
    
    # Check if it is the tree pose.
    #----------------------------------------------------------------------------------------------------------------
    
    # Check if one leg is straight
    if left_knee_angle > 165 and left_knee_angle < 195 or right_knee_angle > 165 and right_knee_angle < 195:
 
        # Check if the other leg is bended at the required angle.
        if left_knee_angle > 315 and left_knee_angle < 335 or right_knee_angle > 25 and right_knee_angle < 45:
 
            # Specify the label of the pose that is tree pose.
            label = 'Tree Pose'
                
    #----------------------------------------------------------------------------------------------------------------
            

    # Check if both knees are straight
    if left_knee_angle > 165 and right_knee_angle > 165:
        # Check if both elbows are straight
        if left_elbow_angle > 165 and right_elbow_angle > 165:
            # Check if both shoulders are parallel to the ground
            if 10 < left_shoulder_angle < 20 and 10 < right_shoulder_angle < 20:
                # Check if both hips are straight
                if 170 < left_hip_angle < 180 and 170 < right_hip_angle < 180:
                    label = 'Mountain Pose'
    
    # Write the label on the output image.
    # cv2.putText(output_image, label, (10, 30), cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 2)
    
    # Return the classified label.
    return label
    



def detectPose(image, pose):
    output_image = image.copy()
    imageRGB = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = pose.process(imageRGB)
    height, width, _ = image.shape
    landmarks = []
    if results.pose_landmarks:
        mp_drawing.draw_landmarks(image=output_image, landmark_list=results.pose_landmarks, connections=mp_pose.POSE_CONNECTIONS)
        for landmark in results.pose_landmarks.landmark:
            landmarks.append((int(landmark.x * width), int(landmark.y * height), (landmark.z * width)))
    return output_image, landmarks

if __name__ == '__main__':
    pose_video = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5, model_complexity=1)
    video = cv2.VideoCapture(0)
    time1 = 0
    while video.isOpened():
        ok, frame = video.read()
        if not ok:
            break
        frame = cv2.flip(frame, 1)
        frame_height, frame_width, _ = frame.shape
        frame = cv2.resize(frame, (int(frame_width * (640 / frame_height)), 640))
        frame, landmarks = detectPose(frame, pose_video)
        classifyPose(landmarks, frame)
        time2 = time()
        if (time2 - time1) > 0:
            frames_per_second = 1.0 / (time2 - time1)
            # cv2.putText(frame, 'FPS: {}'.format(int(frames_per_second)), (10, 30), cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 3)
        time1 = time2
        cv2.imshow('Pose Detection', frame)
        k = cv2.waitKey(1) & 0xFF
        if k == 27:
            break
    video.release()
    cv2.destroyAllWindows()
