import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Recommendation = () => {
    const [selectedPain, setSelectedPain] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [message, setMessage] = useState('');
    const [uniquePainNames, setUniquePainNames] = useState([]);

    useEffect(() => {
        const fetchUniquePain = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/unique_pain');  // Endpoint to fetch unique pain names
                setUniquePainNames(response.data);
                setSelectedPain(response.data[0]);  // Set the first pain name as default
            } catch (error) {
                console.error('Error fetching unique pain names:', error);
            }
        };

        fetchUniquePain();
    }, []);

    const handleRecommendation = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/recommend', { pain: selectedPain });
            if (response.data.length > 0) {
                setRecommendations(response.data);
            } else {
                setMessage('No recommendations available for the selected pain.');
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setMessage('Error fetching recommendations. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Select the Pain you wish to cure:</h1>

            <select
                value={selectedPain}
                onChange={(e) => setSelectedPain(e.target.value)}
            >
                {uniquePainNames.map((pain, index) => (
                    <option key={index} value={pain}>
                        {pain}
                    </option>
                ))}
            </select>

            <button onClick={handleRecommendation}>Recommend</button>

            {message && <p>{message}</p>}

            <div>
                {recommendations.map((recommendation, index) => (
                    <div key={index}>
                        <h3>{recommendation.pose}</h3>
                        <img src={recommendation.image} alt={recommendation.pose} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendation;
