import {
  MIN_VOTE_COUNT,
  PLACEHOLDER_POSTER_URL,
  POSTER_BASE_URL,
  RESULTS_LIMIT
} from './constants'

export function sortByRating(movies) {
  return [...movies].sort((a, b) => a.vote_average - b.vote_average)
}

// The lowest rated movies with enough votes for the rating to mean something
export function getWorstMovies(movies, limit = RESULTS_LIMIT) {
  const rated = movies.filter((movie) => movie.vote_count > MIN_VOTE_COUNT)
  return sortByRating(rated).slice(0, limit)
}

export function getPosterUrl(posterPath) {
  return posterPath ? `${POSTER_BASE_URL}${posterPath}` : PLACEHOLDER_POSTER_URL
}

export function getReleaseYear(releaseDate) {
  return releaseDate ? releaseDate.substring(0, 4) : null
}

export function getMovieUrl(movie) {
  return movie.imdb_id
    ? `https://www.imdb.com/title/${movie.imdb_id}/`
    : `https://www.themoviedb.org/movie/${movie.id}`
}
