import express from "express"
import {calculator, Operation} from "./calculator"

const app = express()
app.use(express.json())

app.get("/ping", (_req, res) => {
  res.send("pong")
})

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body

  if( !value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: "malformatted parameters" })
  }
  if( !value2 || isNaN(Number(value2))) {
    return res.status(400).send({ error: "malformatted parameters" })
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const result = calculator(Number(value1), Number(value2), op as Operation)
  return res.send({ result })
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
