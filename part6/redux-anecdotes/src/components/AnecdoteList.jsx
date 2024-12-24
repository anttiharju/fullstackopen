import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import PropTypes from 'prop-types'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return(
    <>
      {anecdotes.map(anecdote =>
        <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() =>
          dispatch(vote(anecdote.id))}
        />
      )}
    </>
  )
}

export default AnecdoteList
