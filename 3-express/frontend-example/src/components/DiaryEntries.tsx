import { Diary } from "../types"

type Props = {
  diaries: Diary[]
}

const DiaryEntries = (props: Props) => {
  return (
    <div>
      <h1>Diary Entries</h1>

      {props.diaries.map((diary) => (
        <div key={diary.id}>
          <h1>{diary.date}</h1>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>
        </div>
      ))}
    </div>
  )
}

export default DiaryEntries
