import { useState, useEffect } from "react";
import MovieDetails from "../components/movieDetails";
import AddToLocal from "../components/AddToLocal.jsx";
import DeleteFromLocal from "../components/DeleteFromLocal.jsx";

export default function UpcomigMovies() {
  const [upcoming, setUpcoming] = useState([]);
  const [selectedId, setSelectedId] = useState();

  const apiKey = "47a3d7177c8cbf56872ab7cc1463cea5";

  //Fetch movies
  useEffect(() => {
    async function fetchUpcoming() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
        );
        const upcomingData = await response.json();
        setUpcoming(upcomingData.results);
      } catch (error) {
        console.log(error, `Can not fetch the upcoming movies`);
      }
    }
    fetchUpcoming();
    console.log(upcoming);
  }, []);

  //show Details
  function showDetails(movieId) {
    setSelectedId(movieId);
  }

  //favourites button
  const toggleFavorite = (movieId) => {
    const newUpcoming = upcoming.map((movie) => {
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
    setUpcoming(newUpcoming);
  };

  return (
    <>
      <div>
        <h2 className="title">Upcoming Movies</h2>
        <ul className="movie_list">
          {upcoming.map((movie) => (
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
