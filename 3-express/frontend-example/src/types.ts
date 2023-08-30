export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface Diary {
  id: number
  date: string
  weather: Weather
  visibility: Visibility
  comment: string
}

export type NewDiaryEntry = Omit<Diary, 'id'>

export interface Action {
  type:
    | "CHANGE_DATE"
    | "CHANGE_WEATHER"
    | "CHANGE_VISIBILITY"
    | "CHANGE_COMMENT"
  payload: string
}