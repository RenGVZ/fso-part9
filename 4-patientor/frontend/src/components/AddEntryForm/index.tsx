import {
  Box,
  Button,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  Typography,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { useReducer, SyntheticEvent, useState } from "react"
import { EntryType, BaseEntryFormType, Action } from "../../types"

type Props = {
  submitForm: (values: BaseEntryFormType) => void
}

const entrySelection = ["Hospital", "OccupationalHealthcare", "HealthCheck"]
const diagnosisCodes = [
  "M24.2",
  "M51.2",
  "S03.5",
  "J10.1",
  "J06.9",
  "Z57.1",
  "N30.0",
  "H54.7",
  "J03.0",
  "L60.1",
  "Z74.3",
  "L20",
  "F43.2",
  "S62.5",
  "H35.29",
]

const initialFormState: BaseEntryFormType = {
  type: "",
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
}

const reducer = (values: BaseEntryFormType, action: Action) => {
  switch (action.type) {
    case "description":
      return { ...values, description: action.payload }
    case "date":
      return { ...values, date: action.payload }
    case "specialist":
      return { ...values, specialist: action.payload }
    case "diagnosisCodes":
      return { ...values, diagnosisCodes: action.payload }
    case "dischargeDate":
      return {
        ...values,
        discharge: {
          date: action.payload,
          criteria: values?.discharge?.criteria || "",
        },
      }
    case "dischargeCriteria":
      return {
        ...values,
        discharge: {
          date: values?.discharge?.date || "",
          criteria: action.payload,
        },
      }
    case "employerName":
      return { ...values, employerName: action.payload }
    case "sickLeaveStart":
      return {
        ...values,
        sickLeave: {
          startDate: action.payload,
          endDate: values?.sickLeave?.endDate || "",
        },
      }
    case "sickLeaveEnd":
      return {
        ...values,
        sickLeave: {
          endDate: action.payload,
          startDate: values?.sickLeave?.startDate || "",
        },
      }
    case "healthCheckRating":
      return { ...values, healthCheckRating: action.payload}
    case "reset":
      return {
        ...initialFormState,
        type: action.payload,
      }
    default:
      return values
  }
}

const AddEntryForm = (props: Props) => {
  const [useType, setType] = useState<EntryType>("Hospital")
  const [values, dispatch] = useReducer(reducer, {
    ...initialFormState,
    type: useType,
  })

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    props.submitForm(values)
    // dispatch({ type: "reset", payload: useType })
  }

  // useEffect(() => {
  //   console.log("values: ", values)
  // }, [values])

  return (
    <Box>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h5">Add Entry</Typography>
        <InputLabel id="type-select-label">Entry Type</InputLabel>
        <Select
          labelId="type-select-label"
          sx={{ marginBottom: 2 }}
          value={useType}
          onChange={(event) => {
            setType(event.target.value as EntryType)
            dispatch({
              type: "reset",
              payload: event.target.value as EntryType,
            })
          }}
        >
          {entrySelection.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <TextField
          required
          label="Description"
          sx={{ marginBottom: 2 }}
          value={values.description}
          onChange={(event) =>
            dispatch({ type: "description", payload: event.target.value })
          }
        />
        <DatePicker
          sx={{ marginBottom: 2 }}
          label="Date"
          value={values.date}
          onChange={(newValue) =>
            dispatch({ type: "date", payload: newValue?.toString() || "" })
          }
        />
        <TextField
          required
          label="Specialist"
          sx={{ marginBottom: 2 }}
          value={values.specialist}
          onChange={(event) =>
            dispatch({ type: "specialist", payload: event.target.value })
          }
        />
        <InputLabel id="diagnosis-select-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosis-select-label"
          multiple
          sx={{ marginBottom: 2 }}
          value={values.diagnosisCodes}
          onChange={(event) =>
            dispatch({
              type: "diagnosisCodes",
              payload: event.target.value as string[],
            })
          }
        >
          {diagnosisCodes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>
        {useType === "Hospital" ? (
          <>
            <DatePicker
              sx={{ marginBottom: 2 }}
              label="Discharge Date"
              value={values?.discharge?.date}
              onChange={(newValue) => {
                dispatch({
                  type: "dischargeDate",
                  payload: newValue?.toString() || "",
                })
              }}
            ></DatePicker>
            <TextField
              required
              label="Discharge Criteria"
              value={values?.discharge?.criteria}
              onChange={(event) =>
                dispatch({
                  type: "dischargeCriteria",
                  payload: event.target.value,
                })
              }
            />
          </>
        ) : useType === "OccupationalHealthcare" ? (
          <>
            <TextField
              required
              label="Employer Name"
              sx={{ marginBottom: 2 }}
              value={values?.employerName}
              onChange={(event) =>
                dispatch({
                  type: "employerName",
                  payload: event.target.value,
                })
              }
            />
            <Typography variant="h6">Sick Leave</Typography>
            <DatePicker
              sx={{ marginBottom: 2 }}
              label="Start date"
              value={values?.sickLeave?.startDate}
              onChange={(newValue) => {
                dispatch({
                  type: "sickLeaveStart",
                  payload: newValue?.toString() || "",
                })
              }}
            />
            <DatePicker
              sx={{ marginBottom: 2 }}
              label="End date"
              value={values?.sickLeave?.endDate}
              onChange={(newValue) => {
                dispatch({
                  type: "sickLeaveEnd",
                  payload: newValue?.toString() || "",
                })
              }}
            />
          </>
        ) : useType === "HealthCheck" ? (
          <>
            <InputLabel id="health-select-label">
              Health Check Rating
            </InputLabel>
            <Select
              required
              sx={{ marginBottom: 2 }}
              labelId="health-select-label"
              value={values?.healthCheckRating || 0}
              onChange={(event) =>
                dispatch({
                  type: "healthCheckRating",
                  payload: event.target.value as number,
                })
              }
            >
              {[0, 1, 2, 3].map((n) => (
                <MenuItem key={n} value={n}>
                  {n}
                </MenuItem>
              ))}
            </Select>
          </>
        ) : null}
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  )
}

export default AddEntryForm
