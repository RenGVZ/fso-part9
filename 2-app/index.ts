import express from "express"
import { calculateBmi } from "./bmiCalculator"
const app = express()

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
      res.json({weight, height, myBmi}).status(200)
    } catch (error) {
      console.log(error)
      res.status(400).send(error.message)
    }
  } else {
    res.status(400).send("Something went wrong")
  }
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
