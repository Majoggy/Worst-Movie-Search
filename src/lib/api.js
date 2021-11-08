import axios from 'axios'

const baseUrl = 'https://api.themoviedb.org/3'
const apiKey = process.env.REACT_APP_API_KEY

export function getActor(actor) {
  return axios.get(`${baseUrl}/search/person?api_key=${apiKey}&query=${actor}`)
}

export function getFilmography(actorId) {
  return axios.get(`${baseUrl}/person/${actorId}/movie_credits?api_key=${apiKey}`)
}

export function getMovie(movieId) {
  return axios.get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`)
}