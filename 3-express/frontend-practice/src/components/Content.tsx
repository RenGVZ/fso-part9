import Part from "./Part"
import { CoursePart } from "../types"
interface Props {
  courses: Array<CoursePart>
}

const Content = (props: Props) => {
  return (
    <>
      <Part courses={props.courses} />
    </>
  )
}

export default Content
