import axios from 'axios'
import { sortByVotes } from './helpers'

const baseUrl = 'https://api.themoviedb.org/3'
const apiKey = process.env.REACT_APP_API_KEY

export async function getActor(actor) {
  const { data } = await axios.get(
    `${baseUrl}/search/person?api_key=${apiKey}&query=${actor}`
  )

  if (
    data.total_results === 0 ||
    data.results[0].known_for_department !== 'Acting' ||
    data.results[0].id === 2570957
  ) {
    return null
  }

  return data
}

export async function getFilmography(actorId) {
  const { data } = await axios.get(
    `${baseUrl}/person/${actorId}/movie_credits?api_key=${apiKey}`
  )

  if (
    sortByVotes(data.cast)
      .filter((movie) => movie.vote_count > 25)
      .map((movie) => movie).length === 0
  ) {
    return null
  }

  return data
}

export function getMovie(movieId) {
  return axios.get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`)
}
