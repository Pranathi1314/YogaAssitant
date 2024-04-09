import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Recommendation.css";

const Recommendation = () => {
  const [selectedPain, setSelectedPain] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [message, setMessage] = useState("");
  const [uniquePainNames, setUniquePainNames] = useState([]);

  useEffect(() => {
    const fetchUniquePain = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/unique_pain"
        ); // Endpoint to fetch unique pain names
        setUniquePainNames(response.data);
        setSelectedPain(response.data[0]); // Set the first pain name as default
      } catch (error) {
        console.error("Error fetching unique pain names:", error);
      }
    };

    fetchUniquePain();
  }, []);

  const handleRecommendation = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/recommend", {
        pain: selectedPain,
      });
      if (response.data.length > 0) {
        setRecommendations(response.data);
      } else {
        setMessage("No recommendations available for the selected pain.");
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setMessage("Error fetching recommendations. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="box">
        <div className="top-section">
          <h1>Select the Pain you wish to cure:</h1>
          <div className="select-container">
            <div className="select-box">
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
            </div>
            <button className="button" onClick={handleRecommendation}>
              Recommend
            </button>
          </div>
          {message && <p className="message">{message}</p>}
        </div>
        <div className="recommendations-container">
          {recommendations.map((recommendation, index) => (
            <div className="recommendation" key={index}>
              <div className="image-container">
                <h3>{recommendation.pose}</h3>
                <img src={recommendation.image} alt={recommendation.pose} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
