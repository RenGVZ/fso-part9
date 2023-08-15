// import parseArgs from "./helpers/parseArgs"
import getRating from "./helpers/getRating"

export interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: 1 | 2 | 3
  ratingDescription: string
  target: number
  average: number
}

export const calculateExercises = (target: number, days: number[]): Result => {
  const periodLength: number = days.length
  const trainingDays: number = days.filter((day) =>
    day > 0 ? day : false
  ).length
  const success: boolean = trainingDays >= target
  const successPercentage: number = (100 * trainingDays) / target
  const rating: Result["rating"] = getRating(successPercentage)
  const ratingDescription: string =
    rating === 3
      ? "Goal met!"
      : rating === 2
      ? "Not bad, could do better"
      : "Goal not met"
  const average: number = days.reduce((a, b) => a + b, 0) / days.length
  console.log("average", average)

  const returnValues = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }

  // console.log(returnValues)
  return returnValues
}

// try {
//   const { target, days } = parseArgs(process.argv)
//   calculateExercises(target, days)
// } catch (e: unknown) {
//   let errorMessage = "Error: "
//   if (e instanceof Error) {
//     errorMessage += e.message
//   }
//   console.log(errorMessage)
// }
