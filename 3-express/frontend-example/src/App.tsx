import React, { useState, useEffect } from "react"
import { Diary } from "./types"
import DiaryEntries from "./components/DiaryEntries"
import CreateDiary from "./components/CreateDiary"
import { getAllDiaries } from "./services"

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    getAllDiaries().then(diaries => setDiaries(diaries))
  }, [])

  return (
    <div className="App">
      <CreateDiary />
      <DiaryEntries diaries={diaries} />
    </div>
  )
}

export default App
