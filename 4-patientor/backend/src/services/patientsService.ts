import patientData from "../../data/patients"
import { PatientType, ProtectedPatientType, NewPatientType } from "../types"
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

export default {
  getAllPatientData,
  getProtectedPatients,
  addPatient,
}
