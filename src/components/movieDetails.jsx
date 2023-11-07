import { useState, useEffect } from "react";

export default function MovieDetails({ movieId, apiKey }) {
  const [detailData, setDetailData] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
        );
        const data = await response.json();
        setDetailData(data);
        setShowDetails(true);
        console.log(data);
      } catch (error) {
        console.log(error, `Can not fetch the movie details`);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  //details close button
  const closeToggle = () => {
    setShowDetails(false);
  };

  return (
    <div
      className="toggle_section"
      style={{ display: showDetails ? "block" : "none" }}
    >
      <h2>{detailData.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${detailData.poster_path}`}
        alt={detailData.title}
      />
      <p>
        <b>Overview:</b> {detailData.overview}
      </p>
      <p>
        <b>Release Date:</b> {detailData.release_date}
      </p>
      {detailData.spoken_languages ? (
        <p>
          <b>Language:</b> {detailData.spoken_languages[0].name}
        </p>
      ) : (
        <p>
          <b>Language:</b> No languange information
        </p>
      )}
      <p>
        <b>Duration:</b> {`${detailData.runtime} minutes`}
      </p>
      {detailData.genres ? (
        <p>
          <b>Type:</b> {detailData.genres[0].name}
        </p>
      ) : (
        <p>
          <b>Type:</b> No type information
        </p>
      )}
      <button onClick={closeToggle} className="close_toggle">
        <i className="fa-solid fa-square-xmark"></i>
      </button>
    </div>
  );
}
