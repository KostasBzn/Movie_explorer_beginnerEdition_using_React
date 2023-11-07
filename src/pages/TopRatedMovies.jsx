import { useState, useEffect } from "react";
import MovieDetails from "../components/movieDetails";
import AddToLocal from "../components/AddToLocal.jsx";
import DeleteFromLocal from "../components/DeleteFromLocal.jsx";
import Favourites from "./Favourites.jsx";

export default function TopRatedMovies() {
  const [topRated, setTopRated] = useState([]);
  const [selectedId, setSelectedId] = useState();

  const apiKey = "47a3d7177c8cbf56872ab7cc1463cea5";

  //Fetch movies
  useEffect(() => {
    async function fetchTopRated() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
        );
        const topData = await response.json();
        setTopRated(topData.results);
      } catch (error) {
        console.log(error, `Can not fetch the top movies`);
      }
    }
    fetchTopRated();
    console.log(topRated);
  }, []);

  //show Details
  function showDetails(movieId) {
    setSelectedId(movieId);
  }

  //favourites button
  const toggleFavorite = (movieId) => {
    const newTopRated = topRated.map((movie) => {
      if (movie.id === movieId) {
        const isFavorite = !movie.isFavorite;
        console.log(
          `This movie is ${
            isFavorite ? "added to" : "removed from"
          } favorites. Movie ID: ${movieId}`
        );
        return { ...movie, isFavorite };
      } else {
        return movie;
      }
    });
    setTopRated(newTopRated);
  };

  return (
    <>
      <div>
        <h2 className="title">Top Rated Movies</h2>
        <ul className="movie_list">
          {topRated.map((movie) => (
            <li key={movie.id}>
              <button
                className="favorite"
                onClick={() => toggleFavorite(movie.id)}
              >
                {movie.isFavorite ? (
                  <div>
                    <i className="fa-solid heart-solid fa-heart"></i>
                    <AddToLocal movie={movie} />
                  </div>
                ) : (
                  <div>
                    <i className="fa-regular heart-empty fa-heart"></i>
                    <DeleteFromLocal movie={movie} />
                  </div>
                )}
              </button>
              <h3>{movie.title}</h3>
              <p>
                <b>Rating:</b> {`${movie.vote_average.toFixed(2)}`}
              </p>
              <p>
                <b>Release Date:</b> {`${movie.release_date}`}
              </p>
              <img
                className="logo"
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title}`}
              />
              <button
                onClick={() => {
                  showDetails(movie.id);
                }}
                className="details_button"
              >
                More details
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {selectedId ? (
          <MovieDetails movieId={selectedId} apiKey={apiKey} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
