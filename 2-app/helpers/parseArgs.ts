interface CorrectArgs {
  goal: number
  days: number[]
}

const parseArgs = (target: number, days: number[]): CorrectArgs => {
  const isDaysValid: boolean = days.every((day) => !isNaN(Number(day)))
  if (!target || isNaN(Number(target)))
    throw new Error("invalid target argument")
  if (!isDaysValid || days.length <= 0) throw new Error("invalid days argument")
  return {
    goal: Number(target),
    days: days.map((day) => Number(day)),
  }
}


export default parseArgs