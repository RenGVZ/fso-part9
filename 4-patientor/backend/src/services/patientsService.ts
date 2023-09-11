import patientData from "../../data/patients"
import {
  PatientType,
  ProtectedPatientType,
  NewPatientType,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
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
  entry: unknown,
  patientId: string
) => {
  if(!entry)
  const id: string = uuid()
  switch (entry.type) {
    case "Hospital":
      if (!entry.discharge) throw new Error("Discharge data missing")
      const hospital: HospitalEntry = {
        id,
        type: "Hospital",
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        diagnosisCodes: entry.diagnosisCodes ?? [],
        discharge: entry.discharge,
      }
      patients.find((p) =>
        p.id === patientId ? p.entries.push(hospital) : null
      )
      break
    case "OccupationalHealthcare":
      if (!entry.employerName) throw new Error("Employer name missing")
      const occupationalHealthcare: OccupationalHealthcareEntry = {
        id,
        type: "OccupationalHealthcare",
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        diagnosisCodes: entry.diagnosisCodes ?? [],
        employerName: entry.employerName,
        sickLeave: entry.sickLeave ?? undefined,
      }
      patients.find((p) =>
        p.id === patientId ? p.entries.push(occupationalHealthcare) : null
      )
      break
    case "HealthCheck":
      if (!entry.healthCheckRating) throw new Error("Health check data missing")
      const healthCheck: HealthCheckEntry = {
        id,
        type: "HealthCheck",
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        diagnosisCodes: entry.diagnosisCodes ?? [],
        healthCheckRating: entry.healthCheckRating,
      }
      patients.find((p) =>
        p.id === patientId ? p.entries.push(healthCheck) : null
      )
      break
    default:
      throw new Error("Incorrect entry type")
  }
}

export default {
  getAllPatientData,
  getProtectedPatients,
  addPatient,
  addEntry,
}
