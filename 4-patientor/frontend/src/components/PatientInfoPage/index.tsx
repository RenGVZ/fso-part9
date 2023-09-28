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
import Alert from "@mui/material/Alert"
import { useState, useEffect } from "react"
import patinetService from "../../services/patients"
import EntryDetails from "../EntryDetails"
import AddEntryForm from "../AddEntryForm"
import { createEntry } from "../../services/entries"
import axios from "axios"

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<Patient | undefined>()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)
  console.log("patient: ", patient)

  const fetchPatient = async (id: string) => {
    try {
      const patient = await patinetService.getOne(id)
      setPatient(patient)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (id) void fetchPatient(id)
  }, [id])

  const submitForm = async (values: any) => {
    console.log("values in parent: ", values)
    if (id) {
      try {
        const entry = await createEntry(values, id)
        console.log("entry: ", entry)
        setSuccess("Entry created successfully")
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data
            console.error(message)
            setError(message)
          } else {
            setError("Unrecognized axios error")
          }
        } else {
          console.error("Unknown error", e)
          setError("Unknown error")
        }
      }
    }

    if (id) void fetchPatient(id)
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(undefined)
      }, 5000)
    }
  }, [error])

  useEffect(() => {
    if(success) {
      setTimeout(() => {
        setSuccess(undefined)
      }, 5000)
    }
  }, [success])

  return (
    <Container>
      {!patient ? (
        <Typography variant="h4">No patient found...</Typography>
      ) : (
        <>
          {error && (
            <div style={{ position: "sticky", top: "20px" }}>
              <Alert severity="error">{error}</Alert>
            </div>
          )}
          {success && (
            <div style={{ position: "sticky", top: "20px" }}>
              <Alert severity="success">{success}</Alert>
            </div>
          )}
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
