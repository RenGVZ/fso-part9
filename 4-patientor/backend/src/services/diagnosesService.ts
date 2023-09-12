import diagnosesData from "../../data/diagnoses"
import { DiagnosisType } from "../types"

const diagnoses: DiagnosisType[] = diagnosesData

const getDiagnoses = (): DiagnosisType[] => {
  return diagnoses
}

export default {
  getDiagnoses,
}
