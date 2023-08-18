import diaryData from "../../data/entries"
import { DiaryEntry, NonSensitiveDiaryEntry } from "../types"

const diaries: DiaryEntry[] = diaryData

const getEntries = (): DiaryEntry[] => {
  return diaries
}

const getNonsensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }))
}

const addDiary = () => {
  return null
}

export default {
  getEntries,
  getNonsensitiveEntries,
  addDiary,
}
