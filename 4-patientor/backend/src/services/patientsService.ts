import patientData from "../../data/patients"
import {
  PatientType,
  ProtectedPatientType,
  NewPatientType,
  NewHospitalEntryType,
  NewOccupationalHealthcareEntryType,
  NewHealthCheckEntryType,
} from "../types"
import { v1 as uuid } from "uuid"

const patients: PatientType[] = patientData

const getAllPatientData = (id: string): PatientType => {
  const foundPatient = patients.find((patient) => patient.id === id)
  if (!foundPatient) {
    throw new Error(`Patient with id ${id} not found`)
  }
  return foundPatient
}

const getProtectedPatients = (): ProtectedPatientType[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

const addPatient = (patient: NewPatientType): PatientType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid()
  const newPatient = {
    id,
    ...patient,
  }
  patients.push(newPatient)
  return newPatient
}

const addEntry = (
  entry:
    | NewHospitalEntryType
    | NewOccupationalHealthcareEntryType
    | NewHealthCheckEntryType,
  patientId: string
) => {
  const newId: string = uuid()
  const patient = patients.find((p) => p.id === patientId)
  if (!patient) {
    throw new Error(`Patient with id ${patientId} not found`)
  }
  const newEntry = {
    id: newId,
    ...entry,
  }
  patient.entries.push(newEntry)
  return newEntry
}

export default {
  getAllPatientData,
  getProtectedPatients,
  addPatient,
  addEntry,
}
