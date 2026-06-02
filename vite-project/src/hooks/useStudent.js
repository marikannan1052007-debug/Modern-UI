import { useContext } from "react"

import { StudentContext } from "../context/Student-context"

export const useStudent = () =>
  useContext(StudentContext)