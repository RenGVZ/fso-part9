interface CorrectArgs {
  target: number
  days: number[]
}

const parseArgs = (args: string[]): CorrectArgs => {
  const target = args[2]
  const days = args.splice(3)
  const isDaysValid: boolean = days.every((day) => !isNaN(Number(day)))
  if (!target || isNaN(Number(target)))
    throw new Error("invalid target argument")
  if (!isDaysValid || days.length <= 0) throw new Error("invalid days argument")
  return {
    target: Number(target),
    days: days.map((day) => Number(day)),
  }
}


export default parseArgs