import React, { useState } from "react"

export const EmployeeContext = React.createContext()
const url = "http://localhost:8000"

export const EmployeeProvider = (props) => {
    const [employees, setEmployees] = useState([])
    const [employee, setEmployee] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getEmployees = () => {
        return fetch(`${url}/employees`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_final_token")}`
            }
        })
            .then(response => response.json())
            .then(setEmployees)
    }

    const getEmployeeById = (employeeId) => {
        return fetch(`${url}/employees/${employeeId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("init_final_token")}`
            }
        })
        .then(res => res.json())
        .then(setEmployee)
    }

    const addEmployee = employee => {
        return fetch(`${url}/employees`, {
          method: "POST",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_final_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(employee)
        })
        .then(res => res.json())
      }

    const deleteEmployee = employeeId => {
    return fetch(`${url}/employees/${employeeId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("init_final_token")}`,
            "Content-Type": "application/json"
          }
    })
    .then(getEmployees)
    }

    const updateEmployee = employee => {
        return fetch(`${url}/employees/${employee.id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Token ${localStorage.getItem("init_final_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(employee)
        })
        .then(getEmployees)
      }

    const updateEmployeeById = (employee) => {
      return fetch(`${url}/employees/${employee.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Token ${localStorage.getItem("init_final_token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
      })
      .then(getEmployees)
    }

    return (
        <EmployeeContext.Provider value={{
            searchTerms,
            setSearchTerms,
            employees,
            employee,
            getEmployees,
            getEmployeeById,
            addEmployee,
            deleteEmployee,
            updateEmployee,
            updateEmployeeById
        }}>
            {props.children}
        </EmployeeContext.Provider>
    )
}