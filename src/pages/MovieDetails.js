import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [torrentData, setTorrentData] = useState([]);
  const [loadingTorrent, setLoadingTorrent] = useState(true);

  const fetchMovieDetails = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=40ea9ffe294065bfde6d35980bd08736`
      );
      const data = await res.json();
      setMovie(data);

      // Fetch torrents from YTS API
      fetchTorrent(data.title || data.original_title);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  }, [id]);

  const fetchTorrent = async (movieTitle) => {
    try {
      const res = await fetch(
        `http://165.232.178.10:8080/api/glodls/${encodeURIComponent(movieTitle)}`
      );
      const data = await res.json();

      if (data && Array.isArray(data) && data.length > 0) {
        // Process the data as it contains a list of torrents
        const torrents = data[0].Files || [];
        setTorrentData(torrents);
      } else {
        setTorrentData([]);
      }
    } catch (error) {
      console.error('Error fetching torrents:', error);
      setTorrentData([]);
    } finally {
      setLoadingTorrent(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

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

        <h2>Torrents</h2>
        {loadingTorrent ? (
          <p>Loading torrents...</p>
        ) : torrentData.length > 0 ? (
          torrentData.map((torrent, index) => (
            <div key={index} className="torrent-info">
              <h3>{torrent.Quality} - {torrent.Type}</h3>
              <p>Size: {torrent.Size}</p>
              <button
                className="download-btn"
                onClick={() => window.open(torrent.Magnet, '_blank')}
              >
                Download Magnet
              </button>
            </div>
          ))
        ) : (
          <p>No torrents available for this movie.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
