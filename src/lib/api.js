import axios from 'axios'
import { EXCLUDED_PERSON_IDS } from './constants'

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { api_key: process.env.REACT_APP_API_KEY },
})

// Returns the best matching actor ({ id, name }) or null if there isn't one
export async function getActor(query) {
  const { data } = await tmdb.get('/search/person', { params: { query } })
  const [person] = data.results

  if (
    !person ||
    person.known_for_department !== 'Acting' ||
    EXCLUDED_PERSON_IDS.includes(person.id)
  ) {
    return null
  }

  return { id: person.id, name: person.name }
}

export async function getFilmography(actorId) {
  const { data } = await tmdb.get(`/person/${actorId}/movie_credits`)
  return data.cast
}

export async function getMovie(movieId) {
  const { data } = await tmdb.get(`/movie/${movieId}`)
  return data
}
