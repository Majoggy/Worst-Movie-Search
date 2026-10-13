import { useState } from 'react'
import { getMovie } from '../lib/api'
import { PLACEHOLDER_POSTER_URL } from '../lib/constants'
import { getMovieUrl, getPosterUrl } from '../lib/helpers'

function MoviePoster({ movie }) {
  const [src, setSrc] = useState(() => getPosterUrl(movie.poster_path))

  const handleClick = async () => {
    try {
      const details = await getMovie(movie.id)
      window.location.href = getMovieUrl(details)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="result">
      <button
        type="button"
        className="poster-button"
        onClick={handleClick}
        aria-label={`View ${movie.title} on IMDb`}
      >
        <img
          className="poster"
          width="200"
          src={src}
          alt={`${movie.title} poster`}
          onError={() => setSrc(PLACEHOLDER_POSTER_URL)}
        />
      </button>
    </div>
  )
}

export default MoviePoster
