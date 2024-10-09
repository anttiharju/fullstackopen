const Total = ({ course: { parts } }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <strong>
      <p>
        total of {totalExercises} exercises
      </p>
    </strong>
  )
}

export default Total
