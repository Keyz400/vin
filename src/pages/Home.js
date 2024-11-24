import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const scrollPosition = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${categories}?api_key=40ea9ffe294065bfde6d35980bd08736&page=${page}`
    );
    const data = await response.json();
    setMovies((prevMovies) => [...prevMovies, ...data.results]);
  };

  const handleCategoryChange = (category) => {
    setCategories(category);
    setPage(1);
    setMovies([]);
  };

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length >= 3) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=40ea9ffe294065bfde6d35980bd08736&query=${e.target.value}`
      );
      const data = await response.json();
      setSuggestions(data.results);
    } else {
      setSuggestions([]);
    }
  };

  const loadMoreMovies = () => setPage((prevPage) => prevPage + 1);

  const saveScrollPosition = () => {
    scrollPosition.current = window.scrollY;
  };

  useEffect(() => {
    if (location.state?.scrollPosition) {
      window.scrollTo(0, location.state.scrollPosition);
    }
  }, [location.state]);

  useEffect(() => {
    fetchMovies();
  }, [page, categories]);

  return (
    <div className="home-container">
      <div className="site-logo">
        <img
          src={require("./output-onlinegiftools.gif")}
          alt="VinJak Stream Logo"
          className="gif-logo"
        />
      </div>
      <div className="category-buttons">
        <button
          onClick={() => handleCategoryChange("popular")}
          className={categories === "popular" ? "active-category" : ""}
        >
          Popular
        </button>
        <button
          onClick={() => handleCategoryChange("top_rated")}
          className={categories === "top_rated" ? "active-category" : ""}
        >
          Trending
        </button>
        <button
          onClick={() => handleCategoryChange("now_playing")}
          className={categories === "now_playing" ? "active-category" : ""}
        >
          Now Playing
        </button>
        <button
          onClick={() => handleCategoryChange("upcoming")}
          className={categories === "upcoming" ? "active-category" : ""}
        >
          Upcoming
        </button>
        <button onClick={() => window.open("https://t.me/vinjak", "_blank")}>
          About
        </button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearch}
        />
        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((movie) => (
              <Link
                to={{
                  pathname: `/movie/${movie.id}`,
                  state: { scrollPosition: scrollPosition.current },
                }}
                key={movie.id}
                onClick={saveScrollPosition}
              >
                {movie.title} ({movie.release_date?.slice(0, 4)})
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="movies-grid">
        {movies.map((movie) => (
          <Link
            to={{
              pathname: `/movie/${movie.id}`,
              state: { scrollPosition: scrollPosition.current },
            }}
            key={movie.id}
            className="movie-card"
            onClick={saveScrollPosition}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <p className="movie-title">{movie.title}</p>
          </Link>
        ))}
      </div>
      <button className="load-more" onClick={loadMoreMovies}>
        Load More
      </button>
    </div>
  );
};

export default Home;
