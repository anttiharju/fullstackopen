const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  const style = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <div style={style} className='error'>
      {message}
    </div>
  )
}

export default Notification
