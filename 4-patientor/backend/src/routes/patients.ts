import express from "express"
import patientsService from "../services/patientsService"
import { toNewPatient } from "../utils"
const router = express.Router()

router.get("/", (_req, res) => {
  res.send(patientsService.getProtectedPatients())
})

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body)
    const addedPatient = patientsService.addPatient(newPatient)
    res.json(addedPatient)
  } catch (e: unknown) {
    let errorMessage = "Something went wrong"
    if (e instanceof Error) {
      errorMessage = e.message
    }
    res.status(400).send(errorMessage)
  }
})

export default router
