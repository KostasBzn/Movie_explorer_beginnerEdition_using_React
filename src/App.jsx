import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import TopRatedMovies from "./pages/TopRatedMovies.jsx";
import TrendingMovies from "./pages/TrendingMovies.jsx";
import UpcomigMovies from "./pages/UpcomigMovies.jsx";
import Favourites from "./pages/Favourites.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/top" element={<TopRatedMovies />} />
            <Route path="/trending" element={<TrendingMovies />} />
            <Route path="/upcoming" element={<UpcomigMovies />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
