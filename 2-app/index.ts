import express from "express"
import { calculateBmi } from "./bmiCalculator"
import parseArgs from "./helpers/parseArgs"
import { calculateExercises } from "./exerciseCalculator"
const app = express()
app.use(express.json())

app.get("/hello", (_req, res) => {
  res.send("Hello fullstack!")
})

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query
  console.log("height:", height, "weight:", weight)
  if (
    typeof height === "string" &&
    height !== "" &&
    typeof weight === "string" &&
    weight !== ""
  ) {
    try {
      const myBmi = calculateBmi(height, weight)
      console.log(myBmi)
      res.json({ weight, height, myBmi }).status(200)
    } catch (error: unknown) {
      console.log(error)
      let errorMessage = ""
      if (error instanceof Error) {
        errorMessage = error.message
        res.status(400).send(errorMessage)
      } else {
        errorMessage = "Something went wrong"
        res.status(400).send(errorMessage)
      }
    }
  } else {
    res.status(400).send("Something went wrong")
  }
})

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body
  console.log("daily_exercises", daily_exercises, "target", target)

  if (Array.isArray(daily_exercises) && Number(target)) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const { goal, days } = parseArgs(Number(target), daily_exercises)
      const result = calculateExercises(goal, days)
      res.json(result)
    } catch (e: unknown) {
      let errorMessage = "Error: "
      if (e instanceof Error) {
        errorMessage = e.message
        res.status(400).send(errorMessage)
      } else {
        errorMessage += "Something went wrong"
        res.status(400).send(errorMessage)
      }
    }
  } else {
    res.status(400).send("malformatted parameters")
  }
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
