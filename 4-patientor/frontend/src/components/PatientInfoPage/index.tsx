import {
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material"
import { useParams } from "react-router-dom"
import { Patient } from "../../types"
import FemaleIcon from "@mui/icons-material/Female"
import MaleIcon from "@mui/icons-material/Male"
import { useState, useEffect } from "react"
import patinetService from "../../services/patients"

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<Patient | undefined>()
  console.log("patient: ", patient)

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const patient = await patinetService.getOne(id)
        setPatient(patient)
      } catch (err) {
        console.error(err)
      }
    }
    if (id) void fetchPatient(id)
  }, [id])

  return (
    <Container >
      {!patient ? (
        <Typography variant="h4">No patient found...</Typography>
      ) : (
        <Card sx={{ width: 4 / 4 }}>
          <CardContent>
            <CardHeader
              title={patient.name}
              avatar={
                patient.gender === "male" ? (
                  <MaleIcon />
                ) : "female" ? (
                  <FemaleIcon />
                ) : (
                  ""
                )
              }
            />
            <Typography variant="body1">ssn: {patient.ssn}</Typography>
            <Typography variant="body1">
              occupation: {patient.occupation}
            </Typography>
            <br />
            <Typography variant="h5">entries</Typography>
            {patient.entries.map((e) => (
              <div key={e.id}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Typography variant="body2">{e.date}</Typography>
                  <Typography style={{ fontStyle: "italic" }} variant="body2">
                    {e.description}
                  </Typography>
                </div>

                <ul>
                  {e.diagnosisCodes?.map((code, i) => (
                    <li key={i}>{code}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </Container>
  )
}

export default PatientInfoPage
