import React, { useState, useEffect } from "react";
import tmdbApi from "./TmdbApi";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await tmdbApi.getPopularMovies(2);
        setMovies(data.results);
      } catch (error) {
        console.error("fail to fetch the movie data", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Popular Movie</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <div>{movie.title}</div>
            <div>{movie.overview}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
