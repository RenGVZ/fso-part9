interface CoursePartBase {
  name: string
  exerciseCount: number
}

interface CoursePartOne extends CoursePartBase {
  description: string
}

interface CoursePartBasic extends CoursePartOne {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number
  kind: "group"
}

interface CoursePartBackground extends CoursePartOne {
  backgroundMaterial: string
  kind: "background"
}

interface CoursePartSpecial extends CoursePartOne {
  requirements: string[]
  kind: "special"
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial
