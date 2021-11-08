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
  let actorId = null

  const setSearch = (e) => {
    const currentSearch = e.target.value
    setSearchTerm(currentSearch)
    console.log(currentSearch)
  }

  const handleSearch = async (e) => {
    setReload(false)
    e.preventDefault()
    try {
      const actorData = await getActor(searchTerm)
      if (actorData.data.total_results === 0 || actorData.data.results[0].known_for_department !== 'Acting' || actorData.data.results[0].id === 2570957) {
        baconTime()
      } else {
        setSearchFail(false)
        actorId = actorData.data.results[0].id
        setActor(actorData.data.results[0].name)
      }      
      filmTime(actorId)
      setReload(true)
    } catch (err) {
      console.log(err)
    }
  }

  const filmTime = async (actorId) => {
    try {
      const response = await getFilmography(actorId)
      if (sortByVotes(response.data.cast).filter(movie => movie.vote_count > 25).map(movie => movie).length === 0) {
        console.log('Actor result, but no film data')
        baconTime()
        const response = await getFilmography(4724)
        setData(sortByVotes(response.data.cast))
      } else setData(sortByVotes(response.data.cast))
    } catch (err) {
      console.log(err)
    }
  }

  const baconTime = () => {
    console.log('Bacon time!')
    setSearchFail(true)
    actorId = 4724
    setActor('Kevin Bacon')
  }

  const handleLink = async (e) => {
    try {
      const movieId = e.target.id
      const response = await getMovie(movieId)
      const imdbLink = `https://www.imdb.com/title/${response.data.imdb_id}/?ref_=fn_al_tt_2`
      window.location.href = imdbLink
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className={ darkMode ? 'body dark-mode' : 'body'}>
      <section className='app-wrap'>
        <h1 onClick={()=> {
          if (darkMode === true) {
            setDarkMode(false) 
          } else setDarkMode(true)
        }}>Worst Movie Search </h1>
        <p>Your favourite actors at their lowest ebb </p>
        <form className='search-form'>
          <input id='search-bar' className={darkMode ? 'dark-mode' : '' } type='text' onChange={setSearch} />
          <button 
            id='search-button' 
            type='submit' 
            onMouseUp={(e)=>{
              e.target.style.backgroundColor = 'rgb(238, 238, 238)'
            }} 
            onMouseDown={(e)=>{
              e.target.style.backgroundColor = 'rgb(215, 215, 215)'
            }} 
            onClick={handleSearch}>Search</button>
        </form>
        {data &&
      <>
        {searchFail ? <h4 className={ reload ? 'reload' : ''}>I couldn&apos;t find that, so I found {actor} instead</h4> : <h4 className={ reload ? 'reload' : ''}> Results for {actor}</h4>}
        <div className={ reload ? 'reload poster-wrap' : 'poster-wrap'}>
          {data && data.filter(movie => movie.vote_count > 25).map(movie =>
            <div key={movie.title}  className='result'>
              <img 
                width='200px' 
                onClick={handleLink}
                onMouseDown={(e) => {
                  e.target.classList = 'darker poster'
                }}
                onMouseUp={(e => {
                  e.target.classList = 'poster'
                })} 
                className={darkMode ? 'poster p-dark-mode' : 'poster'}
                id={movie.id} 
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} 
                onError={(event) => event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'}/> 
            </div>
          ).slice(0, 3)}  
        </div>
        <div className={ reload ? 'reload results-wrap' : 'results-wrap'}>
          {data && data.filter(movie => movie.vote_count > 25).map(movie =>
            <div key={movie.title} className='result'>
              <p className='title'>{movie.title}</p>
              <p>({movie.release_date.substring(0,4)})</p>
            </div>
          ).slice(0, 3)}  
        </div>
      </>}
      </section>
    </section>
  )
}

export default App
