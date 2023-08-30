import axios from 'axios'
import { BASE_URL } from '../config'
import { NewDiaryEntry, Diary } from '../types'

export const getAllDiaries = async (): Promise<Diary[]> => {
  const entries = await axios.get<Diary[]>(BASE_URL as string)
  const response = entries.data
  return response
}

export const addDiary = async (newDiary: NewDiaryEntry): Promise<NewDiaryEntry> => {
  const newDiaryEntry = await axios.post<NewDiaryEntry>(
    BASE_URL as string,
    newDiary
  )
  const res = newDiaryEntry.data
  return res
}