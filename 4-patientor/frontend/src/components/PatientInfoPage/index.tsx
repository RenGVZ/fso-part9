import {
  Button,
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
import EntryDetails from "../EntryDetails"
import AddEntryForm from "../AddEntryForm"

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<Patient | undefined>()
  const [isFormOpen, setIsFormOpen] = useState(false)
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

  const submitForm = (values: any) => {
    console.log("values: ", values)
  }

  return (
    <Container>
      {!patient ? (
        <Typography variant="h4">No patient found...</Typography>
      ) : (
        <>
          <Card sx={{ width: 4 / 4, marginBottom: 2 }}>
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
                  <EntryDetails entry={e} />
                </div>
              ))}
            </CardContent>
          </Card>

          {isFormOpen && <AddEntryForm submitForm={submitForm} />}

          <Button
            variant="contained"
            color={isFormOpen ? "error" : "primary"}
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            {isFormOpen ? "Close Form" : "New Entry"}
          </Button>
        </>
      )}
    </Container>
  )
}

export default PatientInfoPage
