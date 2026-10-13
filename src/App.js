import { useState } from 'react'
import Header from './components/Header'
import SearchForm from './components/SearchForm'
import SearchResults from './components/SearchResults'
import useActorSearch from './hooks/useActorSearch'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const { status, actorName, movies, isFallback, search } = useActorSearch()

  const toggleDarkMode = () => setDarkMode((isDark) => !isDark)

  return (
    <section className={darkMode ? 'body dark-mode' : 'body'}>
      <section className="app-wrap">
        <Header onTitleClick={toggleDarkMode} />
        <SearchForm onSearch={search} isLoading={status === 'loading'} />
        {status === 'error' && (
          <h4>Something went wrong, please try again</h4>
        )}
        {actorName && (
          // Keyed so the fade-in animation replays for each new result set
          <SearchResults
            key={`${actorName}-${movies.map((m) => m.id).join()}`}
            actorName={actorName}
            movies={movies}
            isFallback={isFallback}
          />
        )}
      </section>
    </section>
  )
}

export default App
