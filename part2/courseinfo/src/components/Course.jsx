const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

const Header = ({ course: { name } }) => {
  return (
    <h1>
      {name}
    </h1>
  )
}

const Content = ({ course: { parts } }) => {
  return (
    <>
      {parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

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

export default Course
