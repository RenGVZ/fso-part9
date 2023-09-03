import React from "react"

type Props = {
  isError: boolean
  text: string
}

const Notification = (props: Props) => {
  return (
    <div style={props.isError ? { color: "red" } : { color: "green" }}>
      {props.text}
    </div>
  )
}

export default Notification
