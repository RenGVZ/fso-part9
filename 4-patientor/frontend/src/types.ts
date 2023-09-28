export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string
  name: string
  dateOfBirth?: string
  ssn?: string
  gender: Gender
  occupation: string
  entries: Entry[]
}

export type Entry =
  | OccupationalHealthcareEntry
  | HealthCheckEntry
  | HospitalEntry

export interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<Diagnosis["code"]>
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck"
  healthCheckRating: HealthCheckRating
}

enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
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

export type PatientFormValues = Omit<Patient, "id" | "entries">


// AddEntryFormTypes

export type EntryType =
  | ""
  | "Hospital"
  | "OccupationalHealthcare"
  | "HealthCheck"

export interface BaseEntryFormType {
  type: EntryType
  description: string
  date: string
  specialist: string
  diagnosisCodes: string[]
  discharge?: {
    date: string
    criteria: string
  }
  employerName?: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
  healthCheckRating?: number
}

export type Action =
  | { type: "type"; payload: BaseEntryFormType["type"] }
  | { type: "description"; payload: string }
  | { type: "date"; payload: string }
  | { type: "specialist"; payload: string }
  | { type: "diagnosisCodes"; payload: string[] }
  | { type: "reset"; payload: EntryType }
  | { type: "dischargeDate"; payload: string }
  | { type: "dischargeCriteria"; payload: string }
  | { type: "employerName"; payload: string }
  | { type: "sickLeaveStart"; payload: string }
  | { type: "sickLeaveEnd"; payload: string }
  | { type: "healthCheckRating"; payload: number }
