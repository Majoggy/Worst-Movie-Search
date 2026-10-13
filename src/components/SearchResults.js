import MovieDetails from './MovieDetails'
import MoviePoster from './MoviePoster'

function SearchResults({ actorName, movies, isFallback }) {
  const animationClass = isFallback ? 'reload' : ''

  return (
    <>
      <h4 className={animationClass}>
        {isFallback
          ? `I couldn't find that, so I found ${actorName} instead`
          : `Results for ${actorName}`}
      </h4>
      <div className={`poster-wrap ${animationClass}`}>
        {movies.map((movie) => (
          <MoviePoster key={movie.id} movie={movie} />
        ))}
      </div>
      <div className={`results-wrap ${animationClass}`}>
        {movies.map((movie) => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  )
}

export default SearchResults
