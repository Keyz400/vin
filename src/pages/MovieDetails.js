import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [torrentUrl, setTorrentUrl] = useState('');
  const [loadingTorrent, setLoadingTorrent] = useState(true);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=40ea9ffe294065bfde6d35980bd08736`
      );
      const data = await res.json();
      setMovie(data);

      // Fetch torrent URL from YTS
      fetchTorrent(data.title || data.original_title);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const fetchTorrent = async (movieTitle) => {
    try {
      const res = await fetch(
        `https://yts.mx/api/v2/list_movies.json?query_term=${movieTitle}`
      );
      const data = await res.json();
      if (data.data.movies && data.data.movies[0].torrents) {
        const torrentHash = data.data.movies[0].torrents[0].hash;
        setTorrentUrl(`https://yts.mx/torrent/download/${torrentHash}`);
      } else {
        setTorrentUrl(null);
      }
    } catch (error) {
      console.error('Error fetching torrent:', error);
      setTorrentUrl(null);
    } finally {
      setLoadingTorrent(false);
    }
  };

  return (
    <div
      className="movie-details"
      style={{
        backgroundImage: movie.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          : 'none',
      }}
    >
      <div className="movie-content">
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || movie.original_title}
            className="movie-thumbnail"
          />
        )}
        <h1>{movie.title || movie.original_title}</h1>
        <p>Rating: {movie.vote_average || 'N/A'}</p>
        <p>Release Date: {movie.release_date || 'N/A'}</p>
        <p>Genre: {movie.genres ? movie.genres.map((g) => g.name).join(', ') : 'N/A'}</p>
        <p>{movie.overview || 'No description available.'}</p>
        {loadingTorrent ? (
          <p>Loading torrent...</p>
        ) : torrentUrl ? (
          <button
            className="download-btn"
            onClick={() => window.open(torrentUrl, '_blank')}
          >
            Download Torrent
          </button>
        ) : (
          <p>No torrent available for this movie.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
