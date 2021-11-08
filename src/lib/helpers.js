export function sortByVotes(data) {
  data.sort(function(a, b) {
    const filmA = a.vote_average
    const filmB = b.vote_average
    if (filmA < filmB) {
      return -1
    }
    if (filmA > filmB) {
      return 1
    }
    return 0
  })
  return data
}