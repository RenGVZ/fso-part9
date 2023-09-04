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
export interface Entry {
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type ProtectedPatientType = Omit<PatientType, "ssn" | "entries">

export type NewPatientType = Omit<PatientType, "id">
