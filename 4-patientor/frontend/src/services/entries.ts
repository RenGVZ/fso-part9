import { BaseEntryFormType } from "../types"
import { apiBaseUrl } from "../constants"
import axios from "axios"

export const createEntry = async (object: BaseEntryFormType, id: string) => {
  console.log("object:", object, "id:", id)
  const { data } = await axios.post(
    `${apiBaseUrl}/patients/addEntry/${id}`,
    object
  )
  return data
}
