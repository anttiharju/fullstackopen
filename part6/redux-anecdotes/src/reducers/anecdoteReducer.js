/* eslint-disable no-case-declarations */
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

function byVotes(a1, a2) {
  if (a1.votes < a2.votes) {
    return 1
  } else if (a1.votes > a2.votes) {
    return -1
  }
  return 0
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.payload].sort(byVotes)
    case 'VOTE':
      const id = action.payload.id
      const voteToChange = state.find(v => v.id === id)
      const changedVote = {
        ...voteToChange,
        votes: voteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedVote
      ).sort(byVotes)
    default:
      return state
    }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: asObject(content),
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    payload: {
      id: id
    }
  }
}

export default reducer
