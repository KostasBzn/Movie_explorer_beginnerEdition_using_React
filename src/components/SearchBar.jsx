import { useState, useEffect } from "react";
import MovieDetails from "../components/movieDetails";
import AddToLocal from "../components/AddToLocal.jsx";
import DeleteFromLocal from "../components/DeleteFromLocal.jsx";

export default function SearchBar() {
  const [results, setResults] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [resultsArray, setResultsArray] = useState([]);
  const [currentPage, setCurrentpage] = useState(1);

  const apiKey = "47a3d7177c8cbf56872ab7cc1463cea5";

  //Fetch movies

  async function fetchSearchResults(page) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          searchInput
        )}&api_key=${apiKey}&page=${page}`
      );
      const searchResults = await response.json();
      setResults(searchResults.results);
      setResultsArray(searchResults);

      console.log(results);
      console.log(resultsArray);
    } catch (error) {
      console.log(error, `Can not fetch the top movies`);
    }
  }

  function goToNextPage() {
    if (currentPage < resultsArray.total_pages) {
      setCurrentpage(currentPage + 1);
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }
  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentpage(currentPage - 1);
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }
  useEffect(() => {
    fetchSearchResults(currentPage);
  }, [currentPage]);

  //show Details
  function showDetails(movieId) {
    setSelectedId(movieId);
  }

  //favourites button
  const toggleFavorite = (movieId) => {
    const newTopRated = results.map((movie) => {
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
    setResults(newTopRated);
  };

  //search button
  const handlerSubmit = () => {
    fetchSearchResults(1, searchInput);
  };

  return (
    <>
      {/* Search bar */}
      <div className="search_bar">
        <label for="search" className="search_label">
          Search
          <input
            id="search"
            type="text"
            placeholder="Movie name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            onClick={handlerSubmit}
            type="submit"
            className="submit_button"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </label>
      </div>
      {/* card layout */}
      <div>
        <h2 className="title">Results</h2>
        <ul className="movie_list">
          {results.map((movie) => (
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
      {/* Movie details */}
      <div>
        {selectedId ? (
          <MovieDetails movieId={selectedId} apiKey={apiKey} />
        ) : (
          <></>
        )}
      </div>
      {/* Page change buttons */}
      <div>
        {results.length > 0 ? (
          <>
            <p>
              <b>Current page:</b> {`${resultsArray.page}`}
            </p>
            <p>
              <b>Total results:</b> {`${resultsArray.total_results}`}
            </p>
            <div class="pages_buttons">
              <button onClick={goToPreviousPage} className="previous_page">
                Previous page
              </button>
              <button onClick={goToNextPage} className="next_page">
                Next page
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
