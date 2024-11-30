import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const scrollPosition = useRef(0);

  // Function to fetch movies data
  const fetchMovies = useCallback(async () => {
    let endpoint = `https://api.themoviedb.org/3/movie/${categories}?api_key=40ea9ffe294065bfde6d35980bd08736&page=${page}`;

    if (categories === "trending") {
      endpoint = `https://api.themoviedb.org/3/trending/movie/week?api_key=40ea9ffe294065bfde6d35980bd08736&page=${page}`;
    }

    const response = await fetch(endpoint);
    const data = await response.json();

    let filteredMovies = data.results;

    // Upcoming movies filtering: only future release dates
    if (categories === "upcoming") {
      const today = new Date().toISOString().split("T")[0];
      filteredMovies = filteredMovies.filter(
        (movie) => movie.release_date && movie.release_date >= today
      );
    }

    // Set the movies based on category and page
    setMovies((prevMovies) =>
      page === 1 ? filteredMovies : [...prevMovies, ...filteredMovies]
    );
  }, [categories, page]);

  // Category button handler
  const handleCategoryChange = (category) => {
    if (categories !== category) {
      setCategories(category);
      setPage(1);
      setMovies([]);
    }
  };

  // Search movies handler
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

  // Load more movies when scroll reaches bottom
  const loadMoreMovies = () => setPage((prevPage) => prevPage + 1);

  const saveScrollPosition = () => {
    scrollPosition.current = window.scrollY;
  };

  // Fetch movies when page or category changes
  useEffect(() => {
    fetchMovies();
  }, [page, categories, fetchMovies]);

  return (
    <div className="home-container">
      <div className="site-logo">
        <img
          src={require("./output-onlinegiftools.gif")}
          alt="VinJak Stream Logo"
          className="gif-logo"
        />
      </div>

      {/* Category Buttons */}
      <div className="category-buttons">
        <button
          onClick={() => handleCategoryChange("trending")}
          className={categories === "trending" ? "active-category" : ""}
        >
          Trending
        </button>
        <button
          onClick={() => handleCategoryChange("popular")}
          className={categories === "popular" ? "active-category" : ""}
        >
          Popular
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

      {/* Search Bar */}
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
              <a
                href={`/movie/${movie.id}`}
                target="_blank"
                rel="noreferrer noopener"
                key={movie.id}
                onClick={saveScrollPosition}
              >
                {movie.title} ({movie.release_date?.slice(0, 4)})
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Movies Grid */}
      <div className="movies-grid">
        {movies.map((movie) => (
          <a
            href={`/movie/${movie.id}`}
            target="_blank"
            rel="noreferrer noopener"
            key={movie.id}
            className="movie-card"
            onClick={saveScrollPosition}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <p className="movie-title">{movie.title}</p>
          </a>
        ))}
      </div>

      {/* Load More Button */}
      <button className="load-more" onClick={loadMoreMovies}>
        Load More
      </button>
    </div>
  );
};

export default Home;
