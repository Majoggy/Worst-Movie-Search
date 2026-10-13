import { useCallback, useRef, useState } from 'react'
import { getActor, getFilmography } from '../lib/api'
import { FALLBACK_ACTOR } from '../lib/constants'
import { getWorstMovies } from '../lib/helpers'

const initialState = {
  status: 'idle',
  actorName: null,
  movies: [],
  isFallback: false,
}

async function findWorstMovies(actor) {
  const filmography = await getFilmography(actor.id)
  return getWorstMovies(filmography)
}

export default function useActorSearch() {
  const [state, setState] = useState(initialState)
  const latestRequest = useRef(0)

  const search = useCallback(async (query) => {
    const requestId = ++latestRequest.current
    setState((prev) => ({ ...prev, status: 'loading' }))

    try {
      const actor = query ? await getActor(query) : null
      let movies = actor ? await findWorstMovies(actor) : []
      let isFallback = false
      let actorName = actor && actor.name

      if (movies.length === 0) {
        movies = await findWorstMovies(FALLBACK_ACTOR)
        actorName = FALLBACK_ACTOR.name
        isFallback = true
      }

      // Ignore responses from searches that have since been superseded
      if (requestId === latestRequest.current) {
        setState({ status: 'success', actorName, movies, isFallback })
      }
    } catch (err) {
      console.error(err)
      if (requestId === latestRequest.current) {
        setState({ ...initialState, status: 'error' })
      }
    }
  }, [])

  return { ...state, search }
}
