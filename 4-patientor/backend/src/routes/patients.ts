import express from "express"
import patientsService from "../services/patientsService"
import { toNewPatient, toNewEntry } from "../utils"
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

router.get("/:id", (req, res) => {
  try {
    const foundPatient = patientsService.getAllPatientData(req.params.id)
    return res.json(foundPatient)
  } catch (error: unknown) {
    let errorMessage = "Error fetching patient data"
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return res.status(400).send(errorMessage)
  }
})

router.post("/addEntry/:id", (req, res) => {
  try {
    const patientId = req.params.id
    const newEntry = toNewEntry(req.body)
    const addedEntry = patientsService.addEntry(newEntry, patientId)
    return res.json(addedEntry)
  } catch (error: unknown) {
    let errorMessage = "Error adding entry"
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return res.status(400).send(errorMessage)
  }
})

export default router
