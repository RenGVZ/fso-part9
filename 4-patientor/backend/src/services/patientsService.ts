import patientData from "../../data/patients"
import { PatientType, ProtectedPatientType, NewPatientType } from "../types"
import { v1 as uuid } from "uuid"

const patients: PatientType[] = patientData

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
  const id = uuid()
  const newPatient = {
    id,
    ...patient
  }
  patients.push(newPatient)
  return newPatient
}

export default {
  getProtectedPatients,
  addPatient
}
