import React from "react"
import { Box, Typography } from "@mui/material"
import {
  Entry,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
} from "../../types"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import TaskAltIcon from "@mui/icons-material/TaskAlt"
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart"
import FavoriteIcon from "@mui/icons-material/Favorite"

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />
    default:
      return assertNever(entry)
  }
}

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({
  entry,
}) => {
  return (
    <Box sx={{ marginBottom: 1, padding: 2, border: "1px solid black", borderRadius: 2 }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="body2">{entry.date}</Typography>
        <LocalHospitalIcon sx={{ marginLeft: 1 }} />
      </div>
      <Typography style={{ fontStyle: "italic" }} variant="body2">
        {entry.description}
      </Typography>
      <Typography variant="body2">Diagnosis by: {entry.specialist}</Typography>
    </Box>
  )
}

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  return (
    <Box sx={{ marginBottom: 1, padding: 2, border: "1px solid black", borderRadius: 2 }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="body2">{entry.date}</Typography>
        <TaskAltIcon sx={{ marginLeft: 1 }} />
      </div>
      <Typography style={{ fontStyle: "italic" }} variant="body2">
        {entry.description}
      </Typography>
      <FavoriteIcon
        sx={{
          color:
            entry.healthCheckRating === 0
              ? "green"
              : entry.healthCheckRating === 1
              ? "yellow"
              : entry.healthCheckRating === 2
              ? "orrange"
              : entry.healthCheckRating === 3
              ? "red"
              : "",
        }}
      />
      <Typography variant="body2">Diagnosis by: {entry.specialist}</Typography>
    </Box>
  )
}
const OccupationalHealthcareEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry
}> = ({ entry }) => {
  return (
    <Box sx={{ marginBottom: 1, padding: 2, border: "1px solid black", borderRadius: 2 }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="body2">{entry.date}</Typography>
        <MonitorHeartIcon sx={{ marginLeft: 1 }} />
      </div>
      <Typography style={{ fontStyle: "italic" }} variant="body2">
        {entry.description}
      </Typography>
      <Typography variant="body2">Diagnosis by: {entry.specialist}</Typography>
    </Box>
  )
}

export default EntryDetails
