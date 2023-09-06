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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<DiagnosesType["code"][]>
}

export enum HealthCheckRating {
  "Healthy" = "0",
  "LowRisk" = "1",
  "HighRisk" = "2",
  "CriticalRisk" = "3",
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck"
  healthCheckRating: HealthCheckRating
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type ProtectedPatientType = Omit<PatientType, "ssn" | "entries">

export type NewPatientType = Omit<PatientType, "id">
