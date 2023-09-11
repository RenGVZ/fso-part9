import {
  NewPatientType,
  Gender,
  NewHospitalEntryType,
  NewOccupationalHealthcareEntryType,
  NewHealthCheckEntryType,
  HealthCheckRating,
} from "../types"

export const toNewEntry = (
  object: unknown
):
  | NewHospitalEntryType
  | NewOccupationalHealthcareEntryType
  | NewHealthCheckEntryType => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data")
  }

  if (
    "type" in object &&
    "date" in object &&
    "specialist" in object &&
    "description" in object &&
    "diagnosisCodes" in object
  ) {
    switch (object.type) {
      case "Hospital":
        if (!("discharge" in object))
          throw new Error("Incorrect or missing data")
        const hospitalEntry: NewHospitalEntryType = {
          type: object.type,
          date: parseDate(object.date),
          specialist: parseString(object.specialist, "specialist"),
          description: parseString(object.description, "description"),
          diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes ?? []),
          discharge: parseDischarge(object.discharge),
        }
        return hospitalEntry
      case "OccupationalHealthcare":
        if (!("employerName" in object))
          throw new Error("Incorrect or missing data")
        const occupationalHealthcareEntry: NewOccupationalHealthcareEntryType =
          {
            type: object.type,
            date: parseDate(object.date),
            specialist: parseString(object.specialist, "specialist"),
            description: parseString(object.description, "description"),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes ?? []),
            employerName: parseString(object.employerName, "employer name"),
          }
        return occupationalHealthcareEntry
      case "HealthCheck":
        if (!("healthCheckRating" in object))
          throw new Error("Incorrect or missing data")
        const healthCheckEntry: NewHealthCheckEntryType = {
          type: object.type,
          date: parseDate(object.date),
          specialist: parseString(object.specialist, "specialist"),
          description: parseString(object.description, "description"),
          diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes ?? []),
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        }
        return healthCheckEntry
      default:
        throw new Error("Incorrect or missing data")
    }
  }
  throw new Error("Incorrect data: some fields are missing")
}

export const toNewPatient = (object: unknown): NewPatientType => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data")
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatientType = {
      name: parseString(object.name, "name"),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn, "ssn"),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, "occupation"),
      entries: [],
    }
    return newPatient
  }
  throw new Error("Incorrect data: some fields are missing")
}

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String
}

const isNumber = (num: unknown): num is number => {
  return typeof num === "number" || num instanceof Number
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param)
}

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((g) => +g)
    .includes(param)
}

const parseString = (string: unknown, type: string): string => {
  if (!isString(string)) {
    throw new Error(`Incorrect or missing ${type} ${string}`)
  }
  return string
}

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date" + date)
  }
  return date
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender" + gender)
  }
  return gender
}

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (!Array.isArray(codes)) {
    throw new Error("Incorrect or missing diagnosis codes" + codes)
  }
  return codes.map((c) => parseString(c, "diagnosis code"))
}

const parseDischarge = (
  discharge: unknown
): { date: string; criteria: string } => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing discharge data")
  }
  if (!("date" in discharge) || !("criteria" in discharge)) {
    throw new Error("Incorrect or missing discharge data")
  }
  const date = parseDate(discharge.date)
  const criteria = parseString(discharge.criteria, "discharge criteria")
  return { date, criteria }
}

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing health check rating")
  }
  return rating
}
