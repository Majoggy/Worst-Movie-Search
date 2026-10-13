import { getReleaseYear } from '../lib/helpers'

function MovieDetails({ movie }) {
  const year = getReleaseYear(movie.release_date)

  return (
    <div className="result">
      <p className="title">{movie.title}</p>
      {year && <p>({year})</p>}
    </div>
  )
}

export default MovieDetails
