import React, { SyntheticEvent, useReducer, useState } from "react"
import { addDiary } from "../services"
import { NewDiaryEntry, Weather, Visibility, Action } from "../types"
import axios from "axios"

const reducer = (state: NewDiaryEntry, action: Action) => {
  switch (action.type) {
    case "CHANGE_DATE":
      return { ...state, date: action.payload }
    case "CHANGE_WEATHER":
      return { ...state, weather: action.payload as Weather }
    case "CHANGE_VISIBILITY":
      return { ...state, visibility: action.payload as Visibility }
    case "CHANGE_COMMENT":
      return { ...state, comment: action.payload }
    default:
      return state
  }
}

const CreateDiary = () => {
  const [newDiary, setNewDiary] = useReducer(reducer, {
    date: "",
    weather: Weather.Sunny,
    visibility: Visibility.Good,
    comment: "",
  })
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const diary: NewDiaryEntry = newDiary
    try {
      const res = await addDiary(diary)
      console.log("res:", res)
    } catch (error) {
      console.log("error:", error)
      setIsError(true)
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data)
      } else {
        setErrorMessage("An error has occurred")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new entry</h1>
      {isError && <div style={{ color: "red" }}>{errorMessage}</div>}
      <div style={{ display: "flex", flexDirection: "column", width: "20%" }}>
        <div>
          <label htmlFor="date">Date</label>
          <input
            name="date"
            onChange={(e) =>
              setNewDiary({ type: "CHANGE_DATE", payload: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="weather">Weather</label>
          <input
            name="weather"
            onChange={(e) =>
              setNewDiary({ type: "CHANGE_WEATHER", payload: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="visibility">Visibility</label>
          <input
            name="visibility"
            onChange={(e) =>
              setNewDiary({
                type: "CHANGE_VISIBILITY",
                payload: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label htmlFor="comment">Comment</label>
          <input
            name="comment"
            onChange={(e) =>
              setNewDiary({ type: "CHANGE_COMMENT", payload: e.target.value })
            }
          />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default CreateDiary
