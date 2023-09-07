import express from "express"
import diagnosesRouter from "./routes/diagnoses"
import patientsRouter from "./routes/patients"

const app = express()
app.use(express.json())

const PORT = 3000

app.get("/api/ping", (_req, res) => {
  res.send("pong!")
})

app.use("/api/diagnoses", diagnosesRouter)
app.use("/api/patients", patientsRouter)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
