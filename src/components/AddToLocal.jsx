export default function AddToLocal({ movie }) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const isAdded = favorites.find((favMovie) => favMovie.id === movie.id);

  if (!isAdded) {
    favorites.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  return null;
}
