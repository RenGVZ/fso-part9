import patientData from "../../data/patients"
import { PatientType, ProtectedPatientType } from "../types"

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

export default {
  getProtectedPatients,
}
