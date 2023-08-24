import diagnosesData from "../../data/diagnoses"
import { DiagnosesType } from "../types"

const diagnoses: DiagnosesType[] = diagnosesData

const getDiagnoses = (): DiagnosesType[] => {
  return diagnoses
}

export default {
  getDiagnoses,
}
