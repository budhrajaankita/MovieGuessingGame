import React, { useState, useEffect, useRef } from "react";
import "./styleSheet/GamePage.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import tmdbApi from "./TmdbApi";

import action from "../components/assets/action.png";

const GamePage = ({ duration = 120000 }) => {

  const location = useLocation();
  const { selectedGenre, selectedDiff } = location.state || {};
  let maxChances = 15;

  if (selectedDiff === "medium"){
    maxChances = 10;
  }
  else if (selectedDiff === "difficult"){
    maxChances = 5;
  }

  const [selectedMovie, setSelectedMovie] = useState(null);

  // const [selectedMovie, setSelectedMovie] = useState(getRandomMovie());
  const [userGuess, setUserGuess] = useState("");
  const [remainingChances, setRemainingChances] = useState(maxChances);
  const [initialDisplayedMovie, setInitialDisplayedMovie] = useState("");
  const [blanksRemaining, setBlanksRemaining] = useState(0);
  const [displayedMovie, setDisplayedMovie] = useState("");
  const [message, setMessage] = useState("");
  const [timeUp, setTimeUp] = useState(false);

  const isInitialRender = useRef(true);
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await tmdbApi.getMoviesByGenre(selectedGenre);
        const movieTitles = response.results
          .map((movie) => movie.title.toUpperCase())
          .filter((title) => title.length > 5  && /^[a-zA-Z\s]*$/.test(title));
        setMovies(movieTitles);  
        if (movieTitles.length > 0) {
          setSelectedMovie(getRandomMovie(movieTitles));
        }
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  useEffect(() => {
    if (movies.length > 0) {
      setSelectedMovie(getRandomMovie(movies));
    }
  }, [movies]);

  function getRandomMovie(moviesArray) {
    // console.log(movies)
    const randomIndex = Math.floor(Math.random() * moviesArray.length);
    return moviesArray[randomIndex];
  }

  useEffect(() => {
    if (movies.length > 0) {
      setSelectedMovie(getRandomMovie(movies));
    }
  }, [movies, setSelectedMovie]);

  function getInitialDisplayedMovie(movie) {
    if (movie === null) {
      return ""; 
    }
      const blanks = movie
        .split("")
        .map((char) => (char === " " ? "\u00A0" : "_"))
        .join(" ");
    
      // setBlanksRemaining(movie.replace(/[^A-Z ]/g, '').length);
      setBlanksRemaining(blanks.replace(/[^_]/g, "").length);
      return blanks;
    }


  useEffect(() => {
    if (isInitialRender.current) {
      const initialMovie = getInitialDisplayedMovie(selectedMovie);
      console.log(initialMovie)
      setInitialDisplayedMovie(initialMovie);
      setDisplayedMovie(initialMovie);
      isInitialRender.current = false;
    } else {
      setDisplayedMovie(initialDisplayedMovie);
    }
  }, [selectedMovie, initialDisplayedMovie]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimeUp(true);
      setMessage(`Time's up! The correct movie was ${selectedMovie}.`);
      setRemainingChances(0);
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, selectedMovie]);

  const handleGuess = (alphabet) => {
    if (!timeUp && remainingChances > 0 && blanksRemaining > 0) {
      const guess = alphabet.toUpperCase();

      if (
        selectedMovie.includes(guess) ||
        selectedMovie.includes(guess.toLowerCase())
      ) {
        const updatedDisplayedMovie = selectedMovie
          .split("")
          .map((char, index) => {
            if (char === guess || char === guess.toLowerCase()) {
              return char;
            } else if (char === " ") {
              return "\u00A0";
            } else {
              return displayedMovie[index * 2];
            }
          })
          .join(" ");

        setDisplayedMovie(updatedDisplayedMovie);
        setMessage(
          "Keep going.. You guessed the correct letter!"
        )

        // const remainingBlanks = updatedDisplayedMovie.replace(/[^A-Z ]/g, '').length;
        const blanksRemaining = updatedDisplayedMovie.replace(
          /[^_]/g,
          ""
        ).length;
        setBlanksRemaining(blanksRemaining);
        setUserGuess("");
        // console.log(blanksRemaining);
        if (blanksRemaining === 0) {
          setMessage(
            `Congratulations! You guessed the correct movie: ${selectedMovie}.`
          );
          setRemainingChances(0);
        }
      } else {
        setRemainingChances((prevChances) => prevChances - 1);

        if (remainingChances === 1) {
          setMessage(
            `Sorry, you're out of chances. The correct movie was ${selectedMovie}.`
          );
        } else {
          setMessage(
            `Wrong guess! ${remainingChances - 1} ${
              remainingChances - 1 === 1 ? "chance" : "chances"
            } left.`
          );
        }
        setUserGuess("");
      }

      if (blanksRemaining === 0) {
        setMessage(
          `Congratulations! You guessed the correct movie: ${selectedMovie}.`
        );
        setRemainingChances(0);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleGuess(userGuess);
    }
  };

  const handleQuit = () => {
    navigate("/login");
  };

  const handleRestart = () => {
    const newSelectedMovie = getRandomMovie(movies);
    console.log(newSelectedMovie);
    const initialMovie = getInitialDisplayedMovie(newSelectedMovie);
  
    setUserGuess("");
    setRemainingChances(maxChances);
    setBlanksRemaining(newSelectedMovie.replace(/[^A-Z]/g, "").length);
    setInitialDisplayedMovie(initialMovie);
    setDisplayedMovie(initialMovie);
    setMessage("");
    setTimeUp(false);
    setSelectedMovie(newSelectedMovie); 
  };
  

  return (
    <div className="game-container">
      <h1> Welcome, {localStorage.getItem('active_user')}!</h1>
      <h2>Guess the movie name! <span className="movie-img"><img src={action} alt="" /></span></h2>
      <p>Click or type any letter below to make a guess.</p>
      
      <p className="displayed-movie">{displayedMovie}</p>
      <p>{message}</p>
      {/* && blanksRemaining > 0  */}
      {remainingChances > 0 && !timeUp && (
        <div className="guess-div">
          <input className="text-box"
            type="text"
            maxLength={1}
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            placeholder="Enter a letter"
          />

          <div className="alphabet-buttons">
            {Array.from({ length: 26 }, (_, index) =>
              String.fromCharCode("A".charCodeAt(0) + index)
            ).map((alphabet, index) => (
              <button
                key={index}
                onClick={() => handleGuess(alphabet)}
                disabled={
                  displayedMovie.includes(alphabet) ||
                  displayedMovie.includes(alphabet.toLowerCase())
                }
              >
                {alphabet}
              </button>
            ))}
          </div>
        </div>
      )}
      <div>
        <button className="restart" onClick={handleRestart}>Restart</button>
        <button className="exit" onClick={handleQuit}>Exit</button>
      </div>
    </div>
    
  );
};

export default GamePage;
