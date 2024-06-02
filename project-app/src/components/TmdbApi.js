import axios from "axios";

const API_KEY = "37342d660118c08f00eaab5f02106038";
const BASE_URL = "https://api.themoviedb.org/3";


// fetch('https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&with_genres=${SelectedGenre}', options)

class TmdbApi {
  static async getPopularMovies(page) {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
      );
      console.log(response)
      return response.data;
    } catch (error) {
      //console.log(response.data);
      console.error("Error fetching popular movies:", error);
      throw error;
    }
  }

  static async getMoviesByGenre(genre) {
    try {
      const page = Math.floor(Math.random() * 500) + 1;
      const response = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}&page=${page}&language=en`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
      throw error;
    }
  }

  static async getType() {
    try {
      const response = await axios.get(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      return response.data;
    } catch (error) {
      console.log("Error", error);
    }
  }

}

export default TmdbApi;
