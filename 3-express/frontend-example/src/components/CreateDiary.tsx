import React, { SyntheticEvent, useReducer, useState } from "react"
import { addDiary } from "../services"
import { NewDiaryEntry, Weather, Visibility, Action } from "../types"
import Notification from "./Notification"
import axios from "axios"

const reducer = (state: NewDiaryEntry, action: Action) => {
  switch (action.type) {
    case "CHANGE_DATE":
      return { ...state, date: action.payload }
    case "CHANGE_WEATHER":
      console.log("action.payload:", action.payload)
      return { ...state, weather: action.payload as Weather }
    case "CHANGE_VISIBILITY":
      return { ...state, visibility: action.payload as Visibility }
    case "CHANGE_COMMENT":
      return { ...state, comment: action.payload }
    case "RESET":
      return {
        date: "",
        weather: Weather.Sunny,
        visibility: Visibility.Good,
        comment: "",
      }
    default:
      return state
  }
}

const CreateDiary = () => {
  const initialDiary = {
    date: "",
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: "",
  }
  const [newDiary, setNewDiary] = useReducer(reducer, initialDiary)
  const [isError, setIsError] = useState(false)
  const [isNotify, setIsNotify] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const diary: NewDiaryEntry = newDiary
    try {
      const res = await addDiary(diary)
      console.log("res:", res)
      setNewDiary({ type: "RESET", payload: "" })
      setIsNotify(true)
      setNotificationMessage("Diary entry successfully added")
    } catch (error) {
      console.log("error:", error)
      setIsError(true)
      if (axios.isAxiosError(error)) {
        setNotificationMessage(error.response?.data)
      } else {
        setNotificationMessage("An error has occurred")
      }
    }

    setTimeout(() => {
      setIsError(false)
      setIsNotify(false)
      setNotificationMessage("")
    }, 5000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new entry</h1>
      {isError && <Notification isError text={notificationMessage} />}
      {isNotify && <Notification isError={false} text={notificationMessage} />}
      <div style={{ display: "flex", flexDirection: "column", width: "30%" }}>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            onChange={(e) =>
              setNewDiary({ type: "CHANGE_DATE", payload: e.target.value })
            }
            value={newDiary.date}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          {[Weather.Sunny, Weather.Rainy, Weather.Cloudy, Weather.Windy].map(
            (weather) => (
              <div key={weather}>
                <input
                  name={weather}
                  onChange={() =>
                    setNewDiary({
                      type: "CHANGE_WEATHER",
                      payload: weather,
                    })
                  }
                  checked={newDiary.weather === weather}
                  type="radio"
                  value={newDiary.weather}
                />
                <label htmlFor={weather}>{weather}</label>
              </div>
            )
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          {[
            Visibility.Great,
            Visibility.Good,
            Visibility.Ok,
            Visibility.Poor,
          ].map((visibility) => (
            <div key={visibility}>
              <input
                name={visibility}
                onChange={() =>
                  setNewDiary({
                    type: "CHANGE_VISIBILITY",
                    payload: visibility,
                  })
                }
                checked={newDiary.visibility === visibility}
                type="radio"
                value={newDiary.visibility}
              />
              <label htmlFor={visibility}>{visibility}</label>
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="comment">Comment</label>
          <input
            name="comment"
            onChange={(e) =>
              setNewDiary({ type: "CHANGE_COMMENT", payload: e.target.value })
            }
            value={newDiary.comment}
          />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default CreateDiary
