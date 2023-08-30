import Header from "./components/Header"
import Content from "./components/Content"
import Total from "./components/Total"
import { CoursePart } from "./types"
import { SyntheticEvent, useState } from "react"

interface Note {
  id: number
  content: string
}

const App = () => {
  const courseName = "Half Stack application development"
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ]
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, content: "the first note" },
  ])
  const [newNote, setNewNote] = useState("")

  const noteCreation = (e: SyntheticEvent) => {
    e.preventDefault()
    setNotes((prev: Note[]) => [
      ...prev,
      { id: prev.length + 1, content: newNote },
    ])
  }

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  )
}

export default App
