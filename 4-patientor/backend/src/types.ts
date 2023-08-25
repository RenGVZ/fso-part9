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
  gender: string
  occupation: string
}

export type ProtectedPatientType = Omit<PatientType, "ssn">

export type NewPatientType = Omit<PatientType, 'id'>