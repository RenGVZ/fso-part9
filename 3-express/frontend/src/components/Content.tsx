interface Props {
  courses: Array<{
    name: string
    exerciseCount: number
  }>
}

const Content = (props: Props) => {
  return (
    <>
      {props.courses.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </>
  )
}

export default Content
