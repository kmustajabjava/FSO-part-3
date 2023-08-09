const Notification = ({ message,type }) => {
  const styling={
    color: type==='error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
      }
  if (message=== null) {
    return
  }
  else
  return (
    <div style={styling} >
      {message}
    </div>
  )
 
}

export default Notification