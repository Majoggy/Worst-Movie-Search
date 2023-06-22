/* eslint-disable camelcase */

import React from 'react'
import { getActor, getFilmography, getMovie } from './lib/api'
import { sortByVotes } from './lib/helpers'

function App() {
  const [searchTerm, setSearchTerm] = React.useState(null)
  const [actor, setActor] = React.useState(null)
  const [data, setData] = React.useState(false)
  const [searchFail, setSearchFail] = React.useState(false)
  const [reload, setReload] = React.useState(false)
  const [darkMode, setDarkMode] = React.useState(false)

  const setSearch = (e) => {
    const currentSearch = e.target.value
    setSearchTerm(currentSearch)
  }

  const handleSearch = async (e) => {
    setReload(false)
    e.preventDefault()

    try {
      const response = await getActor(searchTerm)

      if (response === null) {
        return failSearch()
      }

      const { id, name } = response.results[0]

      setSearchFail(false)
      getFilms(id)
      setActor(name)
    } catch (err) {
      console.log(err)
    }
  }

  const failSearch = () => {
    setSearchFail(true)
    getFilms(4724)
    setActor('Kevin Bacon')
    setReload(true)
  }

  const getFilms = async (actorId) => {
    try {
      const response = await getFilmography(actorId)

      if (response === null) {
        return failSearch()
      }

      setData(sortByVotes(response.cast))
    } catch (err) {
      console.log(err)
    }
  }

  const handleLink = async (e) => {
    try {
      const movieId = e.target.id
      const {
        data: { imdb_id },
      } = await getMovie(movieId)
      window.location.href = `https://www.imdb.com/title/${imdb_id}/?ref_=fn_al_tt_2`
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className={darkMode ? 'body dark-mode' : 'body'}>
      <section className="app-wrap">
        <h1 onClick={darkMode ? setDarkMode(false) : setDarkMode(true)}>
          Worst Movie Search{' '}
        </h1>
        <p>Your favourite actors at their lowest ebb </p>
        <form className="search-form">
          <input
            id="search-bar"
            className={darkMode ? 'dark-mode' : ''}
            type="text"
            onChange={setSearch}
          />
          <button
            id="search-button"
            type="submit"
            onMouseUp={(e) => {
              e.target.style.backgroundColor = 'rgb(238, 238, 238)'
            }}
            onMouseDown={(e) => {
              e.target.style.backgroundColor = 'rgb(215, 215, 215)'
            }}
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
        {data && (
          <>
            {searchFail ? (
              <h4 className={reload ? 'reload' : ''}>
                I couldn&apos;t find that, so I found {actor} instead
              </h4>
            ) : (
              <h4 className={reload ? 'reload' : ''}> Results for {actor}</h4>
            )}
            <div className={reload ? 'reload poster-wrap' : 'poster-wrap'}>
              {data &&
                data
                  .filter((movie) => movie.vote_count > 25)
                  .map((movie) => (
                    <div key={movie.title} className="result">
                      <img
                        width="200px"
                        onClick={handleLink}
                        onMouseDown={(e) => {
                          e.target.classList = 'darker poster'
                        }}
                        onMouseUp={(e) => {
                          e.target.classList = 'poster'
                        }}
                        className={darkMode ? 'poster p-dark-mode' : 'poster'}
                        id={movie.id}
                        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                        onError={(event) =>
                          (event.target.src =
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png')
                        }
                      />
                    </div>
                  ))
                  .slice(0, 3)}
            </div>
            <div className={reload ? 'reload results-wrap' : 'results-wrap'}>
              {data &&
                data
                  .filter((movie) => movie.vote_count > 25)
                  .map((movie) => (
                    <div key={movie.title} className="result">
                      <p className="title">{movie.title}</p>
                      <p>({movie.release_date.substring(0, 4)})</p>
                    </div>
                  ))
                  .slice(0, 3)}
            </div>
          </>
        )}
      </section>
    </section>
  )
}

export default App
