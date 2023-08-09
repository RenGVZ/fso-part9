interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: 1 | 2 | 3
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (days: number[], target: number): Result => {
  const periodLength: number = days.length
  const trainingDays: number = days.filter((day) => (day > 0 ? day : false)).length
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

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

const getRating = (percentage: number): Result["rating"] => {
  switch (true) {
    case percentage >= 100:
      return 3
    case percentage < 100 && percentage >= 50:
      return 2
    default:
      return 1
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
