import { PatientType } from "../types";

export const toNewPatient = (object: unknown): PatientType => {
  return object as PatientType;
}