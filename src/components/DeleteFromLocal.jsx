export default function DeleteFromLocal({ movie }) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const newFavorites = favorites.filter(
    (favoriteMovie) => favoriteMovie.id !== movie.id
  );
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  return null;
}
