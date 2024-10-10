const Person = ({ name, number, destroy }) => {
  return (
    <li>
      {name} {number}
      <button onClick={destroy}>delete</button>
    </li>
  )
}

export default Person
