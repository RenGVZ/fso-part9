export type DiagnosesType = {
  code: string
  name: string
  latin?: string
}

export type PatientType = {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
  entries: Entry[]
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry

export interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<DiagnosesType["code"]>
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck"
  healthCheckRating: HealthCheckRating
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  employerName: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  discharge: {
    date: string
    criteria: string
  }
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type ProtectedPatientType = Omit<PatientType, "ssn" | "entries">

export type NewPatientType = Omit<PatientType, "id">

export type NewEntryType = Omit<Entry, "id">

export type NewHospitalEntryType = Omit<HospitalEntry, "id">

export type NewOccupationalHealthcareEntryType = Omit<OccupationalHealthcareEntry, "id">

export type NewHealthCheckEntryType = Omit<HealthCheckEntry, "id">