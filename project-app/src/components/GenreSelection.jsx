// GenreSelection.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styleSheet/GenreSelection.css";

const GenreSelection = () => {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedDiff, setSelectedDiff] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGenre) {
      // Navigate to GamePage and pass selectedGenre and selectedDiff as state
      navigate("/movieGame", {
        state: { selectedGenre, selectedDiff },
      });
    }
  };

  return (
  
    <div className="genre-container">
      <h2>Select a Movie Genre</h2>
      <form className="genre-form" onSubmit={handleSubmit}>
        <label className="genre-label">
          Genre you'd like to play with! 
          <br></br>
          <br></br>
          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="">Select One</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Animation">Animation</option>
            <option value="Family">Family</option>
            <option value="Romance">Romance</option>
            <option value="Thriller">Thriller</option>
          </select>
        </label>
        <br></br>

        <label>
          Difficulty Level 
          <br></br>
          <br></br>
          <select
            value={selectedDiff} onChange={(e) => setSelectedDiff(e.target.value)}>
            <option value="">Select One</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Difficult</option>
          </select>
        </label>
        <br></br>
        <button className="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GenreSelection;
