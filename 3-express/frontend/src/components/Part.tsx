import { CoursePart } from "../types"

type Props = {
  courses: CoursePart[]
}

const boldStyle = {
  fontWeight: "bold",
}

const italicStyle = {
  fontStyle: "italic",
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part = (props: Props) => {
  return (
    <>
      {props.courses.map((course) => {
        switch (course.kind) {
          case "basic":
            return (
              <div key={course.name}>
                <p style={boldStyle}>{course.name} <span>{course.exerciseCount}</span></p>
                <p style={italicStyle}>{course.description}</p>
              </div>
            )
            break
          case "group":
            return (
              <div key={course.name}>
                <p style={boldStyle}>
                  {course.name} <span>{course.exerciseCount}</span>
                </p>
                <p>Project exercises {course.groupProjectCount}</p>
              </div>
            )
            break
          case "background":
            return (
              <div key={course.name}>
                <p style={boldStyle}>
                  {course.name} <span>{course.exerciseCount}</span>
                </p>
                <p style={italicStyle}>{course.description}</p>
                <p>submit to {course.backgroundMaterial}</p>
              </div>
            )
          case "special":
            return (
              <div key={course.name}>
                <p style={boldStyle}>
                  {course.name} <span>{course.exerciseCount}</span>
                </p>
                <p style={italicStyle}>{course.description}</p>
                <p> Required skills: {" "}
                  {course.requirements.map((req, i) => (
                    <span key={i}>
                      {req}
                      {i < course.requirements.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>
            )
          default:
            return assertNever(course)
        }
      })}
    </>
  )
}

export default Part
