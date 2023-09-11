import { NewPatientType, Gender, NewEntryType } from "../types"

export const toNewEntry = (object: unknown): NewEntryType => {
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
    if (object.type === "Hospital") {
      const newEntry: NewEntryType = {
        type: object.type,
        date: parseDate(object.date),
        specialist: parseString(object.specialist, "specialist"),
        description: parseString(object.description, "description"),
        // diagnosisCodes: object.diagnosisCodes ?? [],
      }
      return newEntry
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

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param)
}

const parseString = (string: unknown, type: string): string => {
  if(!isString(string)) {
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
