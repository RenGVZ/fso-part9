interface Props {
  courses: Array<{
    name: string
    exerciseCount: number
  }>
}

const Total = (props: Props) => {
  return (
    <div>
      Number of exercises{" "}
      {props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  )
}

export default Total
