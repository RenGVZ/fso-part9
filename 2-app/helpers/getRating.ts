import type { Result } from "../exerciseCalculator"

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

export default getRating